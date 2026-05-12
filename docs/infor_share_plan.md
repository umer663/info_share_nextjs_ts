# Info Share — Complete Project Document

---

## 1. Project Overview

| Attribute | Detail |
|---|---|
| **Project Name** | Info Share |
| **Type** | Content Sharing & Subscription Platform |
| **Frontend** | React 18+ with TypeScript |
| **Styling** | Single Theme System (CSS Variables / Styled approach) |
| **Target** | Web Browsers (Desktop & Mobile Responsive) |
| **Public Access** | Home, About, Content, Contact Us, Login |
| **Protected Access** | Dashboard, Content Hub, Users Management, Customers, Payments |
| **No Public Signup** | Users are created only by Admin from the dashboard |
| **Subscription Model** | Free users see 5 content items; premium requires monthly subscription |

---

## 2. Architecture Principles

### 2.1 Decoupled Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                     │
│  (React Components, Pages, UI Elements, Animations)      │
├─────────────────────────────────────────────────────────┤
│                     ADAPTER LAYER                         │
│  (API Adapters, Storage Adapters, Payment Adapters)      │
├─────────────────────────────────────────────────────────┤
│                     SERVICE LAYER                         │
│  (AuthService, ContentService, UserService, etc.)        │
├─────────────────────────────────────────────────────────┤
│                   DOMAIN / INTERFACE LAYER                │
│  (Interfaces, Types, Enums, Domain Models)               │
├─────────────────────────────────────────────────────────┤
│                    INFRASTRUCTURE LAYER                   │
│  (HTTP Client, Local Storage, Environment Config)        │
└─────────────────────────────────────────────────────────┘
```

### 2.2 Dependency Rule

> **Dependencies point inward only.** Presentation depends on Adapters. Adapters depend on Services. Services depend on Domain Interfaces. Domain has zero external dependencies.

### 2.3 Key Patterns

- **Adapter Pattern** — Abstracts external concerns (API calls, storage) behind interfaces
- **Service Pattern** — Business logic lives in service classes, never in components
- **Repository Pattern** — Data access abstraction for content, users, payments
- **Observer Pattern** — Event-driven state updates for real-time dashboard stats
- **Strategy Pattern** — Payment gateway abstraction (swappable providers)
- **Singleton Pattern** — For service instances (via dependency injection container)

---

## 3. Technology Stack

| Category | Technology | Purpose |
|---|---|---|
| **Core** | React 18+ | UI Library |
| **Language** | TypeScript 5+ | Type Safety |
| **Build** | Vite 5+ | Bundling & Dev Server |
| **Routing** | React Router v6 | Client-side Routing |
| **State** | Zustand | Lightweight State Management |
| **HTTP** | Axios | API Communication |
| **Forms** | React Hook Form + Zod | Form Handling & Validation |
| **Icons** | Lucide React | Icon System |
| **Animation** | Framer Motion | Page & Element Animations |
| **Notifications** | React Hot Toast | Toast Messages |
| **Date** | date-fns | Date Formatting |
| **Theme** | CSS Custom Properties | Single Theme File |
| **Linting** | ESLint + Prettier | Code Quality |
| **Testing** | Vitest + React Testing Library | Unit & Integration Tests |

---

## 4. Project Directory Structure

```
src/
├── app/
│   ├── App.tsx
│   ├── routes/
│   │   ├── PublicRoutes.tsx
│   │   ├── ProtectedRoutes.tsx
│   │   └── AdminRoutes.tsx
│   └── providers/
│       ├── ThemeProvider.tsx
│       ├── AuthProvider.tsx
│       └── AppProviders.tsx
│
├── assets/
│   ├── images/
│   ├── fonts/
│   └── icons/
│
├── config/
│   ├── theme.ts                    ← SINGLE THEME FILE
│   ├── navigation.ts               ← All nav links defined here
│   ├── constants.ts                ← App-wide constants
│   └── env.ts                      ← Environment variables
│
├── domain/
│   ├── interfaces/
│   │   ├── IAuthService.ts
│   │   ├── IContentService.ts
│   │   ├── IUserService.ts
│   │   ├── ICustomerService.ts
│   │   ├── IPaymentService.ts
│   │   ├── INotificationService.ts
│   │   ├── IHttpClient.ts
│   │   └── IStorageAdapter.ts
│   │
│   ├── models/
│   │   ├── User.ts
│   │   ├── Content.ts
│   │   ├── Customer.ts
│   │   ├── Payment.ts
│   │   ├── Subscription.ts
│   │   ├── DashboardStats.ts
│   │   ├── ContactMessage.ts
│   │   └── ApiResponse.ts
│   │
│   ├── enums/
│   │   ├── UserRole.ts
│   │   ├── ContentStatus.ts
│   │   ├── SubscriptionStatus.ts
│   │   ├── PaymentStatus.ts
│   │   └── ToastType.ts
│   │
│   └── types/
│       ├── AuthTypes.ts
│       ├── ContentTypes.ts
│       ├── DashboardTypes.ts
│       └── PaymentTypes.ts
│
├── services/
│   ├── AuthService.ts
│   ├── ContentService.ts
│   ├── UserService.ts
│   ├── CustomerService.ts
│   ├── PaymentService.ts
│   ├── DashboardService.ts
│   ├── ContactService.ts
│   └── NotificationService.ts
│
├── adapters/
│   ├── api/
│   │   ├── AxiosHttpClientAdapter.ts
│   │   ├── endpoints/
│   │   │   ├── authEndpoints.ts
│   │   │   ├── contentEndpoints.ts
│   │   │   ├── userEndpoints.ts
│   │   │   ├── customerEndpoints.ts
│   │   │   └── paymentEndpoints.ts
│   │   └── interceptors/
│   │       ├── authInterceptor.ts
│   │       ├── errorInterceptor.ts
│   │       └── loggingInterceptor.ts
│   │
│   ├── storage/
│   │   ├── LocalStorageAdapter.ts
│   │   └── SessionStorageAdapter.ts
│   │
│   └── payment/
│       └── PaymentGatewayAdapter.ts
│
├── stores/
│   ├── authStore.ts
│   ├── contentStore.ts
│   ├── dashboardStore.ts
│   ├── customerStore.ts
│   └── uiStore.ts
│
├── hooks/
│   ├── useAuth.ts
│   ├── useContent.ts
│   ├── useDashboard.ts
│   ├── useCustomers.ts
│   ├── usePayments.ts
│   ├── useTheme.ts
│   ├── useDebounce.ts
│   ├── useMediaQuery.ts
│   └── usePagination.ts
│
├── components/
│   ├── common/
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Select/
│   │   ├── Toggle/
│   │   ├── Modal/
│   │   ├── Table/
│   │   ├── Card/
│   │   ├── Badge/
│   │   ├── Avatar/
│   │   ├── Tooltip/
│   │   ├── Spinner/
│   │   ├── EmptyState/
│   │   ├── Pagination/
│   │   ├── SearchBar/
│   │   ├── FileUpload/
│   │   ├── StatCard/
│   │   └── ConfirmDialog/
│   │
│   ├── layout/
│   │   ├── PublicLayout/
│   │   │   ├── PublicLayout.tsx
│   │   │   ├── PublicHeader.tsx
│   │   │   ├── PublicFooter.tsx
│   │   │   └── MobileMenu.tsx
│   │   │
│   │   ├── DashboardLayout/
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── TopBar.tsx
│   │   │   └── MobileSidebar.tsx
│   │   │
│   │   └── AuthLayout/
│   │       └── AuthLayout.tsx
│   │
│   ├── content/
│   │   ├── ContentCard.tsx
│   │   ├── ContentListItem.tsx
│   │   ├── ContentForm.tsx
│   │   ├── ContentFilter.tsx
│   │   └── PremiumLock.tsx
│   │
│   ├── dashboard/
│   │   ├── StatsOverview.tsx
│   │   ├── TopViewedPosts.tsx
│   │   ├── ViewersChart.tsx
│   │   ├── RecentActivity.tsx
│   │   └── QuickActions.tsx
│   │
│   ├── users/
│   │   ├── UserTable.tsx
│   │   ├── UserForm.tsx
│   │   └── UserDetail.tsx
│   │
│   ├── customers/
│   │   ├── CustomerTable.tsx
│   │   ├── CustomerDetail.tsx
│   │   ├── SubscriptionBadge.tsx
│   │   └── PaymentHistory.tsx
│   │
│   └── payments/
│       ├── PaymentTable.tsx
│       ├── ExpiryTracker.tsx
│       ├── ReminderComposer.tsx
│       └── RevenueChart.tsx
│
├── pages/
│   ├── public/
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ContentPage.tsx
│   │   ├── ContactPage.tsx
│   │   └── LoginPage.tsx
│   │
│   ├── dashboard/
│   │   ├── DashboardPage.tsx
│   │   ├── ContentHubPage.tsx
│   │   ├── UsersManagementPage.tsx
│   │   ├── CustomersPage.tsx
│   │   └── PaymentsPage.tsx
│   │
│   └── errors/
│       ├── NotFoundPage.tsx
│       ├── UnauthorizedPage.tsx
│       └── ServerErrorPage.tsx
│
├── utils/
│   ├── formatters.ts
│   ├── validators.ts
│   ├── helpers.ts
│   ├── cn.ts                       ← classname merger
│   └── animationVariants.ts        ← Framer Motion variants
│
└── styles/
    ├── globals.css                  ← CSS reset + variable imports
    ├── theme.css                    ← All CSS custom properties
    └── animations.css               ← Keyframe animations
```

---

## 5. Single Theme System

### 5.1 Theme Configuration (`config/theme.ts`)

```typescript
// config/theme.ts
export const theme = {
  colors: {
    // Primary palette
    primary: {
      50:  '#EEF2FF',
      100: '#E0E7FF',
      200: '#C7D2FE',
      300: '#A5B4FC',
      400: '#818CF8',
      500: '#6366F1',
      600: '#4F46E5',
      700: '#4338CA',
      800: '#3730A3',
      900: '#312E81',
    },
    // Neutral palette
    neutral: {
      0:   '#FFFFFF',
      50:  '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
      950: '#030712',
    },
    // Semantic
    success: { light: '#D1FAE5', DEFAULT: '#10B981', dark: '#065F46' },
    warning: { light: '#FEF3C7', DEFAULT: '#F59E0B', dark: '#92400E' },
    error:   { light: '#FEE2E2', DEFAULT: '#EF4444', dark: '#991B1B' },
    info:    { light: '#DBEAFE', DEFAULT: '#3B82F6', dark: '#1E40AF' },
    // Surfaces
    surface: {
      primary:   'var(--color-neutral-0)',
      secondary: 'var(--color-neutral-50)',
      elevated:  'var(--color-neutral-100)',
      overlay:   'rgba(0, 0, 0, 0.5)',
    },
    // Text
    text: {
      primary:   'var(--color-neutral-900)',
      secondary: 'var(--color-neutral-600)',
      muted:     'var(--color-neutral-400)',
      inverse:   'var(--color-neutral-0)',
    },
  },

  typography: {
    fontFamily: {
      heading: "'Inter', sans-serif",
      body:    "'Inter', sans-serif",
      mono:    "'JetBrains Mono', monospace",
    },
    fontSize: {
      xs:  '0.75rem',    // 12px
      sm:  '0.875rem',   // 14px
      base:'1rem',       // 16px
      lg:  '1.125rem',   // 18px
      xl:  '1.25rem',    // 20px
      '2xl':'1.5rem',    // 24px
      '3xl':'1.875rem',  // 30px
      '4xl':'2.25rem',   // 36px
      '5xl':'3rem',      // 48px
    },
    fontWeight: {
      normal:  '400',
      medium:  '500',
      semibold:'600',
      bold:    '700',
      extrabold:'800',
    },
    lineHeight: {
      tight:  '1.25',
      normal: '1.5',
      relaxed:'1.75',
    },
  },

  spacing: {
    0:  '0',
    1:  '0.25rem',   // 4px
    2:  '0.5rem',    // 8px
    3:  '0.75rem',   // 12px
    4:  '1rem',      // 16px
    5:  '1.25rem',   // 20px
    6:  '1.5rem',    // 24px
    8:  '2rem',      // 32px
    10: '2.5rem',    // 40px
    12: '3rem',      // 48px
    16: '4rem',      // 64px
    20: '5rem',      // 80px
    24: '6rem',      // 96px
  },

  borderRadius: {
    none: '0',
    sm:   '0.25rem',
    md:   '0.5rem',
    lg:   '0.75rem',
    xl:   '1rem',
    '2xl':'1.5rem',
    full: '9999px',
  },

  shadows: {
    xs:   '0 1px 2px rgba(0, 0, 0, 0.05)',
    sm:   '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    md:   '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg:   '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl:   '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl':'0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner:'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
  },

  breakpoints: {
    sm:  '640px',
    md:  '768px',
    lg:  '1024px',
    xl:  '1280px',
    '2xl':'1536px',
  },

  transitions: {
    fast:    '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal:  '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow:    '350ms cubic-bezier(0.4, 0, 0.2, 1)',
    spring:  '500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  },

  zIndex: {
    dropdown: '1000',
    sticky:   '1020',
    fixed:    '1030',
    overlay:  '1040',
    modal:    '1050',
    popover:  '1060',
    tooltip:  '1070',
    toast:    '1080',
  },

  animation: {
    duration: {
      fast:   0.15,
      normal: 0.3,
      slow:   0.5,
      slower: 0.8,
    },
    stagger: 0.05,
  },
} as const;

export type Theme = typeof theme;
```

### 5.2 CSS Variables (`styles/theme.css`)

```css
:root {
  /* Primary */
  --color-primary-50:  #EEF2FF;
  --color-primary-100: #E0E7FF;
  --color-primary-200: #C7D2FE;
  --color-primary-300: #A5B4FC;
  --color-primary-400: #818CF8;
  --color-primary-500: #6366F1;
  --color-primary-600: #4F46E5;
  --color-primary-700: #4338CA;
  --color-primary-800: #3730A3;
  --color-primary-900: #312E81;

  /* Neutral */
  --color-neutral-0:   #FFFFFF;
  --color-neutral-50:  #F9FAFB;
  --color-neutral-100: #F3F4F6;
  --color-neutral-200: #E5E7EB;
  --color-neutral-300: #D1D5DB;
  --color-neutral-400: #9CA3AF;
  --color-neutral-500: #6B7280;
  --color-neutral-600: #4B5563;
  --color-neutral-700: #374151;
  --color-neutral-800: #1F2937;
  --color-neutral-900: #111827;
  --color-neutral-950: #030712;

  /* Semantic */
  --color-success-light: #D1FAE5;
  --color-success:       #10B981;
  --color-success-dark:  #065F46;
  --color-warning-light: #FEF3C7;
  --color-warning:       #F59E0B;
  --color-warning-dark:  #92400E;
  --color-error-light:   #FEE2E2;
  --color-error:         #EF4444;
  --color-error-dark:    #991B1B;
  --color-info-light:    #DBEAFE;
  --color-info:          #3B82F6;
  --color-info-dark:     #1E40AF;

  /* Surfaces */
  --surface-primary:   var(--color-neutral-0);
  --surface-secondary: var(--color-neutral-50);
  --surface-elevated:  var(--color-neutral-100);
  --surface-overlay:   rgba(0, 0, 0, 0.5);

  /* Text */
  --text-primary:   var(--color-neutral-900);
  --text-secondary: var(--color-neutral-600);
  --text-muted:     var(--color-neutral-400);
  --text-inverse:   var(--color-neutral-0);

  /* Typography */
  --font-heading: 'Inter', sans-serif;
  --font-body:    'Inter', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;

  --text-xs:   0.75rem;
  --text-sm:   0.875rem;
  --text-base: 1rem;
  --text-lg:   1.125rem;
  --text-xl:   1.25rem;
  --text-2xl:  1.5rem;
  --text-3xl:  1.875rem;
  --text-4xl:  2.25rem;
  --text-5xl:  3rem;

  /* Spacing */
  --space-1:  0.25rem;
  --space-2:  0.5rem;
  --space-3:  0.75rem;
  --space-4:  1rem;
  --space-5:  1.25rem;
  --space-6:  1.5rem;
  --space-8:  2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;

  /* Border Radius */
  --radius-sm:   0.25rem;
  --radius-md:   0.5rem;
  --radius-lg:   0.75rem;
  --radius-xl:   1rem;
  --radius-2xl:  1.5rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-xs:   0 1px 2px rgba(0,0,0,0.05);
  --shadow-sm:   0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);
  --shadow-md:   0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
  --shadow-lg:   0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
  --shadow-xl:   0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
  --shadow-2xl:  0 25px 50px -12px rgba(0,0,0,0.25);

  /* Transitions */
  --transition-fast:   150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow:   350ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-spring: 500ms cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Z-Index */
  --z-dropdown: 1000;
  --z-sticky:   1020;
  --z-fixed:    1030;
  --z-overlay:  1040;
  --z-modal:    1050;
  --z-popover:  1060;
  --z-tooltip:  1070;
  --z-toast:    1080;

  /* Layout */
  --header-height: 4rem;
  --sidebar-width: 16rem;
  --sidebar-collapsed-width: 4.5rem;
  --max-content-width: 1280px;
}
```

---

## 6. Domain Models & Interfaces

### 6.1 Enums (`domain/enums/`)

```typescript
// domain/enums/UserRole.ts
export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
}

// domain/enums/ContentStatus.ts
export enum ContentStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

// domain/enums/SubscriptionStatus.ts
export enum SubscriptionStatus {
  FREE = 'FREE',
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
}

// domain/enums/PaymentStatus.ts
export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}
```

### 6.2 Models (`domain/models/`)

```typescript
// domain/models/User.ts
export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  isActive: boolean;
  lastLogin: string;           // ISO date
  createdAt: string;
  updatedAt: string;
}

// domain/models/Content.ts
export interface Content {
  id: string;
  contentTitle: string;
  contentDescription: string;
  contentImageUrl?: string;
  contentVideoUrl?: string;
  isPremium: boolean;
  status: ContentStatus;
  viewCount: number;
  createdBy: string;           // User ID
  createdAt: string;
  updatedAt: string;
}

// domain/models/Customer.ts
export interface Customer {
  id: string;
  fullName: string;
  email: string;
  subscriptionStatus: SubscriptionStatus;
  memberSince: string;
  lastActive: string;
  contentViewedCount: number;
  freeContentRemaining: number;  // 0-5
  currentSubscription?: Subscription;
  paymentHistory: Payment[];
}

// domain/models/Subscription.ts
export interface Subscription {
  id: string;
  customerId: string;
  planName: string;
  price: number;
  currency: string;
  startDate: string;
  endDate: string;
  status: SubscriptionStatus;
  autoRenew: boolean;
}

// domain/models/Payment.ts
export interface Payment {
  id: string;
  customerId: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod: string;
  transactionId?: string;
  paidAt: string;
}

// domain/models/DashboardStats.ts
export interface DashboardStats {
  totalContentViews: number;
  totalContentItems: number;
  totalCustomers: number;
  totalPremiumCustomers: number;
  totalRevenue: number;
  monthlyRevenue: number;
  viewsByContent: ContentViewStat[];
  viewsOverTime: ViewsOverTimeStat[];
  topViewedPosts: Content[];
  recentActivity: ActivityItem[];
}

export interface ContentViewStat {
  contentId: string;
  contentTitle: string;
  viewCount: number;
  percentage: number;           // of total views
}

export interface ViewsOverTimeStat {
  date: string;
  views: number;
}

export interface ActivityItem {
  id: string;
  type: 'content_upload' | 'new_customer' | 'subscription' | 'payment';
  description: string;
  timestamp: string;
}

// domain/models/ContactMessage.ts
export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

// domain/models/ApiResponse.ts
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: Pagination;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiError {
  success: false;
  message: string;
  errorCode?: string;
  errors?: Record<string, string[]>;
}
```

### 6.3 Service Interfaces (`domain/interfaces/`)

```typescript
// domain/interfaces/IAuthService.ts
export interface IAuthService {
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User>;
  refreshToken(): Promise<AuthResponse>;
  isAuthenticated(): boolean;
}

// domain/interfaces/IContentService.ts
export interface IContentService {
  getAll(params: ContentQueryParams): Promise<PaginatedResponse<Content>>;
  getById(id: string): Promise<Content>;
  create(data: CreateContentDTO): Promise<Content>;
  update(id: string, data: UpdateContentDTO): Promise<Content>;
  delete(id: string): Promise<void>;
  getPublicContent(params: PublicContentQueryParams): Promise<PaginatedResponse<Content>>;
  incrementViewCount(id: string): Promise<void>;
}

// domain/interfaces/IUserService.ts
export interface IUserService {
  getAll(params: UserQueryParams): Promise<PaginatedResponse<User>>;
  getById(id: string): Promise<User>;
  create(data: CreateUserDTO): Promise<User>;
  update(id: string, data: UpdateUserDTO): Promise<User>;
  delete(id: string): Promise<void>;
  toggleActive(id: string): Promise<User>;
}

// domain/interfaces/ICustomerService.ts
export interface ICustomerService {
  getAll(params: CustomerQueryParams): Promise<PaginatedResponse<Customer>>;
  getById(id: string): Promise<Customer>;
  getPaymentHistory(customerId: string): Promise<Payment[]>;
  updateSubscriptionStatus(customerId: string, status: SubscriptionStatus): Promise<Customer>;
}

// domain/interfaces/IPaymentService.ts
export interface IPaymentService {
  getAll(params: PaymentQueryParams): Promise<PaginatedResponse<Payment>>;
  getById(id: string): Promise<Payment>;
  getExpiringSubscriptions(daysBeforeExpiry: number): Promise<Subscription[]>;
  sendRenewalReminder(subscriptionId: string, message: string): Promise<void>;
  sendBulkReminders(subscriptionIds: string[], message: string): Promise<void>;
  getRevenueStats(period: RevenuePeriod): Promise<RevenueStats>;
}

// domain/interfaces/IDashboardService.ts
export interface IDashboardService {
  getStats(): Promise<DashboardStats>;
  getTopViewedPosts(limit: number): Promise<Content[]>;
  getViewsByContent(): Promise<ContentViewStat[]>;
  getViewsOverTime(range: DateRange): Promise<ViewsOverTimeStat[]>;
}

// domain/interfaces/IHttpClient.ts
export interface IHttpClient {
  get<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>>;
  post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>>;
  put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>>;
  patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>>;
  delete<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>>;
  setAuthToken(token: string): void;
  removeAuthToken(): void;
}

// domain/interfaces/IStorageAdapter.ts
export interface IStorageAdapter {
  getItem<T>(key: string): T | null;
  setItem<T>(key: string, value: T): void;
  removeItem(key: string): void;
  clear(): void;
}

// domain/interfaces/IContactService.ts
export interface IContactService {
  submitMessage(data: CreateContactMessageDTO): Promise<ContactMessage>;
  getAll(params: MessageQueryParams): Promise<PaginatedResponse<ContactMessage>>;
  markAsRead(id: string): Promise<ContactMessage>;
}
```

### 6.4 DTOs (`domain/types/`)

```typescript
// domain/types/AuthTypes.ts
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// domain/types/ContentTypes.ts
export interface CreateContentDTO {
  contentTitle: string;
  contentDescription: string;
  contentImage?: File | null;
  contentVideo?: File | null;
  isPremium: boolean;
  status?: ContentStatus;
}

export interface UpdateContentDTO {
  contentTitle?: string;
  contentDescription?: string;
  contentImage?: File | null;
  contentVideo?: File | null;
  isPremium?: boolean;
  status?: ContentStatus;
}

export interface ContentQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: ContentStatus;
  isPremium?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PublicContentQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  isPremium?: boolean;
}

// domain/types/DashboardTypes.ts
export interface DateRange {
  from: string;
  to: string;
}

export type RevenuePeriod = 'today' | 'week' | 'month' | 'quarter' | 'year' | 'all';

export interface RevenueStats {
  total: number;
  periodTotal: number;
  average: number;
  growthPercentage: number;
  byMonth: MonthlyRevenue[];
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
}
```

---

## 7. Adapter Implementations

### 7.1 HTTP Client Adapter (`adapters/api/AxiosHttpClientAdapter.ts`)

```typescript
// adapters/api/AxiosHttpClientAdapter.ts
import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { IHttpClient } from '@/domain/interfaces/IHttpClient';
import { ApiResponse } from '@/domain/models/ApiResponse';
import { ApiError } from '@/domain/models/ApiResponse';
import { config } from '@/config/constants';

export class AxiosHttpClientAdapter implements IHttpClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: config.apiBaseUrl,
      timeout: config.apiTimeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor - attach auth token
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem(config.storageKeys?.accessToken || 'access_token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - handle errors globally
    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Handle 401 - Token expired
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          // Trigger refresh token flow
          // ... implementation
        }

        const apiError: ApiError = {
          success: false,
          message: error.response?.data?.message || 'An unexpected error occurred',
          errorCode: error.response?.data?.errorCode,
          errors: error.response?.data?.errors,
        };

        return Promise.reject(apiError);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.delete<ApiResponse<T>>(url, config);
    return response.data;
  }

  setAuthToken(token: string): void {
    this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  removeAuthToken(): void {
    delete this.instance.defaults.headers.common['Authorization'];
  }
}
```

### 7.2 Storage Adapter (`adapters/storage/LocalStorageAdapter.ts`)

```typescript
// adapters/storage/LocalStorageAdapter.ts
import { IStorageAdapter } from '@/domain/interfaces/IStorageAdapter';

export class LocalStorageAdapter implements IStorageAdapter {
  getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch {
      return null;
    }
  }

  setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('LocalStorage setItem failed:', error);
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
```

### 7.3 API Endpoints (`adapters/api/endpoints/`)

```typescript
// adapters/api/endpoints/authEndpoints.ts
export const authEndpoints = {
  LOGIN:            '/auth/login',
  LOGOUT:           '/auth/logout',
  REFRESH_TOKEN:    '/auth/refresh',
  GET_CURRENT_USER: '/auth/me',
} as const;

// adapters/api/endpoints/contentEndpoints.ts
export const contentEndpoints = {
  GET_ALL:     '/content',
  GET_BY_ID:   (id: string) => `/content/${id}`,
  CREATE:      '/content',
  UPDATE:      (id: string) => `/content/${id}`,
  DELETE:      (id: string) => `/content/${id}`,
  PUBLIC:      '/public/content',
  INCREMENT_VIEW: (id: string) => `/public/content/${id}/view`,
} as const;

// adapters/api/endpoints/userEndpoints.ts
export const userEndpoints = {
  GET_ALL:      '/users',
  GET_BY_ID:    (id: string) => `/users/${id}`,
  CREATE:       '/users',
  UPDATE:       (id: string) => `/users/${id}`,
  DELETE:       (id: string) => `/users/${id}`,
  TOGGLE_ACTIVE:(id: string) => `/users/${id}/toggle-active`,
} as const;

// adapters/api/endpoints/customerEndpoints.ts
export const customerEndpoints = {
  GET_ALL:            '/customers',
  GET_BY_ID:          (id: string) => `/customers/${id}`,
  PAYMENT_HISTORY:    (id: string) => `/customers/${id}/payments`,
  UPDATE_SUBSCRIPTION:(id: string) => `/customers/${id}/subscription`,
} as const;

// adapters/api/endpoints/paymentEndpoints.ts
export const paymentEndpoints = {
  GET_ALL:                '/payments',
  GET_BY_ID:              (id: string) => `/payments/${id}`,
  EXPIRING_SUBSCRIPTIONS: (days: number) => `/payments/expiring?days=${days}`,
  SEND_REMINDER:          (id: string) => `/payments/${id}/reminder`,
  SEND_BULK_REMINDERS:    '/payments/reminders/bulk',
  REVENUE_STATS:          (period: string) => `/payments/revenue?period=${period}`,
} as const;
```

---

## 8. Service Implementations

### 8.1 Auth Service (`services/AuthService.ts`)

```typescript
// services/AuthService.ts
import { IAuthService } from '@/domain/interfaces/IAuthService';
import { IHttpClient } from '@/domain/interfaces/IHttpClient';
import { IStorageAdapter } from '@/domain/interfaces/IStorageAdapter';
import { LoginCredentials, AuthResponse } from '@/domain/types/AuthTypes';
import { User } from '@/domain/models/User';
import { authEndpoints } from '@/adapters/api/endpoints/authEndpoints';

export class AuthService implements IAuthService {
  constructor(
    private readonly httpClient: IHttpClient,
    private readonly storage: IStorageAdapter
  ) {}

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.httpClient.post<AuthResponse>(
      authEndpoints.LOGIN,
      credentials
    );
    this.storage.setItem('access_token', response.data.accessToken);
    this.storage.setItem('refresh_token', response.data.refreshToken);
    this.storage.setItem('user', response.data.user);
    this.httpClient.setAuthToken(response.data.accessToken);
    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await this.httpClient.post(authEndpoints.LOGOUT);
    } finally {
      this.storage.removeItem('access_token');
      this.storage.removeItem('refresh_token');
      this.storage.removeItem('user');
      this.httpClient.removeAuthToken();
    }
  }

  async getCurrentUser(): Promise<User> {
    const cached = this.storage.getItem<User>('user');
    if (cached) return cached;
    const response = await this.httpClient.get<User>(authEndpoints.GET_CURRENT_USER);
    this.storage.setItem('user', response.data);
    return response.data;
  }

  async refreshToken(): Promise<AuthResponse> {
    const refreshToken = this.storage.getItem<string>('refresh_token');
    if (!refreshToken) throw new Error('No refresh token available');

    const response = await this.httpClient.post<AuthResponse>(
      authEndpoints.REFRESH_TOKEN,
      { refreshToken }
    );
    this.storage.setItem('access_token', response.data.accessToken);
    this.storage.setItem('refresh_token', response.data.refreshToken);
    this.httpClient.setAuthToken(response.data.accessToken);
    return response.data;
  }

  isAuthenticated(): boolean {
    return !!this.storage.getItem<string>('access_token');
  }
}
```

### 8.2 Content Service (`services/ContentService.ts`)

```typescript
// services/ContentService.ts
import { IContentService } from '@/domain/interfaces/IContentService';
import { IHttpClient } from '@/domain/interfaces/IHttpClient';
import { Content } from '@/domain/models/Content';
import { ApiResponse, PaginatedResponse } from '@/domain/models/ApiResponse';
import {
  CreateContentDTO,
  UpdateContentDTO,
  ContentQueryParams,
  PublicContentQueryParams,
} from '@/domain/types/ContentTypes';
import { contentEndpoints } from '@/adapters/api/endpoints/contentEndpoints';

export class ContentService implements IContentService {
  constructor(private readonly httpClient: IHttpClient) {}

  async getAll(params: ContentQueryParams): Promise<PaginatedResponse<Content>> {
    const response = await this.httpClient.get<Content[]>(
      contentEndpoints.GET_ALL,
      { params }
    );
    return {
      data: response.data,
      pagination: response.pagination!,
    };
  }

  async getById(id: string): Promise<Content> {
    const response = await this.httpClient.get<Content>(
      contentEndpoints.GET_BY_ID(id)
    );
    return response.data;
  }

  async create(data: CreateContentDTO): Promise<Content> {
    const formData = new FormData();
    formData.append('contentTitle', data.contentTitle);
    formData.append('contentDescription', data.contentDescription);
    formData.append('isPremium', String(data.isPremium));
    if (data.status) formData.append('status', data.status);
    if (data.contentImage) formData.append('contentImage', data.contentImage);
    if (data.contentVideo) formData.append('contentVideo', data.contentVideo);

    const response = await this.httpClient.post<Content>(
      contentEndpoints.CREATE,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data;
  }

  async update(id: string, data: UpdateContentDTO): Promise<Content> {
    const formData = new FormData();
    if (data.contentTitle) formData.append('contentTitle', data.contentTitle);
    if (data.contentDescription) formData.append('contentDescription', data.contentDescription);
    if (data.isPremium !== undefined) formData.append('isPremium', String(data.isPremium));
    if (data.status) formData.append('status', data.status);
    if (data.contentImage) formData.append('contentImage', data.contentImage);
    if (data.contentVideo) formData.append('contentVideo', data.contentVideo);

    const response = await this.httpClient.put<Content>(
      contentEndpoints.UPDATE(id),
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await this.httpClient.delete(contentEndpoints.DELETE(id));
  }

  async getPublicContent(params: PublicContentQueryParams): Promise<PaginatedResponse<Content>> {
    const response = await this.httpClient.get<Content[]>(
      contentEndpoints.PUBLIC,
      { params }
    );
    return {
      data: response.data,
      pagination: response.pagination!,
    };
  }

  async incrementViewCount(id: string): Promise<void> {
    await this.httpClient.post(contentEndpoints.INCREMENT_VIEW(id));
  }
}
```

### 8.3 Dependency Injection (`services/ServiceContainer.ts`)

```typescript
// services/ServiceContainer.ts
import { AxiosHttpClientAdapter } from '@/adapters/api/AxiosHttpClientAdapter';
import { LocalStorageAdapter } from '@/adapters/storage/LocalStorageAdapter';
import { SessionStorageAdapter } from '@/adapters/storage/SessionStorageAdapter';
import { IHttpClient } from '@/domain/interfaces/IHttpClient';
import { IStorageAdapter } from '@/domain/interfaces/IStorageAdapter';
import { IAuthService } from '@/domain/interfaces/IAuthService';
import { IContentService } from '@/domain/interfaces/IContentService';
import { IUserService } from '@/domain/interfaces/IUserService';
import { ICustomerService } from '@/domain/interfaces/ICustomerService';
import { IPaymentService } from '@/domain/interfaces/IPaymentService';
import { IDashboardService } from '@/domain/interfaces/IDashboardService';
import { IContactService } from '@/domain/interfaces/IContactService';
import { AuthService } from './AuthService';
import { ContentService } from './ContentService';
import { UserService } from './UserService';
import { CustomerService } from './CustomerService';
import { PaymentService } from './PaymentService';
import { DashboardService } from './DashboardService';
import { ContactService } from './ContactService';

class ServiceContainer {
  private static instance: ServiceContainer;
  private services: Map<string, unknown> = new Map();

  private constructor() {
    this.registerCoreServices();
    this.registerApplicationServices();
  }

  static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer();
    }
    return ServiceContainer.instance;
  }

  private registerCoreServices(): void {
    this.services.set('IHttpClient', new AxiosHttpClientAdapter());
    this.services.set('ILocalStorage', new LocalStorageAdapter());
    this.services.set('ISessionStorage', new SessionStorageAdapter());
  }

  private registerApplicationServices(): void {
    const httpClient = this.resolve<IHttpClient>('IHttpClient');
    const localStorage = this.resolve<IStorageAdapter>('ILocalStorage');

    this.services.set('IAuthService', new AuthService(httpClient, localStorage));
    this.services.set('IContentService', new ContentService(httpClient));
    this.services.set('IUserService', new UserService(httpClient));
    this.services.set('ICustomerService', new CustomerService(httpClient));
    this.services.set('IPaymentService', new PaymentService(httpClient));
    this.services.set('IDashboardService', new DashboardService(httpClient));
    this.services.set('IContactService', new ContactService(httpClient));
  }

  resolve<T>(interfaceName: string): T {
    const service = this.services.get(interfaceName);
    if (!service) {
      throw new Error(`Service "${interfaceName}" not registered in container.`);
    }
    return service as T;
  }
}

export const serviceContainer = ServiceContainer.getInstance();

// Convenience exports
export const authService     = serviceContainer.resolve<IAuthService>('IAuthService');
export const contentService  = serviceContainer.resolve<IContentService>('IContentService');
export const userService     = serviceContainer.resolve<IUserService>('IUserService');
export const customerService = serviceContainer.resolve<ICustomerService>('ICustomerService');
export const paymentService  = serviceContainer.resolve<IPaymentService>('IPaymentService');
export const dashboardService= serviceContainer.resolve<IDashboardService>('IDashboardService');
export const contactService  = serviceContainer.resolve<IContactService>('IContactService');
```

---

## 9. Routing Architecture

### 9.1 Navigation Config (`config/navigation.ts`)

```typescript
// config/navigation.ts
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
} from 'lucide-react';
import { UserRole } from '@/domain/enums/UserRole';

export interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
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
```

### 9.2 Route Definitions (`app/routes/`)

```typescript
// app/routes/PublicRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import { PublicLayout } from '@/components/layout/PublicLayout/PublicLayout';
import { HomePage } from '@/pages/public/HomePage';
import { AboutPage } from '@/pages/public/AboutPage';
import { ContentPage } from '@/pages/public/ContentPage';
import { ContactPage } from '@/pages/public/ContactPage';
import { LoginPage } from '@/pages/public/LoginPage';

export const PublicRoutes = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path="/"           element={<HomePage />} />
      <Route path="/about"      element={<AboutPage />} />
      <Route path="/content"    element={<ContentPage />} />
      <Route path="/contact"    element={<ContactPage />} />
      <Route path="/login"      element={<LoginPage />} />
    </Route>
  </Routes>
);

// app/routes/ProtectedRoutes.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/domain/enums/UserRole';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { ContentHubPage } from '@/pages/dashboard/ContentHubPage';
import { UsersManagementPage } from '@/pages/dashboard/UsersManagementPage';
import { CustomersPage } from '@/pages/dashboard/CustomersPage';
import { PaymentsPage } from '@/pages/dashboard/PaymentsPage';

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (user?.role !== UserRole.ADMIN) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

export const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard"                   element={<DashboardPage />} />
        <Route path="/dashboard/content-hub"       element={<ContentHubPage />} />
        <Route path="/dashboard/users"
          element={
            <AdminRoute><UsersManagementPage /></AdminRoute>
          }
        />
        <Route path="/dashboard/customers"         element={<CustomersPage />} />
        <Route path="/dashboard/payments"
          element={
            <AdminRoute><PaymentsPage /></AdminRoute>
          }
        />
      </Route>
    </Routes>
  );
};
```

---

## 10. Page Specifications

### 10.1 Public Pages

#### 10.1.1 Home Page (`/`)

```
┌─────────────────────────────────────────────────┐
│  HEADER (Logo + NavLinks + Login Button)         │
├─────────────────────────────────────────────────┤
│                                                  │
│  HERO SECTION                                    │
│  ┌───────────────────────────────────────────┐  │
│  │  Animated Heading: "Share Knowledge,      │  │
│  │  Empower Everyone"                        │  │
│  │  Subtitle text...                         │  │
│  │  [Browse Content]  [Learn More]           │  │
│  │  Background: Gradient + Floating shapes   │  │
│  └───────────────────────────────────────────┘  │
│                                                  │
│  STATS BAR (Animated counters)                   │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐        │
│  │ 500+ │  │ 10K+ │  │ 200+ │  │ 50+  │        │
│  │Posts │  │Views │  │Users │  │Premium│        │
│  └──────┘  └──────┘  └──────┘  └──────┘        │
│                                                  │
│  FEATURED CONTENT (Horizontal scroll cards)      │
│  ┌────────┐ ┌────────┐ ┌────────┐              │
│  │  Card  │ │  Card  │ │  Card  │  → scroll    │
│  │  Img   │ │  Img   │ │  Img   │              │
│  │  Title │ │  Title │ │  Title │              │
│  │  Badge │ │  Badge │ │  Badge │              │
│  └────────┘ └────────┘ └────────┘              │
│                                                  │
│  HOW IT WORKS (3-step with icons)                │
│  ┌────────┐  ┌────────┐  ┌────────┐            │
│  │ 1.Browse│  │ 2.Read │  │ 3.Go   │            │
│  │        │→ │        │→ │ Premium│            │
│  └────────┘  └────────┘  └────────┘            │
│                                                  │
│  TESTIMONIALS (Carousel)                         │
│                                                  │
│  CTA SECTION                                     │
│  ┌───────────────────────────────────────────┐  │
│  │  "Ready to unlock premium content?"       │  │
│  │  [Get Started]                             │  │
│  └───────────────────────────────────────────┘  │
│                                                  │
│  FOOTER                                          │
└─────────────────────────────────────────────────┘
```

**Animation Spec:**
- Hero heading: `fadeSlideUp` with 0.4s delay
- Hero buttons: `fadeSlideUp` with 0.6s delay, stagger 0.1s
- Stats counters: `countUp` animation on viewport enter
- Featured cards: `fadeSlideUp` stagger 0.1s each
- How it works steps: sequential reveal on scroll
- CTA: `scaleIn` on viewport enter

#### 10.1.2 About Page (`/about`)

```
┌─────────────────────────────────────────────────┐
│  HEADER                                          │
├─────────────────────────────────────────────────┤
│  PAGE BANNER                                     │
│  "About Info Share" with breadcrumb              │
├─────────────────────────────────────────────────┤
│  MISSION SECTION                                 │
│  ┌────────────────┬────────────────┐            │
│  │  Image/Illustr │  Text block     │            │
│  │  (animated)    │  Mission stmt   │            │
│  └────────────────┴────────────────┘            │
│                                                  │
│  WHAT WE OFFER (Icon grid - 4 cols)              │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │
│  │ Icon │ │ Icon │ │ Icon │ │ Icon │          │
│  │Title │ │Title │ │Title │ │Title │          │
│  │Desc  │ │Desc  │ │Desc  │ │Desc  │          │
│  └──────┘ └──────┘ └──────┘ └──────┘          │
│                                                  │
│  TEAM SECTION (Optional - if applicable)         │
│                                                  │
│  VALUES SECTION (Alternating image-text)         │
├─────────────────────────────────────────────────┤
│  FOOTER                                          │
└─────────────────────────────────────────────────┘
```

#### 10.1.3 Content Page (`/content`) — PUBLIC FACING

```
┌─────────────────────────────────────────────────┐
│  HEADER                                          │
├─────────────────────────────────────────────────┤
│  PAGE BANNER                                     │
│  "Explore Our Content"                           │
├─────────────────────────────────────────────────┤
│  FILTER BAR                                      │
│  [Search input] [All|Free|Premium tabs] [Sort ▼] │
├─────────────────────────────────────────────────┤
│  CONTENT GRID (3 cols desktop, 2 tablet, 1 mob)  │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐  │
│  │  Image     │ │  Image     │ │  Image     │  │
│  │  ────────  │ │  ────────  │ │  ────────  │  │
│  │  Premium   │ │            │ │  Premium   │  │
│  │  Badge     │ │            │ │  Badge     │  │
│  │  Title     │ │  Title     │ │  Title     │  │
│  │  Truncated │ │  Truncated │ │  Truncated │  │
│  │  desc...   │ │  desc...   │ │  desc...   │  │
│  │  👁 1.2K   │ │  👁 856    │ │  👁 2.1K   │  │
│  │  [View]    │ │  [View]    │ │  🔒 Lock]  │  │
│  └────────────┘ └────────────┘ └────────────┘  │
│                                                  │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐  │
│  │  ...       │ │  ...       │ │  ...       │  │
│  └────────────┘ └────────────┘ └────────────┘  │
│                                                  │
│  FREE LIMIT BANNER (appears after 5 views)       │
│  ┌───────────────────────────────────────────┐  │
│  │ 🔒 You've reached your free content limit │  │
│  │ Subscribe to unlock all premium content   │  │
│  │ [Subscribe Now - $X/month]                │  │
│  └───────────────────────────────────────────┘  │
│                                                  │
│  PAGINATION                                      │
│  [← Prev] [1] [2] [3] ... [Next →]             │
├─────────────────────────────────────────────────┤
│  FOOTER                                          │
└─────────────────────────────────────────────────┘
```

**Free Content Limit Logic:**
- Track viewed content IDs in `localStorage` (or backend if logged in)
- When `viewedCount >= 5`, all premium content cards show lock overlay
- Free content still accessible
- Banner appears above the grid with CTA

#### 10.1.4 Contact Page (`/contact`)

```
┌─────────────────────────────────────────────────┐
│  HEADER                                          │
├─────────────────────────────────────────────────┤
│  PAGE BANNER                                     │
├─────────────────────────────────────────────────┤
│  CONTACT SECTION (2-col)                         │
│  ┌────────────────┬────────────────┐            │
│  │  Contact Info  │  Contact Form  │            │
│  │  📧 email      │  [Full Name]   │            │
│  │  📞 phone      │  [Email]       │            │
│  │  📍 address    │  [Subject]     │            │
│  │  Social icons  │  [Message]     │            │
│  │                │  [Send Message]│            │
│  └────────────────┴────────────────┘            │
├─────────────────────────────────────────────────┤
│  FAQ SECTION (Accordion)                         │
├─────────────────────────────────────────────────┤
│  FOOTER                                          │
└─────────────────────────────────────────────────┘
```

#### 10.1.5 Login Page (`/login`)

```
┌─────────────────────────────────────────────────┐
│  Split layout (image left, form right)           │
│  ┌──────────────────┬───────────────────┐       │
│  │                  │                   │       │
│  │  Branding        │  Welcome Back     │       │
│  │  Illustration    │                   │       │
│  │  or gradient     │  [Email]          │       │
│  │  background      │  [Password]       │       │
│  │  with floating   │  [Remember me]    │       │
│  │  animated shapes │  [Login Button]   │       │
│  │                  │                   │       │
│  │  (hidden on      │  Error message    │       │
│  │   mobile)        │  area             │       │
│  │                  │                   │       │
│  └──────────────────┴───────────────────┘       │
└─────────────────────────────────────────────────┘
```

---

### 10.2 Dashboard Pages

#### 10.2.1 Dashboard Home (`/dashboard`)

```
┌──────┬──────────────────────────────────────────┐
│      │  TOP BAR (Search + Notifications + User) │
│  S   ├──────────────────────────────────────────┤
│  I   │  Welcome back, [Name]!                   │
│  D   │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────┐│
│  E   │  │Total   │ │Total   │ │Premium │ │Rev ││
│  B   │  │Views   │ │Content │ │Users   │ │    ││
│  A   │  │12,450  │ │48      │ │126     │ │$X  ││
│  R   │  │↑ 12%   │ │↑ 3     │ │↑ 8%    │ │↑15%││
│       │  └────────┘ └────────┘ └────────┘ └────┘│
│      │                                           │
│      │  VIEWS OVER TIME CHART                    │
│      │  ┌───────────────────────────────────┐   │
│      │  │  Line/Area chart - last 30 days   │   │
│      │  └───────────────────────────────────┘   │
│      │                                           │
│      │  TOP VIEWED POSTS    │  RECENT ACTIVITY  │
│      │  ┌────────────────┐  │  ┌──────────────┐│
│      │  │ 1. Post Title  │  │  │ • New post   ││
│      │  │    👁 3,200    │  │  │ • User sub   ││
│      │  │ 2. Post Title  │  │  │ • Payment    ││
│      │  │    👁 2,800    │  │  │ • ...        ││
│      │  │ 3. Post Title  │  │  └──────────────┘│
│      │  │    👁 1,950    │  │                   │
│      │  └────────────────┘  │                   │
│      │                                           │
│      │  VIEWS BY CONTENT (Horizontal bar chart) │
│      │  ┌───────────────────────────────────┐   │
│      │  │  Post A ████████████████ 3,200   │   │
│      │  │  Post B ██████████████   2,800   │   │
│      │  │  Post C ██████████       1,950   │   │
│      │  │  Post D ████████         1,400   │   │
│      │  │  Post E ██████           1,100   │   │
│      │  └───────────────────────────────────┘   │
└──────┴──────────────────────────────────────────┘
```

**Animation Spec:**
- Stat cards: stagger `fadeSlideUp` 0.08s each
- Chart: draw-in animation
- Top viewed list: stagger `fadeSlideRight` 0.06s
- Recent activity: stagger `fadeSlideLeft` 0.06s

#### 10.2.2 Content Hub (`/dashboard/content-hub`)

```
┌──────┬──────────────────────────────────────────┐
│      │  TOP BAR                                  │
│  S   ├──────────────────────────────────────────┤
│  I   │  Content Hub              [+ Add Content]│
│  D   │  ┌──────────────────────────────────────┐│
│  E   │  │ Filter: [Search] [Status ▼]          ││
│  B   │  │         [Premium ▼] [Sort ▼]         ││
│  A   │  └──────────────────────────────────────┘│
│  R   │                                           │
│      │  CONTENT LIST (Table format)              │
│      │  ┌────┬──────────┬──────────┬────┬────┬──┐│
│      │  │ #  │ Title    │ Status   │Prem│View│Ac││
│      │  ├────┼──────────┼──────────┼────┼────┼──┤│
│      │  │ 1  │ Post A   │ Published│ ✅ │3.2K│⋯││
│      │  │ 2  │ Post B   │ Draft    │ ❌ │  0 │⋯││
│      │  │ 3  │ Post C   │ Published│ ✅ │2.8K│⋯││
│      │  │ 4  │ Post D   │ Archived │ ❌ │1.4K│⋯││
│      │  └────┴──────────┴──────────┴────┴────┴──┘│
│      │                                           │
│      │  PAGINATION                               │
│      │  Showing 1-10 of 48                       │
│      │  [←] [1] [2] [3] [4] [5] [→]            │
└──────┴──────────────────────────────────────────┘

ADD/EDIT CONTENT MODAL:
┌──────────────────────────────────────┐
│  Add New Content               [X]   │
├──────────────────────────────────────┤
│  Content Title *                    │
│  ┌────────────────────────────────┐ │
│  │                                │ │
│  └────────────────────────────────┘ │
│                                      │
│  Content Description *               │
│  ┌────────────────────────────────┐ │
│  │                                │ │
│  │                                │ │
│  └────────────────────────────────┘ │
│                                      │
│  Content Image (Optional)            │
│  ┌────────────────────────────────┐ │
│  │  📷 Drag & drop or click      │ │
│  │    to upload image             │ │
│  └────────────────────────────────┘ │
│                                      │
│  Content Video (Optional)            │
│  ┌────────────────────────────────┐ │
│  │  🎥 Drag & drop or click      │ │
│  │    to upload video             │ │
│  └────────────────────────────────┘ │
│                                      │
│  Is Premium                          │
│  ┌──────────┐                        │
│  │ ○ No  ● Yes │  (default: No)     │
│  └──────────┘                        │
│                                      │
│  ┌──────────┐  ┌──────────────────┐  │
│  │  Cancel  │  │  💾 Save Content  │  │
│  └──────────┘  └──────────────────┘  │
└──────────────────────────────────────┘
```

#### 10.2.3 Users Management (`/dashboard/users`) — ADMIN ONLY

```
┌──────┬──────────────────────────────────────────┐
│      │  TOP BAR                                  │
│  S   ├──────────────────────────────────────────┤
│  I   │  Users Management          [+ Add User]  │
│  D   │  ┌──────────────────────────────────────┐│
│  E   │  │ Filter: [Search] [Role ▼] [Status ▼]││
│  B   │  └──────────────────────────────────────┘│
│  A   │                                           │
│  R   │  USERS TABLE                              │
│      │  ┌────┬────────┬───────┬─────┬─────┬───┐ │
│      │  │Avatar│Name   │Email  │Role │Status│Act│ │
│      │  ├────┼────────┼───────┼─────┼─────┼───┤ │
│      │  │ 👤 │John Do │j@x.com│Admin│ 🟢  │⋯ │ │
│      │  │ 👤 │Jane Sm │j@y.com│Mgr  │ 🟢  │⋯ │ │
│      │  │ 👤 │Bob Wil │b@z.com│Mgr  │ 🔴  │⋯ │ │
│      │  └────┴────────┴───────┴─────┴─────┴───┘ │
│      │                                           │
│      │  ACTIONS per row:                         │
│      │  [Edit] [Toggle Active] [Delete]          │
└──────┴──────────────────────────────────────────┘

ADD/EDIT USER MODAL:
┌──────────────────────────────────────┐
│  Add New User                  [X]   │
├──────────────────────────────────────┤
│  Full Name *                         │
│  ┌────────────────────────────────┐ │
│  └────────────────────────────────┘ │
│  Email *                             │
│  ┌────────────────────────────────┐ │
│  └────────────────────────────────┘ │
│  Password * (for create only)       │
│  ┌────────────────────────────────┐ │
│  └────────────────────────────────┘ │
│  Role *                             │
│  ┌────────────────────────────────┐ │
│  │  [Admin ▼]                     │ │
│  └────────────────────────────────┘ │
│  ┌──────────┐  ┌──────────────────┐  │
│  │  Cancel  │  │  💾 Save User     │  │
│  └──────────┘  └──────────────────┘  │
└──────────────────────────────────────┘
```

#### 10.2.4 Customers Page (`/dashboard/customers`)

```
┌──────┬──────────────────────────────────────────┐
│      │  TOP BAR                                  │
│  S   ├──────────────────────────────────────────┤
│  I   │  Customers                                │
│  D   │  ┌────┐ ┌────┐ ┌────┐ ┌────┐            │
│  E   │  │Total│ │Free│ │Actv│ │Expd│            │
│  B   │  │1,250│ │1,124│ │98 │ │28 │            │
│  A   │  └────┘ └────┘ └────┘ └────┘            │
│  R   │  ┌──────────────────────────────────────┐│
│      │  │ [Search] [Subscription ▼] [Sort ▼]  ││
│      │  └──────────────────────────────────────┘│
│      │                                           │
│      │  CUSTOMERS TABLE                          │
│      │  ┌────┬───────┬───────┬────────┬────┬──┐│
│      │  │Name│Email  │Sub    │Since   │Last│Ac││
│      │  ├────┼───────┼───────┼────────┼────┼──┤│
│      │  │Ali │a@x.com│🟢Prem │Jan 2024│2d  │⋯││
│      │  │Sara│s@y.com│⚪Free │Mar 2024│5h  │⋯││
│      │  │Mike│m@z.com│🔴Expd │Dec 2023│30d │⋯││
│      │  └────┴───────┴───────┴────────┴────┴──┘│
│      │                                           │
│      │  CUSTOMER DETAIL DRAWER (slide from right)│
│      │  ┌────────────────────────────────────┐  │
│      │  │  Customer Name          [Close]    │  │
│      │  │  Email: xxx@xxx.com               │  │
│      │  │  Member Since: Jan 2024           │  │
│      │  │  Last Active: 2 days ago          │  │
│      │  │  Free Content Remaining: 3/5      │  │
│      │  │                                    │  │
│      │  │  CURRENT SUBSCRIPTION              │  │
│      │  │  Plan: Premium Monthly             │  │
│      │  │  Status: Active                    │  │
│      │  │  Expires: Aug 15, 2024             │  │
│      │  │  Auto-Renew: Yes                   │  │
│      │  │                                    │  │
│      │  │  PAYMENT HISTORY                   │  │
│      │  │  ┌──────┬──────┬───────┬────────┐  │  │
│      │  │  │Date  │Amount│Method │Status  │  │  │
│      │  │  ├──────┼──────┼───────┼────────┤  │  │
│      │  │  │Jul15 │$9.99 │Card**4│✅ Paid │  │  │
│      │  │  │Jun15 │$9.99 │Card**4│✅ Paid │  │  │
│      │  │  └──────┴──────┴───────┴────────┘  │  │
│      │  └────────────────────────────────────┘  │
└──────┴──────────────────────────────────────────┘
```

#### 10.2.5 Payments Page (`/dashboard/payments`) — ADMIN ONLY

```
┌──────┬──────────────────────────────────────────┐
│      │  TOP BAR                                  │
│  S   ├──────────────────────────────────────────┤
│  I   │  Payments & Subscriptions                 │
│  D   │  ┌────┐ ┌────┐ ┌────┐ ┌────┐            │
│  E   │  │Rev │ │Mth │ │Paid│ │Fail│            │
│  B   │  │$4.5K│$890│ │245 │ │12 │            │
│  A   │  └────┘ └────┘ └────┘ └────┘            │
│  R   │                                           │
│      │  EXPIRING SOON (Warning section)          │
│      │  ┌──────────────────────────────────────┐│
│      │  │ ⚠️ 8 subscriptions expiring in 7 days││
│      │  │ [Send Bulk Reminder]                 ││
│      │  └──────────────────────────────────────┘│
│      │                                           │
│      │  EXPIRING SUBSCRIPTIONS LIST              │
│      │  ┌───────┬────────┬──────────┬─────┬───┐│
│      │  │Customer│Plan   │Expires  │Days │Act││
│      │  ├───────┼────────┼──────────┼─────┼───┤│
│      │  │Ali    │Premium │Aug 10   │ 3   │🔔││
│      │  │Sara   │Premium │Aug 12   │ 5   │🔔││
│      │  └───────┴────────┴──────────┴─────┴───┘│
│      │                                           │
│      │  REMINDER COMPOSER (expandable)           │
│      │  ┌──────────────────────────────────────┐│
│      │  │ Selected: 2 customers                 ││
│      │  │ Message:                             ││
│      │  │ ┌──────────────────────────────────┐ ││
│      │  │ │ Hi {name}, your subscription...  │ ││
│      │  │ └──────────────────────────────────┘ ││
│      │  │ Variables: {name}, {plan}, {expiry}  ││
│      │  │ [Send Reminder]                      ││
│      │  └──────────────────────────────────────┘│
│      │                                           │
│      │  ALL PAYMENTS TABLE                       │
│      │  ┌──────┬───────┬──────┬───────┬─────┬──┐│
│      │  │Date  │Customer│Amount│Method │Status│Ac││
│      │  ├──────┼───────┼──────┼───────┼─────┼──┤│
│      │  │Aug 1 │Ali    │$9.99 │Card**4│✅   │⋯││
│      │  │Aug 1 │Mike   │$9.99 │PayPal │✅   │⋯││
│      │  │Jul31 │Sara   │$9.99 │Card**8│❌   │⋯││
│      │  └──────┴───────┴──────┴───────┴─────┴──┘│
│      │                                           │
│      │  REVENUE CHART (Monthly)                  │
│      │  ┌───────────────────────────────────┐   │
│      │  │  Bar chart - last 12 months       │   │
│      │  └───────────────────────────────────   │
└──────┴──────────────────────────────────────────┘
```

---

## 11. Animation System

### 11.1 Framer Motion Variants (`utils/animationVariants.ts`)

```typescript
// utils/animationVariants.ts
import { Variants } from 'framer-motion';
import { theme } from '@/config/theme';

const { animation } = theme;

export const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: animation.duration.normal, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: { opacity: 0, y: -20, transition: { duration: animation.duration.fast } },
};

export const fadeSlideDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: animation.duration.normal, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: { opacity: 0, y: 20, transition: { duration: animation.duration.fast } },
};

export const fadeSlideLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: animation.duration.normal },
  },
};

export const fadeSlideRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: animation.duration.normal },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: animation.duration.normal },
  },
  exit: { opacity: 0, transition: { duration: animation.duration.fast } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: animation.duration.normal, ease: 'easeOut' },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: animation.duration.fast } },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: animation.stagger,
      delayChildren: animation.duration.fast,
    },
  },
};

export const slideInDrawer: Variants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'spring', damping: 30, stiffness: 300 },
  },
  exit: {
    x: '100%',
    transition: { duration: animation.duration.normal, ease: 'easeIn' },
  },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: animation.duration.slow, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: { opacity: 0, y: -12, transition: { duration: animation.duration.fast } },
};

export const counterAnimation = {
  duration: animation.duration.slower,
  ease: 'easeOut' as const,
};

export const cardHover = {
  rest: { scale: 1, boxShadow: 'var(--shadow-md)' },
  hover: {
    scale: 1.02,
    boxShadow: 'var(--shadow-xl)',
    transition: { duration: animation.duration.fast },
  },
};

export const listItemAnimation: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * animation.stagger,
      duration: animation.duration.normal,
    },
  }),
};
```

### 11.2 CSS Keyframe Animations (`styles/animations.css`)

```css
/* styles/animations.css */

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(99, 102, 241, 0); }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes progress-bar {
  from { width: 0%; }
  to { width: var(--progress-width, 100%); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

.animate-shimmer {
  background: linear-gradient(
    90deg,
    var(--color-neutral-200) 25%,
    var(--color-neutral-100) 50%,
    var(--color-neutral-200) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 12. State Management (Zustand Stores)

### 12.1 Auth Store (`stores/authStore.ts`)

```typescript
// stores/authStore.ts
import { create } from 'zustand';
import { User } from '@/domain/models/User';
import { LoginCredentials, AuthResponse } from '@/domain/types/AuthTypes';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
  clearError: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login(credentials);
      set({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Login failed',
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    await authService.logout();
    set({ user: null, isAuthenticated: false });
  },

  setUser: (user) => set({ user, isAuthenticated: true }),

  clearError: () => set({ error: null }),

  initializeAuth: () => {
    const isAuth = authService.isAuthenticated();
    if (isAuth) {
      authService.getCurrentUser()
        .then((user) => set({ user, isAuthenticated: true }))
        .catch(() => set({ user: null, isAuthenticated: false }));
    }
  },
}));
```

### 12.2 Dashboard Store (`stores/dashboardStore.ts`)

```typescript
// stores/dashboardStore.ts
import { create } from 'zustand';
import { DashboardStats, ContentViewStat, ViewsOverTimeStat, Content } from '@/domain/models';
import { DateRange } from '@/domain/types/DashboardTypes';

interface DashboardState {
  stats: DashboardStats | null;
  topPosts: Content[];
  viewsByContent: ContentViewStat[];
  viewsOverTime: ViewsOverTimeStat[];
  isLoading: boolean;
  error: string | null;

  fetchStats: () => Promise<void>;
  fetchTopPosts: (limit: number) => Promise<void>;
  fetchViewsByContent: () => Promise<void>;
  fetchViewsOverTime: (range: DateRange) => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: null,
  topPosts: [],
  viewsByContent: [],
  viewsOverTime: [],
  isLoading: false,
  error: null,

  fetchStats: async () => {
    set({ isLoading: true });
    try {
      const stats = await dashboardService.getStats();
      set({ stats, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchTopPosts: async (limit) => {
    const posts = await dashboardService.getTopViewedPosts(limit);
    set({ topPosts: posts });
  },

  fetchViewsByContent: async () => {
    const data = await dashboardService.getViewsByContent();
    set({ viewsByContent: data });
  },

  fetchViewsOverTime: async (range) => {
    const data = await dashboardService.getViewsOverTime(range);
    set({ viewsOverTime: data });
  },
}));
```

---

## 13. Custom Hooks

### 13.1 Example Hooks (`hooks/`)

```typescript
// hooks/useAuth.ts
import { useAuthStore } from '@/stores/authStore';
import { LoginCredentials } from '@/domain/types/AuthTypes';

export const useAuth = () => {
  const store = useAuthStore();
  return {
    ...store,
    isAdmin: store.user?.role === 'ADMIN',
    isManager: store.user?.role === 'MANAGER',
  };
};

// hooks/useMediaQuery.ts
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

// hooks/usePagination.ts
import { useState, useMemo } from 'react';

interface UsePaginationOptions {
  totalItems: number;
  pageSize?: number;
  initialPage?: number;
}

export function usePagination({ totalItems, pageSize = 10, initialPage = 1 }: UsePaginationOptions) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.ceil(totalItems / pageSize);

  const paginationRange = useMemo(() => {
    const range: (number | string)[] = [];
    const delta = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      } else if (range[range.length - 1] !== '...') {
        range.push('...');
      }
    }

    return range;
  }, [currentPage, totalPages]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    currentPage,
    totalPages,
    paginationRange,
    goToPage,
    nextPage: () => goToPage(currentPage + 1),
    prevPage: () => goToPage(currentPage - 1),
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
  };
}
```

---

## 14. Component Design Standards

### 14.1 Component Template

Every component **MUST** follow this pattern:

```typescript
// components/common/Button/Button.tsx
import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';
import { theme } from '@/config/theme';

// ─── Prop Interface ───────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

// ─── Variant Styles (from theme, no hardcoded) ────
const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: `
    background-color: var(--color-primary-600);
    color: var(--text-inverse);
    &:hover { background-color: var(--color-primary-700); }
    &:active { background-color: var(--color-primary-800); }
  `,
  secondary: `
    background-color: var(--color-neutral-100);
    color: var(--text-primary);
    &:hover { background-color: var(--color-neutral-200); }
  `,
  outline: `
    background-color: transparent;
    color: var(--color-primary-600);
    border: 1px solid var(--color-primary-600);
    &:hover { background-color: var(--color-primary-50); }
  `,
  ghost: `
    background-color: transparent;
    color: var(--text-secondary);
    &:hover { background-color: var(--color-neutral-100); }
  `,
  danger: `
    background-color: var(--color-error);
    color: var(--text-inverse);
    &:hover { background-color: var(--color-error-dark); }
  `,
};

const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: `padding: var(--space-1) var(--space-3); font-size: var(--text-sm); border-radius: var(--radius-md);`,
  md: `padding: var(--space-2) var(--space-4); font-size: var(--text-sm); border-radius: var(--radius-md);`,
  lg: `padding: var(--space-3) var(--space-6); font-size: var(--text-base); border-radius: var(--radius-lg);`,
};

// ─── Component ────────────────────────────────────
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <motion.button
        ref={ref}
        whileTap={isDisabled ? undefined : { scale: 0.97 }}
        className={cn(
          // Base styles
          `inline-flex items-center justify-center font-medium
           transition-colors var(--transition-fast)
           focus-visible:outline-none focus-visible:ring-2
           focus-visible:ring-offset-2 focus-visible:ring-primary-500
           disabled:opacity-50 disabled:cursor-not-allowed`,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'width: 100%',
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {isLoading ? (
          <Loader2
            size={theme.typography.fontSize.base}
            className="animate-spin margin-right: var(--space-2)"
          />
        ) : (
          leftIcon && <span className="margin-right: var(--space-2)">{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && <span className="margin-left: var(--space-2)">{rightIcon}</span>}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
```

### 14.2 Component File Structure

```
Button/
├── Button.tsx          ← Component implementation
├── Button.styles.ts    ← Style constants (if complex)
├── Button.test.tsx     ← Unit tests
└── index.ts            ← Re-export
```

---

## 15. Free Content Limit Logic

### 15.1 Free View Tracker (`services/FreeViewTracker.ts`)

```typescript
// services/FreeViewTracker.ts
import { IStorageAdapter } from '@/domain/interfaces/IStorageAdapter';

const STORAGE_KEY = 'free_content_views';
const FREE_LIMIT = 5;

interface ViewRecord {
  contentId: string;
  viewedAt: string; // ISO date
}

export class FreeViewTracker {
  constructor(private readonly storage: IStorageAdapter) {}

  getViews(): ViewRecord[] {
    return this.storage.getItem<ViewRecord[]>(STORAGE_KEY) || [];
  }

  getUniqueViewCount(): number {
    return this.getViews().length;
  }

  hasReachedLimit(): boolean {
    return this.getUniqueViewCount() >= FREE_LIMIT;
  }

  getRemainingFreeViews(): number {
    return Math.max(0, FREE_LIMIT - this.getUniqueViewCount());
  }

  canViewContent(contentId: string, isPremium: boolean): boolean {
    // Free content is always accessible
    if (!isPremium) return true;
    // Premium content requires subscription or free views remaining
    return !this.hasReachedLimit();
  }

  recordView(contentId: string): void {
    const views = this.getViews();
    const alreadyViewed = views.some((v) => v.contentId === contentId);

    if (!alreadyViewed) {
      views.push({ contentId, viewedAt: new Date().toISOString() });
      this.storage.setItem(STORAGE_KEY, views);
    }
  }

  reset(): void {
    this.storage.removeItem(STORAGE_KEY);
  }
}
```

---

## 16. API Contract Summary

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/login` | ❌ | Login with email/password |
| `POST` | `/auth/logout` | ✅ | Invalidate session |
| `POST` | `/auth/refresh` | 🔄 | Refresh access token |
| `GET` | `/auth/me` | ✅ | Get current user |
| `GET` | `/public/content` | ❌ | Public content listing |
| `POST` | `/public/content/:id/view` | ❌ | Increment view count |
| `GET` | `/content` | ✅ | Admin content listing |
| `POST` | `/content` | ✅ | Create content (multipart) |
| `GET` | `/content/:id` | ✅ | Get single content |
| `PUT` | `/content/:id` | ✅ | Update content (multipart) |
| `DELETE` | `/content/:id` | ✅ | Delete content |
| `GET` | `/users` | ✅ Admin | List dashboard users |
| `POST` | `/users` | ✅ Admin | Create user |
| `GET` | `/users/:id` | ✅ Admin | Get user |
| `PUT` | `/users/:id` | ✅ Admin | Update user |
| `DELETE` | `/users/:id` | ✅ Admin | Delete user |
| `PATCH` | `/users/:id/toggle-active` | ✅ Admin | Toggle active status |
| `GET` | `/customers` | ✅ | List customers |
| `GET` | `/customers/:id` | ✅ | Get customer detail |
| `GET` | `/customers/:id/payments` | ✅ | Customer payment history |
| `PATCH` | `/customers/:id/subscription` | ✅ Admin | Update subscription |
| `GET` | `/payments` | ✅ Admin | List all payments |
| `GET` | `/payments/:id` | ✅ Admin | Get payment detail |
| `GET` | `/payments/expiring?days=N` | ✅ Admin | Expiring subscriptions |
| `POST` | `/payments/:id/reminder` | ✅ Admin | Send renewal reminder |
| `POST` | `/payments/reminders/bulk` | ✅ Admin | Send bulk reminders |
| `GET` | `/payments/revenue?period=X` | ✅ Admin | Revenue statistics |
| `GET` | `/dashboard/stats` | ✅ | Dashboard statistics |
| `POST` | `/contact` | ❌ | Submit contact form |
| `GET` | `/contact` | ✅ Admin | List messages |
| `PATCH` | `/contact/:id/read` | ✅ Admin | Mark as read |

---

## 17. Security Considerations

| Concern | Implementation |
|---|---|
| **XSS** | No `dangerouslySetInnerHTML`; sanitize all user inputs |
| **CSRF** | Token-based auth (Bearer JWT); SameSite cookies |
| **JWT Storage** | Access token in memory; refresh token in httpOnly cookie (backend) |
| **Route Protection** | Client-side guards + server-side middleware validation |
| **Role Authorization** | Admin-only routes checked on both client and server |
| **File Upload** | Validate MIME type, file size limits (backend), preview before upload |
| **Rate Limiting** | Backend implementation on login, contact, and public endpoints |
| **Input Validation** | Zod schemas on all forms; backend validation as second layer |
| **Password Policy** | Enforced by backend (min 8 chars, mixed case, number, special) |
| **Error Messages** | Generic messages to public; detailed only in development |

---

## 18. Responsive Breakpoints Strategy

| Breakpoint | Width | Layout Changes |
|---|---|---|
| **Mobile** | < 640px | Single column; hamburger menu; stacked cards; bottom sheet modals |
| **Tablet** | 640–1023px | 2-col grid; collapsible sidebar; drawer for details |
| **Desktop** | 1024–1279px | Full sidebar; 3-col grid; side-by-side layouts |
| **Wide** | ≥ 1280px | Max content width; comfortable spacing; expanded tables |

**Mobile-specific behaviors:**
- Header collapses to hamburger with slide-out menu
- Dashboard sidebar becomes a bottom tab bar or slide-out drawer
- Tables transform to card lists
- Modals become bottom sheets
- Touch-optimized tap targets (min 44px)
- Pull-to-refresh on content lists

---

## 19. Accessibility Requirements

| Standard | Implementation |
|---|---|
| **Keyboard Nav** | All interactive elements focusable; logical tab order |
| **ARIA Labels** | Icons have `aria-label`; modals have `aria-modal`, `role="dialog"` |
| **Color Contrast** | Minimum 4.5:1 for text; 3:1 for large text (WCAG AA) |
| **Focus Indicators** | Visible focus rings using `focus-visible` |
| **Screen Readers** | Semantic HTML (`nav`, `main`, `article`, `section`); `alt` on images |
| **Reduced Motion** | `prefers-reduced-motion` media query disables animations |
| **Form Errors** | `aria-describedby` linking inputs to error messages |
| **Skip Links** | "Skip to main content" link at top of page |

---

## 20. Error Handling Strategy

```
┌──────────────────────────────────────────┐
│           ERROR BOUNDARY                  │
│  Catches: React rendering errors          │
│  Shows: Full-page error with retry button │
├──────────────────────────────────────────┤
│         API ERROR INTERCEPTOR             │
│  Catches: HTTP 4xx, 5xx errors            │
│  Handles: 401→refresh→retry; 403→redirect │
│           500→toast error message         │
├──────────────────────────────────────────┤
│         FORM VALIDATION                   │
│  Catches: Zod schema violations           │
│  Shows: Inline field-level errors         │
├──────────────────────────────────────────┤
│         TOAST NOTIFICATIONS               │
│  Success: Green toast, auto-dismiss 3s    │
│  Error: Red toast, manual dismiss         │
│  Warning: Yellow toast, auto-dismiss 5s   │
│  Info: Blue toast, auto-dismiss 4s        │
├──────────────────────────────────────────┤
│         SKELETON LOADING                  │
│  Shows: Shimmer placeholders matching     │
│         final content shape               │
│  Duration: Until data resolves            │
└──────────────────────────────────────────┘
```

---

## 21. Performance Targets

| Metric | Target |
|---|---|
| **First Contentful Paint** | < 1.5s |
| **Largest Contentful Paint** | < 2.5s |
| **Time to Interactive** | < 3.5s |
| **Cumulative Layout Shift** | < 0.1 |
| **Bundle Size (initial)** | < 200KB gzipped |
| **Image Loading** | Lazy load below fold; WebP format; blur placeholder |
| **Code Splitting** | Route-based splitting; lazy load dashboard pages |
| **Data Caching** | Zustand store; SWR-style stale-while-revalidate for lists |

---

## 22. Development Phases & Milestones

### Phase 1 — Foundation (Week 1–2)
- [ ] Project setup (Vite + React + TypeScript)
- [ ] Theme system (CSS variables + theme.ts)
- [ ] Directory structure creation
- [ ] Domain models, interfaces, enums
- [ ] Adapter implementations (HTTP, Storage)
- [ ] Service container & DI setup
- [ ] Routing structure (public + protected)

### Phase 2 — Authentication & Layout (Week 3)
- [ ] Auth service implementation
- [ ] Auth store (Zustand)
- [ ] Login page with form validation
- [ ] Public layout (header, footer, mobile menu)
- [ ] Dashboard layout (sidebar, topbar, responsive)
- [ ] Route guards (auth, role-based)

### Phase 3 — Public Pages (Week 4)
- [ ] Home page (hero, stats, featured content, CTA)
- [ ] About page
- [ ] Content page with card grid
- [ ] Free view limit tracker
- [ ] Contact page with form
- [ ] All page transitions & scroll animations

### Phase 4 — Dashboard Core (Week 5–6)
- [ ] Dashboard stats page (charts, top posts, activity)
- [ ] Content Hub (list, create/edit modal, delete)
- [ ] File upload component (image + video)
- [ ] Content form with Zod validation

### Phase 5 — Admin Features (Week 7–8)
- [ ] Users Management (CRUD, toggle active)
- [ ] Customers page (list, detail drawer, payment history)
- [ ] Payments page (table, expiring tracker, reminder composer)
- [ ] Revenue chart

### Phase 6 — Polish & QA (Week 9–10)
- [ ] Animation fine-tuning
- [ ] Responsive testing (all breakpoints)
- [ ] Accessibility audit
- [ ] Error handling & edge cases
- [ ] Loading states & skeleton screens
- [ ] Performance optimization
- [ ] Unit & integration tests
- [ ] Cross-browser testing

---

## 23. Naming Conventions

| Entity | Convention | Example |
|---|---|---|
| **Files (components)** | PascalCase folder + PascalCase.tsx | `Button/Button.tsx` |
| **Files (services)** | PascalCase.ts | `AuthService.ts` |
| **Files (interfaces)** | I + PascalCase.ts | `IAuthService.ts` |
| **Files (models)** | PascalCase.ts | `Content.ts` |
| **Files (enums)** | PascalCase.ts | `UserRole.ts` |
| **Files (utils)** | camelCase.ts | `formatters.ts` |
| **Files (stores)** | camelCase.ts | `authStore.ts` |
| **Files (hooks)** | camelCase.ts (use prefix) | `useAuth.ts` |
| **Interfaces** | I + PascalCase | `IAuthService` |
| **Types** | PascalCase + suffix | `LoginCredentials`, `CreateContentDTO` |
| **Enums** | PascalCase values | `UserRole.ADMIN` |
| **Components** | PascalCase | `ContentCard` |
| **Props interfaces** | ComponentName + Props | `ButtonProps` |
| **CSS variables** | kebab-case with prefix | `--color-primary-600` |
| **Constants** | SCREAMING_SNAKE_CASE | `FREE_LIMIT`, `API_BASE_URL` |
| **Store hooks** | use + Name + Store | `useAuthStore` |
| **Service instances** | camelCase | `authService`, `contentService` |
| **Event handlers** | handle + Action | `handleSubmit`, `handleDelete` |
| **Boolean props** | is/has/should prefix | `isLoading`, `hasError` |

---

## 24. Git Branching Strategy

```
main (production)
  └── develop (staging)
       ├── feature/public-layout
       ├── feature/auth-system
       ├── feature/home-page
       ├── feature/content-hub
       ├── feature/dashboard-stats
       ├── feature/users-management
       ├── feature/customers-page
       ├── feature/payments-page
       ├── feature/free-limit-tracker
       └── feature/animations
```

**Commit message format:**
```
type(scope): description

feat(auth): add login page with form validation
fix(content): resolve pagination reset on filter change
refactor(services): extract common pagination logic
style(theme): add success color variants
chore(deps): upgrade framer-motion to v11
```

---

## 25. Environment Configuration

```typescript
// config/env.ts
export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  apiTimeout: Number(import.meta.env.VITE_API_TIMEOUT) || 15000,
  appName: import.meta.env.VITE_APP_NAME || 'Info Share',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  environment: import.meta.env.VITE_ENV || 'development',
  storageKeys: {
    accessToken: 'infoshare_access_token',
    refreshToken: 'infoshare_refresh_token',
    user: 'infoshare_user',
    freeViews: 'infoshare_free_views',
    theme: 'infoshare_theme',
  },
  subscription: {
    freeContentLimit: 5,
    currency: 'USD',
    pricePerMonth: 9.99,
  },
} as const;
```

```env
# .env.example
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=15000
VITE_APP_NAME=Info Share
VITE_APP_VERSION=1.0.0
VITE_ENV=development
```

---

## 26. Package.json Dependencies

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0",
    "zustand": "^4.5.4",
    "axios": "^1.7.4",
    "framer-motion": "^11.3.0",
    "react-hook-form": "^7.52.0",
    "@hookform/resolvers": "^3.9.0",
    "zod": "^3.23.8",
    "lucide-react": "^0.424.0",
    "react-hot-toast": "^2.4.1",
    "date-fns": "^3.6.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.4.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "^5.5.4",
    "vite": "^5.4.0",
    "vitest": "^2.0.5",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.4.8",
    "eslint": "^9.9.0",
    "prettier": "^3.3.3",
    "tailwindcss": "^3.4.7",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.40"
  }
}
```

---

## 27. Final Checklist Before Development Start

- [ ] Backend API is documented (Swagger/OpenAPI) or mock server is ready
- [ ] Design assets (logos, illustrations, placeholder images) are available
- [ ] Font files loaded (Inter, JetBrains Mono from Google Fonts or self-hosted)
- [ ] `.env.example` is committed; `.env` is in `.gitignore`
- [ ] ESLint + Prettier config is agreed upon by team
- [ ] Git repository is created with branch protection on `main` and `develop`
- [ ] CI/CD pipeline is configured (lint → test → build → deploy)
- [ ] All team members have read this document and acknowledge the architecture
- [ ] Mock API server (e.g., MSW or JSON Server) is set up for frontend-first development

---

> **This document is the single source of truth for the Info Share frontend project.** Any architectural decision, pattern change, or scope modification must be reflected here first. All team members are responsible for keeping their implementation aligned with the contracts, interfaces, and standards defined in this document.