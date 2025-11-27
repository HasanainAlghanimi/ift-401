'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDemoSession } from '@/lib/useDemoSession';
import { supabase } from '@/lib/supabaseClient';

// -------------------- Types --------------------
type FormState = {
  name: string;
  email: string;
  password: string;
  confirm: string;
  agree: boolean;
  accountType: 'customer' | 'admin';   // 👈 NEW FIELD
};

export default function SignUpPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    password: '',
    confirm: '',
    agree: false,
    accountType: 'customer',           // default
  });

  const [errors, setErrors] = useState<
    Partial<FormState> & { general?: string }
  >({});
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { isLoggedIn } = useDemoSession();

  const [mounted, setMounted] = useState(false);
  const [hasSession, setHasSession] = useState<boolean | null>(null);

  useEffect(() => {
    setMounted(true);
    try {
      setHasSession(!!localStorage.getItem('demo_session'));
    } catch {
      setHasSession(false);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (isLoggedIn || hasSession) router.replace('/');
  }, [mounted, isLoggedIn, hasSession, router]);

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value =
        key === 'agree'
          ? (e.target as HTMLInputElement).checked
          : e.target.value;

      setForm((f) => ({ ...f, [key]: value }));
      setErrors((err) => ({ ...err, [key]: undefined, general: undefined }));
    };

  // -------------------- Validation --------------------
  const validate = () => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email';
    if (form.password.length < 6) next.password = 'Min 6 characters';
    if (form.password !== form.confirm)
      next.confirm = 'Passwords do not match';
    if (!form.agree) next.general = 'You must accept the Terms';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // -------------------- Submit --------------------
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsLoading(true);
      setErrors({});

      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (error) {
        setErrors({ general: error.message });
        return;
      }

      const userId = data.user?.id;

      if (userId) {
        await fetch('/api/account/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,                    // not used anymore, but fine
            name: form.name,
            email: form.email,
            accountType: form.accountType, // 'user' | 'admin'
          }),
        });
      }


      localStorage.setItem(
        'demo_session',
        JSON.stringify({ email: form.email, role: form.accountType })
      );
      window.dispatchEvent(new Event('demo-auth-changed'));

      await new Promise((r) => setTimeout(r, 250));

      router.replace('/');
    } catch {
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;
  if (isLoggedIn || hasSession) return null;

  return (
    <main className="auth">
      <div className="auth__wrap">
        <div className="auth__card">
          <h1 className="auth__title">Create your account</h1>
          <p className="auth__subtitle">
            Trade faster than Robinhood. No fees. No risk.
          </p>

          {errors.general && (
            <div className="auth__alert">{errors.general}</div>
          )}

          <form onSubmit={onSubmit} className="auth__form">
            {/* Full Name */}
            <label className="field">
              <span className="field__label">Full name</span>
              <input
                className={`field__input ${
                  errors.name ? 'is-error' : ''
                }`}
                type="text"
                value={form.name}
                onChange={onChange('name')}
                placeholder="Jane Doe"
              />
              {errors.name && (
                <span className="field__hint">{errors.name}</span>
              )}
            </label>

            {/* Email */}
            <label className="field">
              <span className="field__label">Email</span>
              <input
                className={`field__input ${
                  errors.email ? 'is-error' : ''
                }`}
                type="email"
                value={form.email}
                onChange={onChange('email')}
                placeholder="jane@example.com"
              />
              {errors.email && (
                <span className="field__hint">{errors.email}</span>
              )}
            </label>

            {/* Account Type (NEW) */}
            <label className="field">
              <span className="field__label">Account Type</span>
              <select
                className="field__input"
                value={form.accountType}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    accountType: e.target.value as 'customer' | 'admin',
                  }))
                }
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </label>

            {/* Password Row */}
            <div className="fieldrow">
              <label className="field">
                <span className="field__label">Password</span>
                <input
                  className={`field__input ${
                    errors.password ? 'is-error' : ''
                  }`}
                  type="password"
                  value={form.password}
                  onChange={onChange('password')}
                  placeholder="••••••••"
                />
              </label>

              <label className="field">
                <span className="field__label">Confirm password</span>
                <input
                  className={`field__input ${
                    errors.confirm ? 'is-error' : ''
                  }`}
                  type="password"
                  value={form.confirm}
                  onChange={onChange('confirm')}
                  placeholder="••••••••"
                />
                {errors.confirm && (
                  <span className="field__hint">{errors.confirm}</span>
                )}
              </label>
            </div>

            {/* Terms */}
            <label className="check">
              <input
                type="checkbox"
                checked={form.agree}
                onChange={onChange('agree')}
              />
              <span>I agree to the Terms and Privacy Policy.</span>
            </label>

            {/* Submit */}
            <button
              className="btn btn--primary auth__submit"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account…' : 'Sign up'}
            </button>

            <p className="auth__foot">
              Already have an account?{' '}
              <Link href="/signin">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
