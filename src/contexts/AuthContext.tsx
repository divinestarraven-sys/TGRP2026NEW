import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

export interface Entitlement {
  tier: 'seed' | 'mycelium' | 'canopy';
  status: 'free' | 'active' | 'past_due' | 'incomplete' | 'canceled';
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  current_period_start: string | null;
  current_period_end: string | null;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  entitlement: Entitlement | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  refreshEntitlement: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [entitlement, setEntitlement] = useState<Entitlement | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchEntitlement = useCallback(async (userId: string) => {
    if (!supabase) return;
    const { data } = await supabase
      .from('members_entitlements')
      .select('tier, status, stripe_customer_id, stripe_subscription_id, current_period_start, current_period_end')
      .eq('user_id', userId)
      .maybeSingle();
    if (data) setEntitlement(data as Entitlement);
  }, []);

  const refreshEntitlement = useCallback(async () => {
    if (user) await fetchEntitlement(user.id);
  }, [user, fetchEntitlement]);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        fetchEntitlement(s.user.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        (async () => {
          await fetchEntitlement(s.user.id);
        })();
      } else {
        setEntitlement(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchEntitlement]);

  const signUp = useCallback(async (email: string, password: string) => {
    if (!supabase) return { error: 'Service unavailable' };
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return { error: error.message };
    return { error: null };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!supabase) return { error: 'Service unavailable' };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return { error: null };
  }, []);

  const signOutFn = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setEntitlement(null);
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    if (!supabase) return { error: 'Service unavailable' };
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) return { error: error.message };
    return { error: null };
  }, []);

  return (
    <AuthContext.Provider value={{
      user, session, entitlement, loading,
      signUp, signIn, signOut: signOutFn, resetPassword, refreshEntitlement,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
