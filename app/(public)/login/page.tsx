"use client";
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';

export default function LoginPage() {
  const router = useRouter();
  const [loginType, setLoginType] = useState<'admin' | 'customer'>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, loginType }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      if (loginType === 'admin') {
        router.push('/dashboard');
      } else {
        router.push('/account');
      }
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[var(--surface-primary)]">
      <div className="hidden lg:flex lg:w-1/2 bg-[var(--color-primary-900)] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[var(--color-primary-600)] blur-3xl animate-pulse"></div>

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center space-x-2 text-white hover:text-[var(--color-primary-200)] transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>

        <div className="relative z-10 mb-20">
          <h1 className="text-4xl font-bold text-white mb-6">
            Welcome Back
          </h1>
          <p className="text-[var(--color-primary-200)] text-lg max-w-md leading-relaxed">
            {loginType === 'admin'
              ? 'Sign in to access the admin dashboard, manage content, and oversee customers.'
              : 'Sign in to manage your subscription, view your content history, and update your profile.'}
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center w-full lg:w-1/2 p-8 sm:p-12 md:p-24 bg-[var(--surface-primary)]">
        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="text-center lg:text-left">
            <div className="flex lg:hidden justify-center mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-primary-600)] text-white font-bold text-2xl shadow-lg">
                I
              </div>
            </div>
            <h2 className="text-3xl font-extrabold text-[var(--text-primary)]">Sign in</h2>
            <p className="mt-2 text-[var(--text-secondary)]">
              Enter your credentials to access your account
            </p>
          </div>

          <div className="flex rounded-lg border border-[var(--color-neutral-200)] overflow-hidden">
            <button
              type="button"
              onClick={() => { setLoginType('customer'); setError(''); }}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                loginType === 'customer'
                  ? 'bg-[var(--color-primary-600)] text-white'
                  : 'bg-[var(--surface-primary)] text-[var(--text-secondary)] hover:bg-[var(--color-neutral-50)]'
              }`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => { setLoginType('admin'); setError(''); }}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                loginType === 'admin'
                  ? 'bg-[var(--color-primary-600)] text-white'
                  : 'bg-[var(--surface-primary)] text-[var(--text-secondary)] hover:bg-[var(--color-neutral-50)]'
              }`}
            >
              Admin
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                label="Email address"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
              />
              <Input
                label="Password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-[var(--color-error)]">{error}</p>
            )}

            <div className="flex items-center justify-end">
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-[var(--color-primary-600)] hover:text-[var(--color-primary-500)]"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" fullWidth size="lg" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          {loginType === 'customer' && (
            <p className="text-center text-sm text-[var(--text-muted)]">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-medium text-[var(--color-primary-600)] hover:text-[var(--color-primary-500)]">
                Create one
              </Link>
            </p>
          )}

          {loginType === 'admin' && (
            <p className="text-center text-xs text-[var(--text-muted)] mt-4">
              For administrative access, please use your corporate credentials.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
