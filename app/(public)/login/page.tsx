"use client";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { Toggle } from '@/components/common/Toggle/Toggle';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-[var(--surface-primary)]">
      {/* Left Side - Image/Branding */}
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
          <h1 className="text-4xl font-bold text-white mb-6">Welcome Back</h1>
          <p className="text-[var(--color-primary-200)] text-lg max-w-md leading-relaxed">
            Sign in to access your personalized dashboard, manage users, and monitor platform statistics.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 p-8 sm:p-12 md:p-24 bg-[var(--surface-primary)]">
        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="text-center lg:text-left">
            <div className="flex lg:hidden justify-center mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-primary-600)] text-white font-bold text-2xl shadow-lg">
                I
              </div>
            </div>
            <h2 className="text-3xl font-extrabold text-[var(--text-primary)]">Sign in to your account</h2>
            <p className="mt-2 text-[var(--text-secondary)]">
              Enter your credentials to access the portal
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); window.location.href = '/dashboard'; }}>
            <div className="space-y-4">
              <Input 
                label="Email address" 
                type="email" 
                autoComplete="email" 
                required 
                placeholder="admin@infoshare.com"
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

            <div>
              <Button type="submit" fullWidth size="lg">
                Sign in
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm text-[var(--text-muted)]">
            Only administrators can create accounts. If you need access, please contact support.
          </div>
        </div>
      </div>
    </div>
  );
}
