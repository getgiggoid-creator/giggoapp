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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useWallet, useTransactions, useRequestPayout, type Transaction } from "@/hooks/useWallet";
import {
  LayoutDashboard,
  Compass,
  Video,
  Trophy,
  Wallet,
  Settings,
  ArrowDownLeft,
  ArrowUpRight,
  Clock,
  CheckCircle,
  XCircle,
  Banknote,
  TrendingUp,
} from "lucide-react";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

const navItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", path: "/dashboard/creator" },
  { id: "discover", icon: Compass, label: "Discover Gigs" },
  { id: "entries", icon: Video, label: "My Entries" },
  { id: "leaderboard", icon: Trophy, label: "Leaderboard" },
  { id: "wallet", icon: Wallet, label: "My Wallet" },
  { id: "settings", icon: Settings, label: "Settings" },
];

const getTransactionIcon = (type: Transaction["type"]) => {
  switch (type) {
    case "earning":
      return <ArrowDownLeft className="w-4 h-4 text-success" />;
    case "withdrawal":
      return <ArrowUpRight className="w-4 h-4 text-destructive" />;
    case "deposit":
      return <ArrowDownLeft className="w-4 h-4 text-success" />;
    default:
      return <Clock className="w-4 h-4 text-muted-foreground" />;
  }
};

const getStatusBadge = (status: Transaction["status"]) => {
  switch (status) {
    case "success":
      return (
        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-success/10 text-success">
          <CheckCircle className="w-3 h-3" /> Berhasil
        </span>
      );
    case "pending":
      return (
        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-warning/10 text-warning">
          <Clock className="w-3 h-3" /> Pending
        </span>
      );
    case "failed":
      return (
        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-destructive/10 text-destructive">
          <XCircle className="w-3 h-3" /> Gagal
        </span>
      );
  }
};

const getTransactionLabel = (type: Transaction["type"]) => {
  switch (type) {
    case "earning":
      return "Pendapatan";
    case "withdrawal":
      return "Penarikan";
    case "deposit":
      return "Deposit";
    case "escrow_hold":
      return "Escrow Hold";
    case "escrow_release":
      return "Escrow Release";
    case "refund":
      return "Refund";
    default:
      return type;
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const CreatorWallet = () => {
  const [activeTab, setActiveTab] = useState("wallet");
  const [payoutDialogOpen, setPayoutDialogOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const { data: wallet, isLoading: walletLoading } = useWallet();
  const { data: transactions = [], isLoading: transactionsLoading } = useTransactions();
  const requestPayout = useRequestPayout();

  const handleRequestPayout = () => {
    const amount = parseFloat(payoutAmount);
    if (isNaN(amount) || amount <= 0) {
      return;
    }
    if (!bankName.trim() || !accountNumber.trim()) {
      return;
    }

    requestPayout.mutate(
      { amount, bankName, accountNumber },
      {
        onSuccess: () => {
          setPayoutDialogOpen(false);
          setPayoutAmount("");
          setBankName("");
          setAccountNumber("");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-muted flex">
      <DashboardSidebar
        variant="creator"
        navItems={navItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userName="Creator"
        userInitial="C"
      />

      <main className="flex-1 overflow-auto">
        <DashboardHeader
          title="Dompet Saya 💰"
          subtitle="Kelola penghasilan dan penarikan dana"
        />

        <div className="p-4 md:p-8">
          {/* Balance Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            {walletLoading ? (
              <>
                <Skeleton className="h-36 rounded-2xl" />
                <Skeleton className="h-36 rounded-2xl" />
                <Skeleton className="h-36 rounded-2xl" />
              </>
            ) : (
              <>
                {/* Available Balance */}
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                      <Banknote className="w-6 h-6 text-success" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-success" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Saldo Bisa Ditarik</p>
                  <p className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    {formatCurrency(wallet?.balance || 0)}
                  </p>
                </div>

                {/* Pending Balance */}
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-warning" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Dana Tertahan</p>
                  <p className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    {formatCurrency(wallet?.pending_balance || 0)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Menunggu approval atau diproses
                  </p>
                </div>

                {/* Payout Action */}
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-6 border border-primary/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Siap untuk tarik dana?</p>
                  <Dialog open={payoutDialogOpen} onOpenChange={setPayoutDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="hero"
                        className="w-full"
                        disabled={!wallet?.balance || wallet.balance <= 0}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                        Tarik Dana
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Permintaan Penarikan Dana</DialogTitle>
                        <DialogDescription>
                          Masukkan jumlah dan detail rekening bank Anda.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="amount">Jumlah Penarikan</Label>
                          <Input
                            id="amount"
                            type="number"
                            placeholder="Contoh: 500000"
                            value={payoutAmount}
                            onChange={(e) => setPayoutAmount(e.target.value)}
                            max={wallet?.balance || 0}
                          />
                          <p className="text-xs text-muted-foreground">
                            Maksimal: {formatCurrency(wallet?.balance || 0)}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bank">Nama Bank</Label>
                          <Input
                            id="bank"
                            placeholder="Contoh: BCA, Mandiri, BNI"
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="account">Nomor Rekening</Label>
                          <Input
                            id="account"
                            placeholder="Masukkan nomor rekening"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                          />
                        </div>
                        <Button
                          variant="hero"
                          className="w-full"
                          onClick={handleRequestPayout}
                          disabled={requestPayout.isPending}
                        >
                          {requestPayout.isPending ? "Memproses..." : "Ajukan Penarikan"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </>
            )}
          </div>

          {/* Transaction History */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="p-4 md:p-6 border-b border-border">
              <h2 className="font-display text-lg md:text-xl font-semibold text-foreground">
                Riwayat Transaksi
              </h2>
            </div>

            {transactionsLoading ? (
              <div className="p-6 space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : transactions.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Belum Ada Transaksi</h3>
                <p className="text-muted-foreground">
                  Transaksi akan muncul di sini setelah Anda mendapatkan pendapatan
                </p>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Tipe</TableHead>
                        <TableHead>Deskripsi</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Jumlah</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((tx) => (
                        <TableRow key={tx.id}>
                          <TableCell>
                            {format(new Date(tx.created_at), "dd MMM yyyy", { locale: localeId })}
                          </TableCell>
                          <TableCell>
                            <span className="flex items-center gap-2">
                              {getTransactionIcon(tx.type)}
                              {getTransactionLabel(tx.type)}
                            </span>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {tx.description || "-"}
                          </TableCell>
                          <TableCell>{getStatusBadge(tx.status)}</TableCell>
                          <TableCell
                            className={`text-right font-semibold ${
                              tx.type === "earning" || tx.type === "deposit"
                                ? "text-success"
                                : "text-destructive"
                            }`}
                          >
                            {tx.type === "earning" || tx.type === "deposit" ? "+" : "-"}
                            {formatCurrency(tx.amount)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden divide-y divide-border">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm">
                          {getTransactionIcon(tx.type)}
                          {getTransactionLabel(tx.type)}
                        </span>
                        {getStatusBadge(tx.status)}
                      </div>
                      <p className="text-xs text-muted-foreground">{tx.description || "-"}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(tx.created_at), "dd MMM yyyy", { locale: localeId })}
                        </span>
                        <span
                          className={`font-semibold ${
                            tx.type === "earning" || tx.type === "deposit"
                              ? "text-success"
                              : "text-destructive"
                          }`}
                        >
                          {tx.type === "earning" || tx.type === "deposit" ? "+" : "-"}
                          {formatCurrency(tx.amount)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreatorWallet;
