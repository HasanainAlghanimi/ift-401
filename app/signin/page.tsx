'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDemoSession } from '@/lib/useDemoSession';

type FormState = {
  email: string;
  password: string;
  remember: boolean;
};

export default function SignInPage() {
  const [form, setForm] = useState<FormState>({ email: '', password: '', remember: true });
  const [errors, setErrors] = useState<Partial<FormState> & { general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { isLoggedIn } = useDemoSession();

  // local mount/session check to avoid flicker
  const [mounted, setMounted] = useState(false);
  const [hasSession, setHasSession] = useState<boolean | null>(null);
  useEffect(() => {
    setMounted(true);
    try { setHasSession(!!localStorage.getItem('demo_session')); }
    catch { setHasSession(false); }
  }, []);

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = key === 'remember' ? (e.target as HTMLInputElement).checked : e.target.value;
      setForm((f) => ({ ...f, [key]: value }));
      setErrors((err) => ({ ...err, [key]: undefined, general: undefined }));
    };

  const validate = () => {
    const next: typeof errors = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email';
    if (!form.password.trim()) next.password = 'Password is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsLoading(true);

      const users: Array<{ email: string }> = JSON.parse(localStorage.getItem('demo_users') || '[]');
      const user = users.find((u) => u.email.toLowerCase() === form.email.toLowerCase());
      if (!user) {
        setErrors({ general: 'No account found with that email.' });
        return;
      }

      localStorage.setItem('demo_session', JSON.stringify({ email: form.email, remember: form.remember }));
      window.dispatchEvent(new Event('demo-auth-changed'));

      await new Promise((r) => setTimeout(r, 250));
      router.replace('/');
    } catch {
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('demo_session');
    window.dispatchEvent(new Event('demo-auth-changed'));
    router.replace('/');
  };

  if (!mounted) return null;

  // If signed in already, show message instead of auto-redirecting
  if (isLoggedIn || hasSession) {
    return (
      <main className="auth">
        <div className="auth__wrap">
          <div className="auth__card">
            <h1 className="auth__title">You’re already signed in</h1>
            <p className="auth__subtitle">Want to go back or sign out?</p>
            <div className="auth__form" style={{ display: 'grid', gap: 10 }}>
              <button className="btn btn--primary" onClick={() => router.replace('/')}>Go home</button>
              <button className="btn btn--ghost" onClick={handleLogout}>Log out</button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="auth">
      <div className="auth__wrap">
        <div className="auth__card">
          <h1 className="auth__title">Welcome back</h1>
          <p className="auth__subtitle">Sign in to continue trading faster than everyone else.</p>

          {errors.general && <div className="auth__alert">{errors.general}</div>}

          <form onSubmit={onSubmit} className="auth__form">
            <label className="field">
              <span className="field__label">Email</span>
              <input
                className={`field__input ${errors.email ? 'is-error' : ''}`}
                type="email"
                value={form.email}
                onChange={onChange('email')}
                placeholder="jane.doe@example.com"
                autoComplete="email"
              />
              {errors.email && <span className="field__hint">{errors.email}</span>}
            </label>

            <label className="field">
              <span className="field__label">Password</span>
              <input
                className={`field__input ${errors.password ? 'is-error' : ''}`}
                type="password"
                value={form.password}
                onChange={onChange('password')}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              {errors.password && <span className="field__hint">{errors.password}</span>}
            </label>

            <label className="check">
              <input type="checkbox" checked={form.remember} onChange={onChange('remember')} />
              <span>Remember me</span>
            </label>

            <button className="btn btn--primary auth__submit" disabled={isLoading}>
              {isLoading ? 'Signing in…' : 'Sign in'}
            </button>

            <p className="auth__foot">
              New here? <Link href="/signup">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
