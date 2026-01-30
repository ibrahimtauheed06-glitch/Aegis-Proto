import { supabase } from "./supabase";

// Helper to safely get user or return null
async function getUser() {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    } catch (e) {
        // Silently fail if auth is not configured or errors
        return null;
    }
}

export async function mockSync(provider: string) {
  const user = await getUser();
  
  if (!user) {
    // In demo mode, we just return without error
    // In a real app we might store this in local storage
    return;
  }

  const simulatedData = {
    user_id: user.id,
    source: provider,
    steps: Math.floor(Math.random() * 7000) + 3000,
    heart_rate_avg: 70 + Math.random() * 15,
    heart_rate_max: 120,
    heart_rate_min: 55,
    sleep_duration: Math.floor(Math.random() * 4) + 4,
    calories: (Math.random() * 400).toFixed(1),
    spo2: 94 + Math.random() * 5,
  };

  const { error } = await supabase.from("wearable_metrics").insert(simulatedData);
  if (error) console.log("Error inserting metrics:", error);

  await supabase
    .from("wearable_devices")
    .update({ last_synced: new Date().toISOString() })
    .eq("provider", provider)
    .eq("user_id", user.id);
}

export async function getLatestMetrics() {
  const user = await getUser();
  
  if (!user) {
    // Fallback mock data for demo purposes when not logged in
    return {
        heart_rate_avg: 72,
        steps: 8432,
        sleep_duration: 7.5,
        calories: 450,
        spo2: 98
    };
  }

  // Fetch the most recent metric entry across all sources
  const { data, error } = await supabase
    .from("wearable_metrics")
    .select("*")
    .eq("user_id", user.id)
    .order("timestamp", { ascending: false })
    .limit(1)
    .single();

  if (error) return null;
  return data;
}

export async function getDevices() {
    const user = await getUser();
    
    if (!user) {
        // Fallback mock data: Show Apple Health as connected for demo
        return [
            { provider: 'apple', status: 'connected', last_synced: new Date().toISOString() }
        ];
    }

    const { data, error } = await supabase
      .from("wearable_devices")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
        console.log(error);
        return [];
    }
    return data;
}

export async function connectDeviceProvider(provider: string) {
    const user = await getUser();
    
    if (!user) {
        // Simulate success for demo
        return { status: 'connected' }; 
    }

    // Check if already exists to avoid duplicates or upsert
    const { data: existing } = await supabase
        .from("wearable_devices")
        .select("id")
        .eq("user_id", user.id)
        .eq("provider", provider)
        .single();

    if (existing) {
        return await supabase
            .from("wearable_devices")
            .update({ status: 'connected', last_synced: new Date().toISOString() })
            .eq("id", existing.id);
    } else {
        return await supabase.from("wearable_devices").insert({
            user_id: user.id,
            provider,
            status: "connected",
            last_synced: new Date().toISOString(),
        });
    }
}

// New helper to fetch history with fallback
export async function getMetricsHistory() {
    const user = await getUser();
    
    if (!user) {
        // Generate some mock history for the chart
        const now = new Date();
        return Array.from({ length: 7 }).map((_, i) => ({
            id: i,
            timestamp: new Date(now.getTime() - i * 24 * 60 * 60 * 1000).toISOString(),
            steps: 5000 + Math.random() * 5000,
            heart_rate_avg: 65 + Math.random() * 10,
            sleep_duration: 6 + Math.random() * 3,
            spo2: 95 + Math.random() * 4,
            calories: 300 + Math.random() * 200,
            source: i % 2 === 0 ? 'apple' : 'samsung'
        }));
    }

    const { data } = await supabase
        .from("wearable_metrics")
        .select("*")
        .eq("user_id", user.id)
        .order("timestamp", { ascending: false });
        
    return data || [];
}
