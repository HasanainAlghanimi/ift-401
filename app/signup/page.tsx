'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type FormState = {
  name: string;
  email: string;
  password: string;
  confirm: string;
  agree: boolean;
};

export default function SignUpPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    password: '',
    confirm: '',
    agree: false,
  });
  const [errors, setErrors] = useState<Partial<FormState> & { general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = key === 'agree' ? (e.target as HTMLInputElement).checked : e.target.value;
      setForm((f) => ({ ...f, [key]: value }));
      setErrors((err) => ({ ...err, [key]: undefined, general: undefined }));
    };

  const validate = () => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email';
    if (form.password.length < 6) next.password = 'Min 6 characters';
    if (form.password !== form.confirm) next.confirm = 'Passwords do not match';
    if (!form.agree) next.general = 'You must accept the Terms';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setIsLoading(true);

      // Demo signup (localStorage). Replace with your real API later.
      const users = JSON.parse(localStorage.getItem('demo_users') || '[]');
      users.push({ name: form.name, email: form.email, createdAt: new Date().toISOString() });
      localStorage.setItem('demo_users', JSON.stringify(users));

      // Optionally set a “session”
      localStorage.setItem('demo_session', JSON.stringify({ email: form.email }));

      // Simulate network delay
      await new Promise((r) => setTimeout(r, 600));

      router.push('/'); // go home after sign up
    } catch {
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="auth">
      <div className="auth__wrap">
        <div className="auth__card">
          <h1 className="auth__title">Create your account</h1>
          <p className="auth__subtitle">
            Trade faster than Robinhood. No fees. No risk.
          </p>

          {errors.general && <div className="auth__alert">{errors.general}</div>}

          <form onSubmit={onSubmit} className="auth__form">
            <label className="field">
              <span className="field__label">Full name</span>
              <input
                className={`field__input ${errors.name ? 'is-error' : ''}`}
                type="text"
                value={form.name}
                onChange={onChange('name')}
                placeholder="Jane Doe"
                autoComplete="name"
              />
              {errors.name && <span className="field__hint">{errors.name}</span>}
            </label>

            <label className="field">
              <span className="field__label">Email</span>
              <input
                className={`field__input ${errors.email ? 'is-error' : ''}`}
                type="email"
                value={form.email}
                onChange={onChange('email')}
                placeholder="Jane.Doe@example.com"
                autoComplete="email"
              />
              {errors.email && <span className="field__hint">{errors.email}</span>}
            </label>

            <div className="fieldrow">
              <label className="field">
                <span className="field__label">Password</span>
                <input
                  className={`field__input ${errors.password ? 'is-error' : ''}`}
                  type="password"
                  value={form.password}
                  onChange={onChange('password')}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                {errors.password && <span className="field__hint">{errors.password}</span>}
              </label>

              <label className="field">
                <span className="field__label">Confirm password</span>
                <input
                  className={`field__input ${errors.confirm ? 'is-error' : ''}`}
                  type="password"
                  value={form.confirm}
                  onChange={onChange('confirm')}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                {errors.confirm && <span className="field__hint">{errors.confirm}</span>}
              </label>
            </div>

            <label className="check">
              <input
                type="checkbox"
                checked={form.agree}
                onChange={onChange('agree')}
              />
              <span>
                I agree to the Terms and Privacy Policy.
                {
                //<Link href="/terms">Terms</Link> and <Link href="/privacy">Privacy Policy</Link>.
                }
              </span>
            </label>

            <button className="btn btn--primary auth__submit" disabled={isLoading}>
              {isLoading ? 'Creating account…' : 'Sign up'}
            </button>

            <p className="auth__foot">
              Already have an account? <Link href="/login">Log in</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
