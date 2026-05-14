import { prisma } from '@/lib/prisma';

function relativeTime(date: Date): string {
  const diff = Date.now() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
}

export async function createUser(data: {
  fullName: string;
  email: string;
  passwordHash: string;
  role: 'ADMIN' | 'MANAGER';
}) {
  const user = await prisma.user.create({ data });
  return user;
}

export async function getUsers() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return users.map(user => ({
    id: user.id,
    name: user.fullName,
    email: user.email,
    role: user.role === 'ADMIN' ? 'Admin' : 'Manager',
    status: user.isActive ? 'Active' : 'Inactive',
    avatar: user.avatarUrl ?? '',
  }));
}

export async function getCustomers() {
  const customers = await prisma.customer.findMany({
    include: {
      subscriptions: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
      payments: {
        orderBy: { paidAt: 'desc' },
        take: 10,
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return customers.map(customer => {
    const sub = customer.subscriptions[0];
    return {
      id: customer.id,
      name: customer.fullName,
      email: customer.email,
      subStatus:
        customer.subscriptionStatus === 'ACTIVE' ? 'Premium' :
        customer.subscriptionStatus === 'EXPIRED' ? 'Expired' :
        customer.subscriptionStatus === 'CANCELLED' ? 'Cancelled' : 'Free',
      since: customer.memberSince.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      lastActive: customer.lastActive ? relativeTime(customer.lastActive) : 'Never',
      freeRemaining: customer.freeContentRemaining,
      subscription: sub ? {
        planName: sub.planName,
        status: sub.status,
        endDate: sub.endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        autoRenew: sub.autoRenew,
      } : null,
      payments: customer.payments.map(p => ({
        date: (p.paidAt ?? p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        amount: `$${Number(p.amount).toFixed(2)}`,
        method: p.paymentMethod,
        status: p.status === 'COMPLETED' ? 'Paid' : p.status.charAt(0) + p.status.slice(1).toLowerCase(),
      })),
    };
  });
}

