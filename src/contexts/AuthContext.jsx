import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session: currentSession }, error: sessionError }) => {
      if (sessionError) {
        console.error('Error getting session:', sessionError.message);
        setError(sessionError.message);
      }
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setLoading(false);
        setError(null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = useCallback(async (email, password) => {
    if (!supabase) {
      const msg = 'Supabase가 설정되지 않았습니다. VITE_SUPABASE_URL과 VITE_SUPABASE_ANON_KEY를 확인하세요.';
      setError(msg);
      return { error: { message: msg } };
    }

    setError(null);
    setLoading(true);

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
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

  const signup = useCallback(async (email, password) => {
    if (!supabase) {
      const msg = 'Supabase가 설정되지 않았습니다. VITE_SUPABASE_URL과 VITE_SUPABASE_ANON_KEY를 확인하세요.';
      setError(msg);
      return { error: { message: msg } };
    }

    setError(null);
    setLoading(true);

    const { data, error: signupError } = await supabase.auth.signUp({
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
    if (!supabase) {
      const msg = 'Supabase가 설정되지 않았습니다.';
      setError(msg);
      return { error: { message: msg } };
    }

    setError(null);

    const { data, error: googleError } = await supabase.auth.signInWithOAuth({
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
    if (!supabase) {
      const msg = 'Supabase가 설정되지 않았습니다.';
      setError(msg);
      return { error: { message: msg } };
    }

    setError(null);

    const { data, error: kakaoError } = await supabase.auth.signInWithOAuth({
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
    if (!supabase) {
      setUser(null);
      setSession(null);
      return { error: null };
    }

    setError(null);

    const { error: logoutError } = await supabase.auth.signOut();

    if (logoutError) {
      setError(logoutError.message);
      return { error: logoutError };
    }

    setUser(null);
    setSession(null);
    return { error: null };
  }, []);

  const resetPassword = useCallback(async (email) => {
    if (!supabase) {
      const msg = 'Supabase가 설정되지 않았습니다.';
      setError(msg);
      return { error: { message: msg } };
    }

    setError(null);

    const { data, error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
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
    loading,
    error,
    isAuthenticated: !!user,
    isSupabaseConfigured: !!supabase,
    login,
    signup,
    loginWithGoogle,
    loginWithKakao,
    logout,
    resetPassword
  }), [user, session, loading, error, login, signup, loginWithGoogle, loginWithKakao, logout, resetPassword]);

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
