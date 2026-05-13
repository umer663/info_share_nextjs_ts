"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { Toggle } from '@/components/common/Toggle/Toggle';

type LoginMode = 'admin' | 'customer';

export default function LoginPage() {
  const [mode, setMode] = useState<LoginMode>('customer');

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
            {mode === 'admin' ? 'Welcome Back' : 'Welcome Back'}
          </h1>
          <p className="text-[var(--color-primary-200)] text-lg max-w-md leading-relaxed">
            {mode === 'admin'
              ? 'Sign in to access your personalized dashboard, manage users, and monitor platform statistics.'
              : 'Sign in to manage your subscriptions, view content, and track your learning progress.'}
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
              Enter your credentials to access the portal
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="flex bg-[var(--surface-secondary)] p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setMode('customer')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                mode === 'customer'
                  ? 'bg-white shadow-sm text-[var(--text-primary)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => setMode('admin')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                mode === 'admin'
                  ? 'bg-white shadow-sm text-[var(--text-primary)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Admin / Staff
            </button>
          </div>

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = mode === 'admin' ? '/dashboard' : '/account';
            }}
          >
            <div className="space-y-4">
              <Input
                label="Email address"
                type="email"
                autoComplete="email"
                required
                placeholder={mode === 'admin' ? 'admin@infoshare.com' : 'jane@example.com'}
              />
              <Input
                label="Password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Toggle label="Remember me" id="remember-me" />
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-[var(--color-primary-600)] hover:text-[var(--color-primary-500)]">
                  Forgot password?
                </a>
              </div>
            </div>

            <Button type="submit" fullWidth size="lg">
              Sign in
            </Button>
          </form>

          {mode === 'customer' && (
            <p className="text-center text-sm text-[var(--text-muted)]">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-medium text-[var(--color-primary-600)] hover:text-[var(--color-primary-500)]">
                Create one
              </Link>
            </p>
          )}

          {mode === 'admin' && (
            <p className="text-center text-sm text-[var(--text-muted)]">
              Only administrators can create accounts. If you need access, please contact support.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
