"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Mail, Calendar, BookOpen, CreditCard, LogOut,
  Crown, AlertTriangle, CheckCircle, Clock, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Card } from '@/components/common/Card/Card';
import { Badge } from '@/components/common/Badge/Badge';
import { fadeSlideUp, staggerContainer } from '@/utils/animationVariants';
import { Spinner } from '@/components/common/Spinner/Spinner';
import { Avatar } from '@/components/common/Avatar/Avatar';
import { EmptyState } from '@/components/common/EmptyState/EmptyState';

interface CustomerData {
  id: string;
  fullName: string;
  email: string;
  subscriptionStatus: string;
  freeContentRemaining: number;
  memberSince: string;
  lastActive: string | null;
  contentViewedCount: number;
  isEmailVerified: boolean;
}

export default function AccountPage() {
  const router = useRouter();
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [navigating, setNavigating] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => {
        if (!res.ok) throw new Error('Not authenticated');
        return res.json();
      })
      .then((data) => {
        if (data.type !== 'customer') {
          router.push('/dashboard');
          return;
        }
        setCustomer(data.user);
      })
      .catch(() => {
        router.push('/login');
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = async () => {
    setNavigating(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
      router.refresh();
    } catch {
      setNavigating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--surface-secondary)]">
        <Spinner size="lg" variant="primary" />
      </div>
    );
  }

  if (!customer) return null;

  const memberSinceDate = new Date(customer.memberSince).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const freePercentage = (customer.freeContentRemaining / 5) * 100;

  return (
    <div className="flex flex-col bg-[var(--surface-secondary)] min-h-screen">
      <section className="bg-gradient-to-b from-[var(--surface-primary)] to-[var(--surface-secondary)] shadow-[var(--shadow-sm)] py-12">
        <div className="mx-auto max-w-[var(--max-content-width)] px-[var(--space-4)] md:px-[var(--space-8)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[var(--text-primary)]">My Account</h1>
              <p className="mt-1 text-[var(--text-secondary)]">Manage your profile and subscription</p>
            </div>
            <Button
              variant="outline"
              leftIcon={<LogOut className="h-4 w-4" />}
              onClick={handleLogout}
              isLoading={navigating}
            >
              Log out
            </Button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[var(--max-content-width)] w-full px-[var(--space-4)] md:px-[var(--space-8)] py-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <motion.div variants={fadeSlideUp} className="lg:col-span-1">
            <Card elevation="md" className="flex flex-col items-center text-center">
              <Avatar size="xl" fallback={customer.fullName} className="mb-4" />
              <h2 className="text-xl font-bold text-[var(--text-primary)]">{customer.fullName}</h2>
              <div className="flex items-center space-x-2 mt-1 mb-4">
                <Mail className="h-4 w-4 text-[var(--text-muted)]" />
                <span className="text-sm text-[var(--text-secondary)]">{customer.email}</span>
              </div>
              <Badge variant={customer.subscriptionStatus === 'FREE' ? 'secondary' : 'success'}>
                {customer.subscriptionStatus === 'FREE' ? 'Free Plan' : 'Premium'}
              </Badge>
              <div className="w-full mt-6 space-y-3 text-left">
                <div className="flex items-center space-x-3 text-sm text-[var(--text-secondary)]">
                  <Calendar className="h-4 w-4 text-[var(--text-muted)]" />
                  <span>Member since {memberSinceDate}</span>
                </div>
                {customer.lastActive && (
                  <div className="flex items-center space-x-3 text-sm text-[var(--text-secondary)]">
                    <Clock className="h-4 w-4 text-[var(--text-muted)]" />
                    <span>Last active {new Date(customer.lastActive).toLocaleDateString()}</span>
                  </div>
                )}
                {!customer.isEmailVerified && (
                  <div className="flex items-center space-x-3 text-sm text-[var(--color-warning)]">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Email not verified</span>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeSlideUp} className="lg:col-span-2 space-y-8">
            <Card elevation="md">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-[var(--color-primary-50)] text-[var(--color-primary-600)]">
                    <Crown className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">Subscription</h3>
                    <p className="text-sm text-[var(--text-secondary)]">Your current plan and usage</p>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--color-neutral-50)] p-4 rounded-lg border border-[var(--color-neutral-200)] space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">Plan</span>
                  <span className="font-medium text-[var(--text-primary)]">
                    {customer.subscriptionStatus === 'FREE' ? 'Free' : 'Premium Monthly'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">Status</span>
                  <Badge variant={customer.subscriptionStatus === 'FREE' ? 'secondary' : 'success'}>
                    {customer.subscriptionStatus}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">Free previews remaining</span>
                  <span className="font-medium text-[var(--text-primary)]">{customer.freeContentRemaining} / 5</span>
                </div>
              </div>

              {customer.subscriptionStatus === 'FREE' && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[var(--text-secondary)]">Free content limit</span>
                    <span className="font-medium text-[var(--text-primary)]">{customer.freeContentRemaining} remaining</span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--color-neutral-200)] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-600)] transition-all"
                      style={{ width: `${freePercentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-2">
                    You have {customer.freeContentRemaining} free premium views left. Upgrade for unlimited access.
                  </p>
                </div>
              )}

              {customer.subscriptionStatus === 'FREE' ? (
                <div className="bg-[var(--color-warning-light)] border border-[var(--color-warning)] p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-[var(--color-warning-dark)] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-[var(--color-warning-dark)]">Unlock unlimited access</p>
                      <p className="text-sm text-[var(--color-warning-dark)] opacity-90">
                        Get premium content with a monthly subscription — $9.99/mo
                      </p>
                    </div>
                  </div>
                  <Button className="bg-[var(--color-warning-dark)] text-white hover:opacity-90 border-none shrink-0 whitespace-nowrap">
                    Upgrade Now <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="bg-[var(--color-success-light)] border border-[var(--color-success)] p-4 rounded-lg flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[var(--color-success-dark)] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-[var(--color-success-dark)]">Premium Active</p>
                    <p className="text-sm text-[var(--color-success-dark)] opacity-90">
                      Your subscription is active.
                    </p>
                  </div>
                </div>
              )}
            </Card>

            <Card>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 rounded-lg bg-[var(--color-primary-50)] text-[var(--color-primary-600)]">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">Payment History</h3>
                  <p className="text-sm text-[var(--text-secondary)]">Recent transactions</p>
                </div>
              </div>

              <EmptyState
                icon={<BookOpen className="h-8 w-8" />}
                title="No payment history yet"
                description="Payments will appear once you subscribe"
              />
            </Card>

            <Card>
              <h3 className="font-bold text-[var(--text-primary)] mb-4">Quick Links</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href="/content"
                  className="flex items-center space-x-3 p-3 rounded-lg border border-[var(--color-neutral-200)] shadow-[var(--shadow-sm)] hover:bg-[var(--color-neutral-50)] hover:shadow-[var(--shadow-md)] transition-all duration-200"
                >
                  <BookOpen className="h-5 w-5 text-[var(--color-primary-600)]" />
                  <span className="text-sm font-medium text-[var(--text-primary)]">Browse Content</span>
                </Link>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
