"use client";
import { motion } from 'framer-motion';
import { ArrowUpRight, Activity } from 'lucide-react';
import { Card } from '@/components/common/Card/Card';
import { fadeSlideUp, staggerContainer } from '@/utils/animationVariants';

export const DashboardPageClient = ({ 
  stats, 
  recentActivity, 
  topViewedContent 
}: { 
  stats: any[]; 
  recentActivity: any[]; 
  topViewedContent: any[]; 
}) => {
  return (
    <div className="flex flex-col space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Dashboard Overview</h1>
        <p className="text-[var(--text-secondary)]">Welcome back, here's what's happening with your platform today.</p>
      </div>

      {/* Stats Cards */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, i) => {
          // Map string name to actual icon component
          const Icon = require('lucide-react')[stat.icon];
          return (
            <motion.div key={i} variants={fadeSlideUp}>
              <Card className="flex items-center p-6">
                <div className={`p-4 rounded-full ${stat.bg} ${stat.color} mr-4`}>
                  {Icon && <Icon className="h-6 w-6" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-secondary)]">{stat.label}</p>
                  <div className="flex items-end space-x-2">
                    <h3 className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</h3>
                    <span className="text-sm font-medium text-[var(--color-success)] flex items-center mb-1">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      {stat.trend}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Placeholder for Chart */}
        <Card className="lg:col-span-2 flex flex-col min-h-[400px]">
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-6">Views Over Time</h3>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-[var(--color-neutral-200)] rounded-lg bg-[var(--color-neutral-50)]">
            <div className="text-center">
              <Activity className="h-10 w-10 mx-auto text-[var(--text-muted)] mb-2" />
              <p className="text-[var(--text-muted)]">Chart integration goes here</p>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Recent Activity</h3>
            <button className="text-sm font-medium text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)]">
              View all
            </button>
          </div>
          <div className="flex-1 overflow-y-auto pr-2">
            <ul className="space-y-6">
              {recentActivity.map((activity) => (
                <li key={activity.id} className="relative pl-6 before:absolute before:left-2 before:top-2 before:h-full before:w-[2px] before:bg-[var(--color-neutral-200)] last:before:hidden">
                  <span className="absolute left-0 top-1 h-4 w-4 rounded-full border-2 border-[var(--surface-primary)] bg-[var(--color-primary-500)]"></span>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{activity.action}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{activity.subject}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{activity.time}</p>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>

      {/* Top Viewed Posts */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-[var(--text-primary)]">Top Viewed Content</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--color-neutral-200)] text-[var(--text-muted)]">
                <th className="pb-3 font-medium">Content Title</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Views</th>
                <th className="pb-3 font-medium">Earnings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-neutral-100)]">
              {topViewedContent.map((item, i) => (
                <tr key={i}>
                  <td className="py-4 text-[var(--text-primary)] font-medium">{item.title}</td>
                  <td className="py-4">
                    <span className="inline-flex items-center rounded-full bg-[var(--color-success-light)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-success-dark)]">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 text-[var(--text-secondary)]">{item.views}</td>
                  <td className="py-4 text-[var(--text-secondary)]">{item.earnings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
