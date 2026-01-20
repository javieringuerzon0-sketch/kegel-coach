
export interface UserRecord {
  email?: string;
  quizAnswers: Record<string, string>;
  selectedPlanId?: string;
  isSubscribed: boolean;
  timestamp: number;
}

import { supabase } from './lib/supabaseClient';

export interface UserRecord {
  email: string;
  quizAnswers: Record<string, string>;
  selectedPlanId?: string;
  isSubscribed: boolean;
  timestamp: number;
}

export const db = {
  // Save or update user data in Supabase
  async saveLead(data: Partial<UserRecord>): Promise<void> {
    if (!data.email) return; // Cannot save without email as identifier

    const payload: any = {
      email: data.email,
      updated_at: new Date().toISOString(),
    };

    if (data.quizAnswers) payload.quiz_data = data.quizAnswers;
    if (data.selectedPlanId) payload.plan_id = data.selectedPlanId;
    if (data.isSubscribed !== undefined) payload.is_subscribed = data.isSubscribed;

    const { error } = await supabase
      .from('users')
      .upsert(payload, { onConflict: 'email' });

    if (error) {
      console.error('Error saving to Supabase:', error);
    } else {
      console.log('Data saved to Supabase');
    }
  },

  // Retrieve user data to restore session
  async getUser(email: string): Promise<UserRecord | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) return null;

    return {
      email: data.email,
      quizAnswers: data.quiz_data || {},
      selectedPlanId: data.plan_id,
      isSubscribed: data.is_subscribed || false,
      timestamp: new Date(data.created_at).getTime(),
    };
  },

  // Mark user as subscribed after payment
  async completePurchase(email: string, planId: string): Promise<void> {
    const { error } = await supabase
      .from('users')
      .update({ is_subscribed: true, plan_id: planId })
      .eq('email', email);

    if (error) console.error('Error updating subscription:', error);
  },

  // Legacy local helper, mostly for initial state if needed, can be kept minimal
  getRawData(): UserRecord {
    // For now, we return default empty state as we rely on Supabase async fetch
    // Real app might cache in local storage for offline support
    return { quizAnswers: {}, isSubscribed: false, timestamp: Date.now(), email: '' }; // Added email
  },

  async clearSession(): Promise<void> {
    // No op for standard DB, maybe clear local storage cache if implemented
  }
};

