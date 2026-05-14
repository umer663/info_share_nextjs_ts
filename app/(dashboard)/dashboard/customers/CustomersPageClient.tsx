"use client";
import { useState } from 'react';
import { Search, X, Mail, Clock, Calendar, CreditCard, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/common/Input/Input';
import { Select } from '@/components/common/Select/Select';
import { Table } from '@/components/common/Table/Table';
import { Badge } from '@/components/common/Badge/Badge';
import { slideInDrawer } from '@/utils/animationVariants';

export const CustomersPageClient = ({ 
  customersData 
}: { 
  customersData: any[];
}) => {
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const total = customersData.length;
  const free = customersData.filter(c => c.subStatus === 'Free').length;
  const active = customersData.filter(c => c.subStatus === 'Premium').length;
  const expired = customersData.filter(c => c.subStatus === 'Expired' || c.subStatus === 'Cancelled').length;

  const columns = [
    { key: 'name', header: 'Name', render: (item: any) => <span className="font-medium text-[var(--text-primary)]">{item.name}</span> },
    { key: 'email', header: 'Email', render: (item: any) => <span className="text-[var(--text-secondary)]">{item.email}</span> },
    { 
      key: 'subStatus', 
      header: 'Subscription',
      render: (item: any) => {
        let variant: any = 'secondary';
        if (item.subStatus === 'Premium') variant = 'success';
        if (item.subStatus === 'Expired') variant = 'error';
        return <Badge variant={variant}>{item.subStatus}</Badge>;
      }
    },
    { key: 'since', header: 'Member Since', render: (item: any) => <span className="text-[var(--text-secondary)]">{item.since}</span> },
    { key: 'lastActive', header: 'Last Active', render: (item: any) => <span className="text-[var(--text-secondary)]">{item.lastActive}</span> },
  ];

  return (
    <div className="flex flex-col space-y-6 relative h-full">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Customers</h1>
          <p className="text-[var(--text-secondary)]">View and manage customer subscriptions.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[{ label: 'Total', value: total.toLocaleString() }, { label: 'Free', value: free.toLocaleString() }, { label: 'Active Premium', value: active.toLocaleString() }, { label: 'Expired', value: expired.toLocaleString() }].map((stat, i) => (
          <div key={i} className="bg-[var(--surface-primary)] p-4 rounded-xl border border-[var(--color-neutral-200)]">
            <p className="text-[var(--text-muted)] text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-[var(--surface-primary)] p-4 rounded-xl border border-[var(--color-neutral-200)] flex flex-col md:flex-row items-center gap-4">
        <div className="w-full md:w-96">
          <Input placeholder="Search customers..." leftIcon={<Search className="w-4 h-4" />} fullWidth />
        </div>
        <div className="w-full md:w-48">
          <Select 
            options={[
              { value: '', label: 'All Subscriptions' },
              { value: 'premium', label: 'Premium' },
              { value: 'free', label: 'Free' },
              { value: 'expired', label: 'Expired' },
            ]}
          />
        </div>
      </div>

      {/* Table */}
      <Table 
        columns={columns}
        data={customersData}
        keyExtractor={(item) => item.id}
        onRowClick={(item) => setSelectedCustomer(item)}
      />

      {/* Slide-in Drawer */}
      <AnimatePresence>
        {selectedCustomer && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedCustomer(null)}
              className="fixed inset-0 z-[var(--z-overlay)] bg-[var(--surface-overlay)] backdrop-blur-sm"
            />
            <motion.div 
              variants={slideInDrawer}
              initial="hidden" animate="visible" exit="exit"
              className="fixed inset-y-0 right-0 z-[var(--z-modal)] w-full max-w-md bg-[var(--surface-primary)] shadow-[var(--shadow-2xl)] border-l border-[var(--color-neutral-200)] flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-[var(--color-neutral-200)]">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">{selectedCustomer.name}</h2>
                <button onClick={() => setSelectedCustomer(null)} className="p-2 rounded-full hover:bg-[var(--color-neutral-100)] text-[var(--text-muted)]">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-[var(--text-secondary)]">
                    <Mail className="h-4 w-4" /> <span>{selectedCustomer.email}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-[var(--text-secondary)]">
                    <Calendar className="h-4 w-4" /> <span>Member since {selectedCustomer.since}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-[var(--text-secondary)]">
                    <Clock className="h-4 w-4" /> <span>Last active {selectedCustomer.lastActive}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-[var(--text-secondary)]">
                    <BookOpen className="h-4 w-4" /> <span>Free content remaining: {selectedCustomer.freeRemaining}/5</span>
                  </div>
                </div>

                {/* Subscription Info */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">Current Subscription</h3>
                  {selectedCustomer.subscription ? (
                    <div className="bg-[var(--color-neutral-50)] p-4 rounded-lg border border-[var(--color-neutral-200)] space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[var(--text-secondary)]">Plan</span>
                        <span className="font-medium text-[var(--text-primary)]">{selectedCustomer.subscription.planName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-secondary)]">Status</span>
                        <Badge variant={selectedCustomer.subStatus === 'Premium' ? 'success' : selectedCustomer.subStatus === 'Expired' ? 'error' : 'secondary'}>
                          {selectedCustomer.subStatus}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-secondary)]">Expires</span>
                        <span className="font-medium text-[var(--text-primary)]">{selectedCustomer.subscription.endDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-secondary)]">Auto-Renew</span>
                        <span className="font-medium text-[var(--text-primary)]">{selectedCustomer.subscription.autoRenew ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[var(--color-neutral-50)] p-4 rounded-lg border border-[var(--color-neutral-200)]">
                      <p className="text-[var(--text-muted)]">No active subscription</p>
                    </div>
                  )}
                </div>

                {/* Payment History */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">Payment History</h3>
                  <div className="space-y-3">
                    {selectedCustomer.payments && selectedCustomer.payments.length > 0 ? selectedCustomer.payments.map((payment: any, i: number) => (
                      <div key={i} className="flex items-center justify-between p-3 border border-[var(--color-neutral-200)] rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-[var(--color-primary-50)] text-[var(--color-primary-600)] rounded-md">
                            <CreditCard className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[var(--text-primary)]">{payment.amount}</p>
                            <p className="text-xs text-[var(--text-muted)]">{payment.date}</p>
                          </div>
                        </div>
                        <Badge variant={payment.status === 'Paid' ? 'success' : payment.status === 'Failed' ? 'error' : 'secondary'}>{payment.status}</Badge>
                      </div>
                    )) : (
                      <p className="text-[var(--text-muted)] text-sm">No payment history</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
