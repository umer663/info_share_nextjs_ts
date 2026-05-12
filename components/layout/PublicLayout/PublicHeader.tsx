"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button } from '@/components/common/Button/Button';
import { ThemeSelector } from '@/components/common/ThemeSelector/ThemeSelector';
import { publicNavItems } from '@/config/navigation';

export const PublicHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-[var(--z-sticky)] w-full border-b border-[var(--color-neutral-200)] bg-[var(--surface-primary)] backdrop-blur-md bg-opacity-80">
      <div className="mx-auto flex h-[var(--header-height)] max-w-[var(--max-content-width)] items-center justify-between px-[var(--space-4)] md:px-[var(--space-8)]">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-primary-600)] text-white font-bold text-xl">
            I
          </div>
          <span className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
            Info Share
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-[var(--space-6)]">
          {publicNavItems.filter(item => item.path !== '/login').map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-[var(--color-primary-600)]",
                pathname === item.path ? "text-[var(--color-primary-600)]" : "text-[var(--text-secondary)]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center space-x-[var(--space-4)]">
          <ThemeSelector />
          <Link href="/login">
            <Button variant="primary" size="sm">Login</Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--color-neutral-200)] bg-[var(--surface-primary)] px-[var(--space-4)] py-[var(--space-4)]">
          <nav className="flex flex-col space-y-[var(--space-4)]">
            {publicNavItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center space-x-3 text-sm font-medium px-[var(--space-3)] py-[var(--space-2)] rounded-md transition-colors",
                  pathname === item.path 
                    ? "bg-[var(--color-primary-50)] text-[var(--color-primary-700)]" 
                    : "text-[var(--text-secondary)] hover:bg-[var(--color-neutral-50)]"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
