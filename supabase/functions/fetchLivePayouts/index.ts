import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LivePayout {
  message: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch recent successful withdrawal transactions
    const { data: transactions, error } = await supabase
      .from('transactions')
      .select(`
        amount,
        created_at,
        wallets!inner(
          user_id
        )
      `)
      .eq('type', 'withdrawal')
      .eq('status', 'success')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    // Get profile names for the users
    const payouts: LivePayout[] = [];

    if (transactions && transactions.length > 0) {
      // Extract user IDs safely - wallets is returned as an object (inner join)
      const userIds = transactions.map((t) => {
        const wallet = t.wallets as unknown as { user_id: string };
        return wallet.user_id;
      });
      
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, username, full_name')
        .in('user_id', userIds);

      const profileMap = new Map(
        profiles?.map((p) => [p.user_id, p.username || p.full_name || 'Creator']) || []
      );

      for (const tx of transactions) {
        const wallet = tx.wallets as unknown as { user_id: string };
        const userId = wallet.user_id;
        const name = profileMap.get(userId) || 'Creator';
        const amount = new Intl.NumberFormat('id-ID').format(tx.amount);
        const timeAgo = getTimeAgo(new Date(tx.created_at));
        
        payouts.push({
          message: `${name} withdrew Rp ${amount} ${timeAgo}`
        });
      }
    }

    return new Response(JSON.stringify(payouts), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error in fetchLivePayouts:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch payouts' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}
