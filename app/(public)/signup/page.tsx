"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
          <h1 className="text-4xl font-bold text-white mb-6">Start Learning Today</h1>
          <p className="text-[var(--color-primary-200)] text-lg max-w-md leading-relaxed">
            Create your free account and get access to curated content. Upgrade anytime to unlock premium resources.
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
            <h2 className="text-3xl font-extrabold text-[var(--text-primary)]">Create your account</h2>
            <p className="mt-2 text-[var(--text-secondary)]">
              Join our community and start exploring
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); router.push('/account'); }}>
            <div className="space-y-4">
              <Input label="Full Name" required placeholder="Jane Doe" />
              <Input label="Email address" type="email" autoComplete="email" required placeholder="jane@example.com" />
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  placeholder="Min. 8 characters"
                  rightIcon={
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[var(--text-muted)] hover:text-[var(--text-secondary)]">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  }
                />
              </div>
              <div className="relative">
                <Input
                  label="Confirm Password"
                  type={showConfirm ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  placeholder="Repeat your password"
                  rightIcon={
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-[var(--text-muted)] hover:text-[var(--text-secondary)]">
                      {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  }
                />
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <input
                id="terms"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 rounded border-[var(--color-neutral-300)] text-[var(--color-primary-600)] focus:ring-[var(--color-primary-500)]"
              />
              <label htmlFor="terms" className="text-sm text-[var(--text-secondary)]">
                I agree to the{' '}
                <a href="#" className="font-medium text-[var(--color-primary-600)] hover:text-[var(--color-primary-500)]">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="font-medium text-[var(--color-primary-600)] hover:text-[var(--color-primary-500)]">Privacy Policy</a>
              </label>
            </div>

            <Button type="submit" fullWidth size="lg">
              Create Account
            </Button>

            <p className="text-center text-sm text-[var(--text-muted)]">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-[var(--color-primary-600)] hover:text-[var(--color-primary-500)]">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
