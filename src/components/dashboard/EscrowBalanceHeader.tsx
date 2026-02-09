import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useWallet, useTopUpWallet } from "@/hooks/useWallet";
import { Wallet, Plus, TrendingUp, Shield } from "lucide-react";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const EscrowBalanceHeader = () => {
  const { data: wallet, isLoading } = useWallet();
  const topUpWallet = useTopUpWallet();
  const [topUpDialogOpen, setTopUpDialogOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");

  const handleTopUp = () => {
    const amount = parseFloat(topUpAmount);
    if (isNaN(amount) || amount <= 0) return;

    topUpWallet.mutate(amount, {
      onSuccess: () => {
        setTopUpDialogOpen(false);
        setTopUpAmount("");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-24" />
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
      {/* Balance Display */}
      <div className="flex items-center gap-3 bg-card/50 backdrop-blur-sm rounded-xl px-4 py-2 border border-border">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-xs text-muted-foreground">Escrow:</span>
        </div>
        <div className="flex items-center gap-2">
        <span className="font-semibold text-foreground">
          {formatCurrency(wallet?.balance || 0)}
        </span>
        {wallet && (wallet.pending_balance || 0) > 0 && (
          <span className="text-xs text-warning">
            (+{formatCurrency(wallet.pending_balance)} held)
          </span>
          )}
        </div>
        <TrendingUp className="w-4 h-4 text-success" />
      </div>

      {/* Top Up Button */}
      <Dialog open={topUpDialogOpen} onOpenChange={setTopUpDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Top Up
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-primary" />
              Top Up Saldo Escrow
            </DialogTitle>
            <DialogDescription>
              Tambahkan dana ke saldo escrow untuk meluncurkan campaign baru.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="p-4 bg-muted/50 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-1">Saldo Saat Ini</p>
              <p className="font-display text-2xl font-bold text-foreground">
                {formatCurrency(wallet?.balance || 0)}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topup-amount">Jumlah Top Up</Label>
              <Input
                id="topup-amount"
                type="number"
                placeholder="Contoh: 5000000"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Minimum top up: Rp 100.000
              </p>
            </div>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-3 gap-2">
              {[1000000, 5000000, 10000000].map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  size="sm"
                  onClick={() => setTopUpAmount(amount.toString())}
                  className="text-xs"
                >
                  {formatCurrency(amount)}
                </Button>
              ))}
            </div>

            <div className="pt-2 space-y-2">
              <Button
                variant="hero"
                className="w-full"
                onClick={handleTopUp}
                disabled={topUpWallet.isPending || !topUpAmount || parseFloat(topUpAmount) < 100000}
              >
                {topUpWallet.isPending ? "Memproses..." : "Konfirmasi Top Up"}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Pembayaran akan diproses melalui transfer bank
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EscrowBalanceHeader;
