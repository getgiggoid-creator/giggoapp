import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Zap, 
  Upload, 
  Calendar, 
  DollarSign, 
  Users, 
  ChevronRight,
  Info,
  Loader2
} from "lucide-react";
import { useCreateCampaign, CampaignType, CampaignStatus } from "@/hooks/useCampaigns";

const categories = [
  "Fashion", "Beauty", "Fitness", "Tech", "Food", "Travel", 
  "Lifestyle", "Gaming", "Music", "Sports", "Education", "Entertainment"
];

const CreateCampaign = () => {
  const [step, setStep] = useState(1);
  const [campaignType, setCampaignType] = useState<CampaignType | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    brief: "",
    budget: "",
    prizeBreakdown: "",
    startDate: "",
    endDate: "",
    requirements: "",
  });

  const createCampaign = useCreateCampaign();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!campaignType) return;

    // Parse prize breakdown if it's a contest
    let prizeBreakdownParsed: { rank: number; amount: number; label: string }[] = [];
    if (campaignType === "contest" && formData.prizeBreakdown) {
      // Simple parsing: "1st: $2500, 2nd: $1500, 3rd: $1000"
      const parts = formData.prizeBreakdown.split(",").map(p => p.trim());
      prizeBreakdownParsed = parts.map((part, idx) => {
        const match = part.match(/\$?(\d+)/);
        const amount = match ? parseInt(match[1]) : 0;
        return {
          rank: idx + 1,
          amount,
          label: `${idx + 1}${idx === 0 ? 'st' : idx === 1 ? 'nd' : idx === 2 ? 'rd' : 'th'} Place`
        };
      }).filter(p => p.amount > 0);
    }

    createCampaign.mutate({
      title: formData.title,
      description: formData.description,
      brief: formData.brief || undefined,
      category: formData.category,
      type: campaignType as CampaignType,
      budget: parseFloat(formData.budget) || 0,
      prize_breakdown: prizeBreakdownParsed.length > 0 ? prizeBreakdownParsed : undefined,
      start_date: formData.startDate ? new Date(formData.startDate).toISOString() : new Date().toISOString(),
      end_date: formData.endDate ? new Date(formData.endDate).toISOString() : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: CampaignStatus.DRAFT,
    });
  };

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard/brand" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Back
            </Link>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-foreground">Create Gig</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className={step >= 1 ? "text-primary font-medium" : ""}>Type</span>
            <ChevronRight className="w-4 h-4" />
            <span className={step >= 2 ? "text-primary font-medium" : ""}>Details</span>
            <ChevronRight className="w-4 h-4" />
            <span className={step >= 3 ? "text-primary font-medium" : ""}>Payout</span>
            <ChevronRight className="w-4 h-4" />
            <span className={step >= 4 ? "text-primary font-medium" : ""}>Review</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {step === 1 && (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">What type of gig?</h1>
              <p className="text-muted-foreground">Choose how you want to collaborate with creators</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <button onClick={() => setCampaignType(CampaignType.CONTEST)} className={`text-left p-6 rounded-2xl border-2 transition-all ${campaignType === CampaignType.CONTEST ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 bg-card"}`}>
                <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">Challenge</h3>
                <p className="text-muted-foreground text-sm mb-4">Run a competition where creators submit entries and compete for payouts based on performance.</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Multiple winners possible</li>
                  <li>• Scoring based on engagement</li>
                  <li>• Great for brand awareness</li>
                </ul>
              </button>
              <button onClick={() => setCampaignType(CampaignType.DEAL)} className={`text-left p-6 rounded-2xl border-2 transition-all ${campaignType === CampaignType.DEAL ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 bg-card"}`}>
                <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-4">
                  <DollarSign className="w-7 h-7 text-secondary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">Collab</h3>
                <p className="text-muted-foreground text-sm mb-4">Offer fixed-price collabs where you select specific creators to work with directly.</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Select specific creators</li>
                  <li>• Fixed payout per creator</li>
                  <li>• More control over output</li>
                </ul>
              </button>
            </div>
            <div className="flex justify-end mt-8">
              <Button variant="hero" size="lg" onClick={() => setStep(2)} disabled={!campaignType}>Continue<ChevronRight className="w-5 h-5" /></Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">Gig Details</h1>
              <p className="text-muted-foreground">Tell creators about your gig</p>
            </div>
            <form className="bg-card rounded-2xl border border-border p-6 space-y-6">
              <div><Label htmlFor="title">Gig Title</Label><Input id="title" placeholder="e.g., Summer Fashion Challenge" className="mt-1.5" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} /></div>
              <div><Label>Category</Label><div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-1.5">{categories.map((cat) => (<button key={cat} type="button" onClick={() => setFormData({ ...formData, category: cat })} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${formData.category === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{cat}</button>))}</div></div>
              <div><Label htmlFor="description">Short Description</Label><Textarea id="description" placeholder="A brief overview of your gig" className="mt-1.5" rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} /></div>
              <div><Label htmlFor="brief">Gig Brief</Label><div className="flex items-center gap-2 text-sm text-muted-foreground mb-1.5"><Info className="w-4 h-4" />Detailed instructions for creators</div><Textarea id="brief" placeholder="What should the content include?" className="mt-1" rows={5} value={formData.brief} onChange={(e) => setFormData({ ...formData, brief: e.target.value })} /></div>
              <div><Label>Upload Assets</Label><div className="mt-1.5 border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"><Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" /><p className="text-sm text-muted-foreground">Drag and drop files or click to upload</p></div></div>
              <div className="flex justify-between pt-4"><Button variant="ghost" onClick={() => setStep(1)}>Back</Button><Button variant="hero" onClick={() => setStep(3)}>Continue<ChevronRight className="w-5 h-5" /></Button></div>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <div className="text-center mb-8"><h1 className="font-display text-3xl font-bold text-foreground mb-2">Payout & Timeline</h1><p className="text-muted-foreground">Set your payout and gig duration</p></div>
            <form className="bg-card rounded-2xl border border-border p-6 space-y-6">
              <div><Label htmlFor="budget">Total Payout (USD)</Label><div className="relative mt-1.5"><DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" /><Input id="budget" type="number" placeholder="5000" className="pl-10" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} /></div></div>
              {campaignType === CampaignType.CONTEST && (<div><Label htmlFor="prizeBreakdown">Payout Tiers</Label><Textarea id="prizeBreakdown" placeholder="e.g., 1st: $2500, 2nd: $1500, 3rd: $1000" className="mt-1.5" rows={3} value={formData.prizeBreakdown} onChange={(e) => setFormData({ ...formData, prizeBreakdown: e.target.value })} /></div>)}
              <div className="grid grid-cols-2 gap-4"><div><Label htmlFor="startDate">Start Date</Label><div className="relative mt-1.5"><Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" /><Input id="startDate" type="date" className="pl-10" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} /></div></div><div><Label htmlFor="endDate">End Date</Label><div className="relative mt-1.5"><Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" /><Input id="endDate" type="date" className="pl-10" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} /></div></div></div>
              <div className="flex justify-between pt-4"><Button variant="ghost" onClick={() => setStep(2)}>Back</Button><Button variant="hero" onClick={() => setStep(4)}>Review Gig<ChevronRight className="w-5 h-5" /></Button></div>
            </form>
          </div>
        )}

        {step === 4 && (
          <div className="animate-fade-in">
            <div className="text-center mb-8"><h1 className="font-display text-3xl font-bold text-foreground mb-2">Review & Launch</h1><p className="text-muted-foreground">Make sure everything looks good</p></div>
            <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
              <div className="flex items-center gap-4 pb-6 border-b border-border">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center text-primary-foreground">{campaignType === CampaignType.CONTEST ? <Users className="w-8 h-8" /> : <DollarSign className="w-8 h-8" />}</div>
                <div><span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">{campaignType === CampaignType.CONTEST ? "Challenge" : "Collab"}</span><h2 className="font-display text-2xl font-bold text-foreground mt-1">{formData.title || "Gig Title"}</h2></div>
              </div>
              <div className="grid grid-cols-2 gap-6"><div><p className="text-sm text-muted-foreground">Category</p><p className="font-medium text-foreground">{formData.category || "Not set"}</p></div><div><p className="text-sm text-muted-foreground">Payout</p><p className="font-medium text-foreground">${formData.budget || "0"}</p></div><div><p className="text-sm text-muted-foreground">Start Date</p><p className="font-medium text-foreground">{formData.startDate || "Not set"}</p></div><div><p className="text-sm text-muted-foreground">End Date</p><p className="font-medium text-foreground">{formData.endDate || "Not set"}</p></div></div>
              <div><p className="text-sm text-muted-foreground mb-1">Description</p><p className="text-foreground">{formData.description || "No description provided"}</p></div>
              <div className="flex justify-between pt-4 border-t border-border">
                <Button variant="ghost" onClick={() => setStep(3)}>Back</Button>
                <Button 
                  variant="hero" 
                  size="lg" 
                  onClick={handleSubmit}
                  disabled={createCampaign.isPending}
                >
                  {createCampaign.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Launch Gig
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CreateCampaign;