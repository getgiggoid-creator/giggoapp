import { supabase } from "@/integrations/supabase/client";

export interface LivePayout {
  message: string;
}

export async function fetchLivePayouts(): Promise<LivePayout[]> {
  const { data, error } = await supabase.functions.invoke<LivePayout[]>('fetchLivePayouts');
  
  if (error) {
    console.error('Error fetching live payouts:', error);
    throw error;
  }
  
  return data || [];
}
