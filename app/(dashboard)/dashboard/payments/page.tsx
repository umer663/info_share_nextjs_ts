"use client";
import { useState } from 'react';
import { AlertTriangle, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Table } from '@/components/common/Table/Table';
import { Button } from '@/components/common/Button/Button';
import { Badge } from '@/components/common/Badge/Badge';
import { fadeSlideDown } from '@/utils/animationVariants';
import { expiringData, paymentsData } from '@/data/mock';

export default function PaymentsPage() {
  const [showComposer, setShowComposer] = useState(false);

  // Data imported from mock

  return (
    <div className="flex flex-col space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Payments & Subscriptions</h1>
        <p className="text-[var(--text-secondary)]">Monitor revenue and expiring subscriptions.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[{ label: 'Total Revenue', value: '$45,250' }, { label: 'Monthly Revenue', value: '$4,250' }, { label: 'Paid Invoices', value: '245' }, { label: 'Failed Payments', value: '12' }].map((stat, i) => (
          <div key={i} className="bg-[var(--surface-primary)] p-4 rounded-xl border border-[var(--color-neutral-200)] shadow-sm">
            <p className="text-[var(--text-muted)] text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Expiring Soon */}
        <div className="flex flex-col space-y-4">
          <div className="bg-[var(--color-warning-light)] border border-[var(--color-warning)] p-4 rounded-xl flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-[var(--color-warning-dark)] mt-0.5" />
              <div>
                <h3 className="font-bold text-[var(--color-warning-dark)]">8 subscriptions expiring soon</h3>
                <p className="text-sm text-[var(--color-warning-dark)] opacity-90 mt-1">Within the next 7 days.</p>
              </div>
            </div>
            <Button size="sm" onClick={() => setShowComposer(!showComposer)} className="bg-[var(--color-warning-dark)] hover:bg-[#78350f] text-white border-none">
              Send Reminders
            </Button>
          </div>

          <AnimatePresence>
            {showComposer && (
              <motion.div 
                variants={fadeSlideDown}
                initial="hidden" animate="visible" exit="exit"
                className="bg-[var(--surface-primary)] p-4 rounded-xl border border-[var(--color-neutral-200)] shadow-sm"
              >
                <h4 className="font-bold text-[var(--text-primary)] mb-4">Compose Reminder</h4>
                <div className="mb-4">
                  <p className="text-sm text-[var(--text-secondary)] mb-2">Selected: 2 customers</p>
                  <textarea 
                    className="w-full rounded-md border border-[var(--color-neutral-300)] p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                    rows={4}
                    defaultValue={"Hi {name},\n\nYour {plan} subscription is set to expire on {expiry}. Please ensure your payment method is up to date."}
                  />
                  <p className="text-xs text-[var(--text-muted)] mt-2">Available variables: {'{name}, {plan}, {expiry}'}</p>
                </div>
                <div className="flex justify-end">
                  <Button leftIcon={<Send className="h-4 w-4" />}>Send Messages</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="bg-[var(--surface-primary)] border border-[var(--color-neutral-200)] rounded-xl overflow-hidden">
            <div className="p-4 border-b border-[var(--color-neutral-200)] bg-[var(--color-neutral-50)]">
              <h3 className="font-bold text-[var(--text-primary)]">Expiring Subscriptions List</h3>
            </div>
            <Table 
              className="border-none shadow-none"
              columns={[
                { key: 'customer', header: 'Customer' },
                { key: 'expires', header: 'Expires' },
                { key: 'days', header: 'Days Left', render: (item: any) => <span className="text-[var(--color-error)] font-medium">{item.days}</span> },
              ]}
              data={expiringData}
              keyExtractor={(item) => item.id}
            />
          </div>
        </div>

        {/* All Payments */}
        <div className="flex flex-col space-y-4">
          <div className="bg-[var(--surface-primary)] border border-[var(--color-neutral-200)] rounded-xl overflow-hidden h-full flex flex-col">
            <div className="p-4 border-b border-[var(--color-neutral-200)] bg-[var(--color-neutral-50)] flex justify-between items-center">
              <h3 className="font-bold text-[var(--text-primary)]">Recent Payments</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <Table 
              className="border-none shadow-none"
              columns={[
                { key: 'date', header: 'Date' },
                { key: 'customer', header: 'Customer' },
                { key: 'amount', header: 'Amount', render: (item: any) => <span className="font-medium text-[var(--text-primary)]">{item.amount}</span> },
                { key: 'status', header: 'Status', render: (item: any) => <Badge variant={item.status === 'Paid' ? 'success' : 'error'}>{item.status}</Badge> },
              ]}
              data={paymentsData}
              keyExtractor={(item) => item.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
