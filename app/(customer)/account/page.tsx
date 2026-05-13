"use client";
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

const mockCustomer = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  subscriptionStatus: 'FREE' as const,
  memberSince: 'May 2026',
  freeRemaining: 3,
  lastActive: '2 hours ago',
};

const mockPaymentHistory = [
  { date: 'No payments yet', amount: '—', status: '—' },
];

export default function AccountPage() {
  const router = useRouter();
  const customer = mockCustomer;

  return (
    <div className="flex flex-col bg-[var(--surface-secondary)] min-h-screen">
      <section className="bg-[var(--surface-primary)] border-b border-[var(--color-neutral-200)] py-12">
        <div className="mx-auto max-w-[var(--max-content-width)] px-[var(--space-4)] md:px-[var(--space-8)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[var(--text-primary)]">My Account</h1>
              <p className="mt-1 text-[var(--text-secondary)]">Manage your profile and subscription</p>
            </div>
            <Button
              variant="outline"
              leftIcon={<LogOut className="h-4 w-4" />}
              onClick={() => router.push('/')}
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
            <Card className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center text-[var(--color-primary-600)] text-3xl font-bold mb-4">
                {customer.name.charAt(0)}
              </div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">{customer.name}</h2>
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
                  <span>Member since {customer.memberSince}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-[var(--text-secondary)]">
                  <Clock className="h-4 w-4 text-[var(--text-muted)]" />
                  <span>Last active {customer.lastActive}</span>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeSlideUp} className="lg:col-span-2 space-y-8">
            <Card>
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
                    Active
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">Free previews remaining</span>
                  <span className="font-medium text-[var(--text-primary)]">{customer.freeRemaining} / 5</span>
                </div>
              </div>

              {customer.subscriptionStatus === 'FREE' && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[var(--text-secondary)]">Free content limit</span>
                    <span className="font-medium text-[var(--text-primary)]">{customer.freeRemaining} remaining</span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--color-neutral-200)] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[var(--color-primary-500)] transition-all"
                      style={{ width: `${(customer.freeRemaining / 5) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-2">
                    You have {customer.freeRemaining} free premium views left. Upgrade for unlimited access.
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
                  <Button className="bg-[var(--color-warning-dark)] text-white hover:bg-[#78350f] border-none shrink-0 whitespace-nowrap">
                    Upgrade Now <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="bg-[var(--color-success-light)] border border-[var(--color-success)] p-4 rounded-lg flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[var(--color-success-dark)] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-[var(--color-success-dark)]">Premium Active</p>
                    <p className="text-sm text-[var(--color-success-dark)] opacity-90">
                      Your subscription is active. Next billing date: Jun 15, 2026.
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

              {mockPaymentHistory[0].date === 'No payments yet' ? (
                <div className="text-center py-8">
                  <BookOpen className="h-10 w-10 mx-auto text-[var(--text-muted)] mb-3" />
                  <p className="text-[var(--text-muted)]">No payment history yet</p>
                  <p className="text-sm text-[var(--text-muted)] mt-1">Payments will appear once you subscribe</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-[var(--color-neutral-200)] text-[var(--text-muted)]">
                        <th className="pb-3 font-medium">Date</th>
                        <th className="pb-3 font-medium">Amount</th>
                        <th className="pb-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-neutral-100)]">
                      {mockPaymentHistory.map((payment, i) => (
                        <tr key={i}>
                          <td className="py-3 text-[var(--text-secondary)]">{payment.date}</td>
                          <td className="py-3 text-[var(--text-primary)] font-medium">{payment.amount}</td>
                          <td className="py-3">
                            <Badge variant="secondary">{payment.status}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>

            <Card>
              <h3 className="font-bold text-[var(--text-primary)] mb-4">Quick Links</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href="/content"
                  className="flex items-center space-x-3 p-3 rounded-lg border border-[var(--color-neutral-200)] hover:bg-[var(--color-neutral-50)] transition-colors"
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
