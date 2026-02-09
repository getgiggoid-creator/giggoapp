import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

export interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  pending_balance: number;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  wallet_id: string;
  amount: number;
  type: "deposit" | "withdrawal" | "earning" | "escrow_hold" | "escrow_release" | "refund";
  status: "pending" | "success" | "failed";
  reference_id: string | null;
  description: string | null;
  bank_name: string | null;
  account_number: string | null;
  created_at: string;
  updated_at: string;
}

// Fetch user's wallet
export const useWallet = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["wallet", user?.id],
    queryFn: async () => {
      if (!user) throw new Error("Not authenticated");

      // Try to get existing wallet
      const { data: wallet, error } = await supabase
        .from("wallets")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;

      // If no wallet exists, create one
      if (!wallet) {
        const { data: newWallet, error: createError } = await supabase
          .from("wallets")
          .insert([{ user_id: user.id, balance: 0, pending_balance: 0 }])
          .select()
          .single();

        if (createError) throw createError;
        return newWallet as Wallet;
      }

      return wallet as Wallet;
    },
    enabled: !!user,
  });
};

// Fetch wallet transactions
export const useTransactions = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["transactions", user?.id],
    queryFn: async () => {
      if (!user) throw new Error("Not authenticated");

      // First get the wallet
      const { data: wallet } = await supabase
        .from("wallets")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!wallet) return [];

      // Then get transactions
      const { data: transactions, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("wallet_id", wallet.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (transactions || []) as Transaction[];
    },
    enabled: !!user,
  });
};

// Request payout mutation
export const useRequestPayout = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      amount,
      bankName,
      accountNumber,
    }: {
      amount: number;
      bankName: string;
      accountNumber: string;
    }) => {
      if (!user) throw new Error("Not authenticated");

      // Get wallet
      const { data: wallet } = await supabase
        .from("wallets")
        .select("id, balance")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!wallet) throw new Error("Wallet not found");
      if (wallet.balance < amount) throw new Error("Insufficient balance");

      // Create withdrawal transaction
      const { data: transaction, error: txError } = await supabase
        .from("transactions")
        .insert([{
          wallet_id: wallet.id,
          amount: amount,
          type: "withdrawal",
          status: "pending",
          bank_name: bankName,
          account_number: accountNumber,
          description: `Payout request to ${bankName}`,
        }])
        .select()
        .single();

      if (txError) throw txError;

      // Update wallet balance (move from available to pending)
      const { error: updateError } = await supabase
        .from("wallets")
        .update({
          balance: wallet.balance - amount,
          pending_balance: wallet.balance - amount >= 0 ? amount : 0,
        })
        .eq("id", wallet.id);

      if (updateError) throw updateError;

      return transaction;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["transactions", user?.id] });
      toast({
        title: "Permintaan Penarikan Berhasil",
        description: "Dana akan diproses dalam 1-3 hari kerja.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Gagal",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

// Top up wallet (for brands)
export const useTopUpWallet = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (amount: number) => {
      if (!user) throw new Error("Not authenticated");

      // Get or create wallet
      const { data: existingWallet } = await supabase
        .from("wallets")
        .select("id, balance")
        .eq("user_id", user.id)
        .maybeSingle();

      let walletId: string;
      let currentBalance: number;

      if (!existingWallet) {
        const { data: newWallet, error: createError } = await supabase
          .from("wallets")
          .insert([{ user_id: user.id, balance: 0, pending_balance: 0 }])
          .select()
          .single();

        if (createError) throw createError;
        walletId = newWallet.id;
        currentBalance = 0;
      } else {
        walletId = existingWallet.id;
        currentBalance = existingWallet.balance || 0;
      }

      // Create deposit transaction
      const { error: txError } = await supabase
        .from("transactions")
        .insert([{
          wallet_id: walletId,
          amount: amount,
          type: "deposit",
          status: "success",
          description: "Wallet top up",
        }]);

      if (txError) throw txError;

      // Update wallet balance
      const { error: updateError } = await supabase
        .from("wallets")
        .update({
          balance: currentBalance + amount,
        })
        .eq("id", walletId);

      if (updateError) throw updateError;

      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["transactions", user?.id] });
      toast({
        title: "Top Up Berhasil",
        description: "Saldo telah ditambahkan ke wallet Anda.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Gagal",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

// Hold escrow for campaign launch
export const useHoldEscrow = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      campaignId,
      amount,
    }: {
      campaignId: string;
      amount: number;
    }) => {
      if (!user) throw new Error("Not authenticated");

      // Get wallet
      const { data: wallet } = await supabase
        .from("wallets")
        .select("id, balance")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!wallet) throw new Error("Wallet not found");
      if (wallet.balance < amount) throw new Error("Insufficient balance for campaign budget");

      // Create escrow hold transaction
      const { error: txError } = await supabase
        .from("transactions")
        .insert([{
          wallet_id: wallet.id,
          amount: amount,
          type: "escrow_hold",
          status: "success",
          reference_id: campaignId,
          description: "Escrow hold for campaign launch",
        }]);

      if (txError) throw txError;

      // Update wallet - move funds from balance to pending
      const { error: updateError } = await supabase
        .from("wallets")
        .update({
          balance: wallet.balance - amount,
          pending_balance: (wallet.balance || 0) + amount,
        })
        .eq("id", wallet.id);

      if (updateError) throw updateError;

      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["transactions", user?.id] });
    },
    onError: (error: Error) => {
      toast({
        title: "Gagal",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
