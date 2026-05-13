# Customer Signup Feature — UI & Data Changes

## Problem

Currently there is no way for a customer to self-register. The only Login page routes to the admin dashboard (`/dashboard`). The `customers` collection lacks authentication fields. The subscription flow is admin-only.

## Proposed Customer Journey

```
Landing Page → [Get Started / Sign Up] → /signup → Create Free Account
    → Browse Content (5 free premium views)
    → Upgrade to Premium → Payment Flow → ACTIVE subscription
    → Manage subscription at /account
```

---

## UI Changes

### 1. New Public Page: `/signup`

A registration form with fields:
- **Full Name** — text input
- **Email Address** — email input
- **Password** — password input (min 8 chars)
- **Confirm Password** — password input
- **Terms & Conditions** — checkbox (required)
- **[Create Account]** — submit button

On success → redirect to `/account` (customer profile) or `/content`.

**Navigation changes:**
- Add **"Get Started"** button in PublicHeader (alongside Login)
- Update HomePage hero CTA to link to `/signup`
- Public nav items: add `{ label: 'Sign Up', path: '/signup', ... }`

### 2. New Public Page: `/login` (Customer variant) — or extend existing

The existing `/login` is for Admin/Manager dashboard access. Options:

**Recommended: Dual-purpose login** — add a tab/segmented control:
- **Tab 1: "Admin Login"** — existing admin login flow → redirects to `/dashboard`
- **Tab 2: "Customer Login"** — customer auth → redirects to `/account`

### 3. New Page: `/account` (Customer Dashboard, protected)

Simple customer-facing area:
- **Profile Info**: name, email, member since
- **Subscription Status**: current plan, status badge, expiry date
- **Free Content Remaining**: "X of 5 free previews used"
- **Upgrade / Manage Subscription**: CTA/button if FREE tier
- **Payment History**: list of past payments
- **Logout** button

### 4. Navigation Updates

| Location | Change |
|---|---|
| `PublicHeader` | Add "Sign Up" link; change "Login" to "Admin Login" or add customer toggle |
| `config/navigation.ts` | Add `signup` to `publicNavItems`; add `{ label: 'My Account', path: '/account', ... }` with isCustomer flag |
| `HomePageClient` hero | "Get Started Now" CTA links to `/signup` |
| `PublicLayout` | Route `/signup`, `/account`, `/customer/login` |

### 5. Route Architecture (new)

```
(public)/
  ├── page.tsx              # Home (no change)
  ├── about/                # (no change)
  ├── content/              # (no change)
  ├── contact/              # (no change)
  ├── login/                # Extended: dual-mode (admin + customer)
  ├── signup/               # NEW: customer registration
  └── account/              # NEW: customer profile (protected)
       ├── page.tsx         # Dashboard / overview
       ├── subscription/    # Manage plan
       └── history/         # Payment history
```

---

## Data Changes

### Collection Updates: `customers`

Add authentication fields to the existing `customers` table:

| New Field | Type | Constraints | Notes |
|---|---|---|---|
| `passwordHash` | VARCHAR(255) | NOT NULL (after migration) | bcrypt hash for customer login |
| `isEmailVerified` | BOOLEAN | NOT NULL, DEFAULT FALSE | Email confirmation status |
| `verificationToken` | VARCHAR(255) | NULLABLE | Email verification token |
| `resetPasswordToken` | VARCHAR(255) | NULLABLE | Password reset token |
| `resetPasswordExpires` | TIMESTAMP | NULLABLE | Token expiry |

No new collections needed — everything fits into the existing schema.

### Enum Changes

**No new enums.** The existing `subscription_status` (`FREE`, `ACTIVE`, `EXPIRED`, `CANCELLED`) and `user_role` are sufficient.

---

## Flow Details

### Signup Flow

```
1. Customer fills /signup form
2. Server validates (email unique, passwords match, terms accepted)
3. Create record in `customers` with:
   - subscriptionStatus = 'FREE'
   - freeContentRemaining = 5
   - memberSince = TODAY
   - passwordHash = bcrypt(plaintext)
4. Optionally send verification email
5. Set auth session / JWT token
6. Redirect to /account
```

### Subscription Upgrade Flow (existing, unchanged)

```
1. Customer on /account clicks "Upgrade to Premium"
2. Redirect to payment gateway / checkout page
3. On success → create `subscriptions` record (ACTIVE)
4. Create `payments` record (COMPLETED)
5. Update `customers.subscriptionStatus` = 'ACTIVE'
6. Log activity: type='subscription'
```

### Free Content Quota (existing, unchanged)

```
1. Customer views premium content on /content
2. Record in `content_views`
3. Decrement `customers.freeContentRemaining`
4. If 0 → show premium lock overlay with "Subscribe Now" CTA
```

---

## What Stays the Same

- Admin dashboard (`/dashboard`) and all its pages — unchanged
- Dashboard sidebar, navigation, role-based access — unchanged
- Customers page in dashboard — unchanged (admins still manage/view customers)
- Content management, payments management — unchanged
- The `users` table stays admin-only (no public signup for dashboard accounts)
