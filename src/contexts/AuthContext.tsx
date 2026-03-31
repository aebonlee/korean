import React from "react";
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '../lib/supabase';

import type { User, Session } from "@supabase/supabase-js";

interface UserProfile {
  id: string;
  signup_domain?: string;
  visited_sites?: string[];
  [key: string]: unknown;
}

interface AccountBlock {
  status: string;
  reason: string;
  suspended_until: string | null;
}

interface AuthResult {
  data?: unknown;
  error?: { message: string } | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  accountBlock: AccountBlock | null;
  clearAccountBlock: () => void;
  isAuthenticated: boolean;
  isSupabaseConfigured: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  signup: (email: string, password: string) => Promise<AuthResult>;
  loginWithGoogle: () => Promise<AuthResult>;
  loginWithKakao: () => Promise<AuthResult>;
  logout: () => Promise<{ error: { message: string } | null }>;
  resetPassword: (email: string) => Promise<AuthResult>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accountBlock, setAccountBlock] = useState<AccountBlock | null>(null);

  const clearAccountBlock = () => setAccountBlock(null);

  async function loadProfile(userId: string) {
    try {
      const { data: profileData } = await supabase!
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (profileData) {
        setProfile(profileData);

        // signup_domain / visited_sites 자동 처리
        const currentDomain = window.location.hostname;
        const updates: Record<string, any> = {};
        if (!(profileData as any).signup_domain) updates.signup_domain = currentDomain;
        const sites = Array.isArray((profileData as any).visited_sites) ? (profileData as any).visited_sites : [];
        if (!sites.includes(currentDomain)) {
          updates.visited_sites = [...sites, currentDomain];
        }
        if (Object.keys(updates).length > 0) {
          supabase!.from('user_profiles').update(updates).eq('id', userId).then(() => {});
        }

        // 계정 상태 체크
        try {
          const { data: statusData } = await supabase!.rpc('check_user_status', {
            target_user_id: userId,
            current_domain: currentDomain,
          });
          if (statusData && statusData.status && statusData.status !== 'active') {
            setAccountBlock({
              status: statusData.status,
              reason: statusData.reason || '',
              suspended_until: statusData.suspended_until || null,
            });
            await supabase!.auth.signOut();
            setUser(null);
            setSession(null);
            setProfile(null);
            return;
          }
        } catch {
          // check_user_status 함수 미존재 시 무시
        }
      }
    } catch {
      setProfile(null);
    }
  }

  useEffect(() => {
    if (!supabase!) {
      setLoading(false);
      return;
    }

    supabase!.auth.getSession().then(({ data: { session: currentSession }, error: sessionError }: any) => {
      if (sessionError) {
        console.error('Error getting session:', sessionError.message);
        setError(sessionError.message);
      }
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      if (currentSession?.user) {
        loadProfile(currentSession.user.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase!.auth.onAuthStateChange(
      (event: string, newSession: Session | null) => {
        setSession(newSession);
        const u = newSession?.user ?? null;
        setUser(u);
        if (u) {
          loadProfile(u.id);
          if (event === 'SIGNED_IN') {
            supabase!.from('user_profiles')
              .update({ last_sign_in_at: new Date().toISOString() })
              .eq('id', u.id)
              .then(() => {});
          }
        } else {
          setProfile(null);
        }
        setLoading(false);
        setError(null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    if (!supabase!) {
      const msg = 'Supabase가 설정되지 않았습니다. VITE_SUPABASE_URL과 VITE_SUPABASE_ANON_KEY를 확인하세요.';
      setError(msg);
      return { error: { message: msg } };
    }

    setError(null);
    setLoading(true);

    const { data, error: loginError } = await supabase!.auth.signInWithPassword({
      email,
      password
    });

    setLoading(false);

    if (loginError) {
      setError(loginError.message);
      return { error: loginError };
    }

    return { data };
  }, []);

  const signup = useCallback(async (email: string, password: string) => {
    if (!supabase!) {
      const msg = 'Supabase가 설정되지 않았습니다. VITE_SUPABASE_URL과 VITE_SUPABASE_ANON_KEY를 확인하세요.';
      setError(msg);
      return { error: { message: msg } };
    }

    setError(null);
    setLoading(true);

    const { data, error: signupError } = await supabase!.auth.signUp({
      email,
      password
    });

    setLoading(false);

    if (signupError) {
      setError(signupError.message);
      return { error: signupError };
    }

    return { data };
  }, []);

  const loginWithGoogle = useCallback(async () => {
    if (!supabase!) {
      const msg = 'Supabase가 설정되지 않았습니다.';
      setError(msg);
      return { error: { message: msg } };
    }

    setError(null);

    const { data, error: googleError } = await supabase!.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });

    if (googleError) {
      setError(googleError.message);
      return { error: googleError };
    }

    return { data };
  }, []);

  const loginWithKakao = useCallback(async () => {
    if (!supabase!) {
      const msg = 'Supabase가 설정되지 않았습니다.';
      setError(msg);
      return { error: { message: msg } };
    }

    setError(null);

    const { data, error: kakaoError } = await supabase!.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: window.location.origin
      }
    });

    if (kakaoError) {
      setError(kakaoError.message);
      return { error: kakaoError };
    }

    return { data };
  }, []);

  const logout = useCallback(async () => {
    if (!supabase!) {
      setUser(null);
      setSession(null);
      return { error: null };
    }

    setError(null);

    const { error: logoutError } = await supabase!.auth.signOut();

    if (logoutError) {
      setError(logoutError.message);
      return { error: logoutError };
    }

    setUser(null);
    setSession(null);
    return { error: null };
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    if (!supabase!) {
      const msg = 'Supabase가 설정되지 않았습니다.';
      setError(msg);
      return { error: { message: msg } };
    }

    setError(null);

    const { data, error: resetError } = await supabase!.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });

    if (resetError) {
      setError(resetError.message);
      return { error: resetError };
    }

    return { data };
  }, []);

  const value = useMemo(() => ({
    user,
    session,
    profile,
    loading,
    error,
    accountBlock,
    clearAccountBlock,
    isAuthenticated: !!user,
    isSupabaseConfigured: !!supabase!,
    login,
    signup,
    loginWithGoogle,
    loginWithKakao,
    logout,
    resetPassword
  }), [user, session, profile, loading, error, accountBlock, login, signup, loginWithGoogle, loginWithKakao, logout, resetPassword]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
