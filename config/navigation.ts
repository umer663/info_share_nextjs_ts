import {
  Home,
  Info,
  FileText,
  Phone,
  LogIn,
  LayoutDashboard,
  Upload,
  Users,
  UserCheck,
  CreditCard,
  LucideIcon
} from 'lucide-react';

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
}

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  roles?: UserRole[];
  isPublic?: boolean;
  isDashboard?: boolean;
}

export const publicNavItems: NavItem[] = [
  { label: 'Home',        path: '/',             icon: Home,     isPublic: true },
  { label: 'About',       path: '/about',        icon: Info,     isPublic: true },
  { label: 'Content',     path: '/content',      icon: FileText, isPublic: true },
  { label: 'Contact Us',  path: '/contact',      icon: Phone,    isPublic: true },
  { label: 'Login',       path: '/login',        icon: LogIn,    isPublic: true },
];

export const dashboardNavItems: NavItem[] = [
  { label: 'Dashboard',       path: '/dashboard',            icon: LayoutDashboard, isDashboard: true, roles: [UserRole.ADMIN, UserRole.MANAGER] },
  { label: 'Content Hub',     path: '/dashboard/content-hub',icon: Upload,          isDashboard: true, roles: [UserRole.ADMIN, UserRole.MANAGER] },
  { label: 'Users Management',path: '/dashboard/users',      icon: Users,           isDashboard: true, roles: [UserRole.ADMIN] },
  { label: 'Customers',       path: '/dashboard/customers',  icon: UserCheck,       isDashboard: true, roles: [UserRole.ADMIN, UserRole.MANAGER] },
  { label: 'Payments',        path: '/dashboard/payments',   icon: CreditCard,      isDashboard: true, roles: [UserRole.ADMIN] },
];
