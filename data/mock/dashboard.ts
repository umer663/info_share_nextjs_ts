import { Eye, Play, Users, DollarSign } from 'lucide-react';

export const dashboardStats = [
  { label: 'Total Views', value: '12,450', trend: '+12%', icon: Eye, color: 'text-[var(--color-primary-600)]', bg: 'bg-[var(--color-primary-50)]' },
  { label: 'Total Content', value: '48', trend: '+3', icon: Play, color: 'text-[var(--color-info)]', bg: 'bg-[var(--color-info-light)]' },
  { label: 'Premium Users', value: '126', trend: '+8%', icon: Users, color: 'text-[var(--color-warning)]', bg: 'bg-[var(--color-warning-light)]' },
  { label: 'Monthly Revenue', value: '$4,250', trend: '+15%', icon: DollarSign, color: 'text-[var(--color-success)]', bg: 'bg-[var(--color-success-light)]' },
];

export const recentActivity = [
  { id: 1, action: 'New content uploaded', subject: 'Advanced React Patterns', time: '2 hours ago' },
  { id: 2, action: 'New premium subscriber', subject: 'alex@example.com', time: '4 hours ago' },
  { id: 3, action: 'Payment received', subject: '$99.00 from Annual Plan', time: '5 hours ago' },
  { id: 4, action: 'New user registered', subject: 'sarah@example.com', time: '1 day ago' },
  { id: 5, action: 'Content updated', subject: 'Next.js Routing Guide', time: '1 day ago' },
];

export const topViewedContent = [
  { title: 'Understanding Advanced Patterns', views: '3,200', status: 'Published', earnings: '$450.00' },
  { title: 'React Server Components Deep Dive', views: '2,800', status: 'Published', earnings: '$380.00' },
  { title: 'System Design for Beginners', views: '1,950', status: 'Published', earnings: '$210.00' },
  { title: 'Mastering TypeScript Generics', views: '1,400', status: 'Published', earnings: '$150.00' },
  { title: 'CSS Grid vs Flexbox', views: '950', status: 'Published', earnings: '$85.00' },
];
