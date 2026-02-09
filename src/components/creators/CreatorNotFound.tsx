import { Button } from "@/components/ui/button";
import { UserX } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  username?: string;
}

const CreatorNotFound = ({ username }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(210,20%,98%)] dark:bg-background flex items-center justify-center px-4">
      <div className="text-center space-y-4 max-w-sm">
        <div className="w-24 h-24 mx-auto rounded-full bg-muted flex items-center justify-center">
          <UserX className="w-12 h-12 text-muted-foreground/50" />
        </div>
        <h1 className="text-xl font-bold text-foreground">Kreator Tidak Ditemukan</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {username
            ? `Kami tidak dapat menemukan kreator dengan handle @${username}. Mungkin profil ini telah dihapus atau diatur ke privat.`
            : "Profil kreator ini tidak ada atau telah diatur ke privat."}
        </p>
        <Button onClick={() => navigate("/")} variant="default" className="mt-6 rounded-full px-6">
          Kembali ke Beranda
        </Button>
      </div>
    </div>
  );
};

export default CreatorNotFound;
