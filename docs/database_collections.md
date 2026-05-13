# Info Share — Database Collections Specification

> **Source**: Reverse-engineered from UI pages (public + dashboard), mock data, services, and `docs/infor_share_plan.md`.
> **Principle**: Presentation (UI) is fully decoupled from data. All collections below represent the **domain layer**; storage/ORM decisions are implementation details.

---

## 1. `users`

Internal platform accounts (Admin / Manager). Created only by an existing Admin — no public self-registration.

| Field | Type | Constraints | Notes |
|---|---|---|---|
| `id` | UUID / Serial | PK, NOT NULL | Primary identifier |
| `fullName` | VARCHAR(255) | NOT NULL | Display name |
| `email` | VARCHAR(255) | NOT NULL, UNIQUE | Login credential |
| `passwordHash` | VARCHAR(255) | NOT NULL | bcrypt hash |
| `role` | ENUM('ADMIN','MANAGER') | NOT NULL, DEFAULT 'MANAGER' | Role-based access |
| `avatarUrl` | VARCHAR(500) | NULLABLE | Profile avatar |
| `isActive` | BOOLEAN | NOT NULL, DEFAULT TRUE | Soft disable |
| `lastLogin` | TIMESTAMP | NULLABLE | Last successful login |
| `createdAt` | TIMESTAMP | NOT NULL, DEFAULT NOW() | |
| `updatedAt` | TIMESTAMP | NOT NULL, DEFAULT NOW() | |

**Relationships**: None (standalone auth entity).

**Used by UI**: Users Management (`/dashboard/users`) — CRUD table, Add/Edit User Modal.

---

## 2. `customers`

End-users who consume content (free or premium subscribers). Customers self-register via the public `/signup` page.

| Field | Type | Constraints | Notes |
|---|---|---|---|
| `id` | UUID / Serial | PK, NOT NULL | |
| `fullName` | VARCHAR(255) | NOT NULL | |
| `email` | VARCHAR(255) | NOT NULL, UNIQUE | Login credential |
| `passwordHash` | VARCHAR(255) | NOT NULL | bcrypt hash for customer login |
| `subscriptionStatus` | ENUM('FREE','ACTIVE','EXPIRED','CANCELLED') | NOT NULL, DEFAULT 'FREE' | |
| `freeContentRemaining` | INTEGER | NOT NULL, DEFAULT 5 | Decremented per premium view (0–5) |
| `memberSince` | DATE | NOT NULL | |
| `lastActive` | TIMESTAMP | NULLABLE | |
| `contentViewedCount` | INTEGER | NOT NULL, DEFAULT 0 | Total views across all content |
| `isEmailVerified` | BOOLEAN | NOT NULL, DEFAULT FALSE | Email confirmation status |
| `verificationToken` | VARCHAR(255) | NULLABLE | Email verification token |
| `resetPasswordToken` | VARCHAR(255) | NULLABLE | Password reset token |
| `resetPasswordExpires` | TIMESTAMP | NULLABLE | Token expiry |
| `createdAt` | TIMESTAMP | NOT NULL, DEFAULT NOW() | |
| `updatedAt` | TIMESTAMP | NOT NULL, DEFAULT NOW() | |

**Relationships**:
- `1:N` → `subscriptions` (payment history, current plan)
- `M:N` → `content` via `content_views` (view tracking, free quota enforcement)

**Used by UI**: Customers page (`/dashboard/customers`) — table, slide-in detail drawer with subscription info & payment history; Customer Account page (`/account`) — profile & subscription management.

---

## 3. `subscriptions`

Subscription plans purchased by customers.

| Field | Type | Constraints | Notes |
|---|---|---|---|
| `id` | UUID / Serial | PK, NOT NULL | |
| `customerId` | UUID / Serial | FK → customers.id, NOT NULL | |
| `planName` | VARCHAR(100) | NOT NULL | e.g. "Premium Monthly" |
| `price` | DECIMAL(10,2) | NOT NULL | |
| `currency` | VARCHAR(3) | NOT NULL, DEFAULT 'USD' | ISO 4217 |
| `startDate` | DATE | NOT NULL | |
| `endDate` | DATE | NOT NULL | |
| `status` | ENUM('FREE','ACTIVE','EXPIRED','CANCELLED') | NOT NULL | Mirrors customer status at plan level |
| `autoRenew` | BOOLEAN | NOT NULL, DEFAULT TRUE | |
| `createdAt` | TIMESTAMP | NOT NULL, DEFAULT NOW() | |
| `updatedAt` | TIMESTAMP | NOT NULL, DEFAULT NOW() | |

**Relationships**:
- `N:1` → `customers`
- `1:N` → `payments`

**Used by UI**: Customer detail drawer (current subscription display), Payments page (expiring subscriptions tracker).

---

## 4. `payments`

Individual payment transactions.

| Field | Type | Constraints | Notes |
|---|---|---|---|
| `id` | UUID / Serial | PK, NOT NULL | |
| `customerId` | UUID / Serial | FK → customers.id, NOT NULL | |
| `subscriptionId` | UUID / Serial | FK → subscriptions.id, NOT NULL | |
| `amount` | DECIMAL(10,2) | NOT NULL | |
| `currency` | VARCHAR(3) | NOT NULL, DEFAULT 'USD' | |
| `status` | ENUM('PENDING','COMPLETED','FAILED','REFUNDED') | NOT NULL, DEFAULT 'PENDING' | |
| `paymentMethod` | VARCHAR(100) | NOT NULL | e.g. "Card ending in 4242", "PayPal" |
| `transactionId` | VARCHAR(255) | NULLABLE | Gateway transaction reference |
| `paidAt` | TIMESTAMP | NULLABLE | Null until COMPLETED |
| `createdAt` | TIMESTAMP | NOT NULL, DEFAULT NOW() | |

**Relationships**:
- `N:1` → `customers`
- `N:1` → `subscriptions`

**Used by UI**: Payments page (`/dashboard/payments`) — recent payments table, customer detail drawer (payment history).

---

## 5. `content`

Articles, tutorials, videos, and other resources.

| Field | Type | Constraints | Notes |
|---|---|---|---|
| `id` | UUID / Serial | PK, NOT NULL | |
| `title` | VARCHAR(255) | NOT NULL | |
| `description` | TEXT | NOT NULL | |
| `imageUrl` | VARCHAR(500) | NULLABLE | Thumbnail / featured image |
| `videoUrl` | VARCHAR(500) | NULLABLE | Embedded video link |
| `isPremium` | BOOLEAN | NOT NULL, DEFAULT FALSE | Free vs. gated content |
| `status` | ENUM('DRAFT','PUBLISHED','ARCHIVED') | NOT NULL, DEFAULT 'DRAFT' | |
| `viewCount` | INTEGER | NOT NULL, DEFAULT 0 | Total views |
| `createdBy` | UUID / Serial | FK → users.id, NOT NULL | Who uploaded |
| `createdAt` | TIMESTAMP | NOT NULL, DEFAULT NOW() | |
| `updatedAt` | TIMESTAMP | NOT NULL, DEFAULT NOW() | |

**Relationships**:
- `N:1` → `users` (createdBy)
- `M:N` → `customers` via `content_views`

**Used by UI**: Public Content page (`/content`) — grid with filter/search/pagination; Dashboard Content Hub (`/dashboard/content-hub`) — CRUD table with modal form; Home page featured cards.

---

## 6. `content_views`

Junction table tracking which customer viewed which content (for free-quota enforcement and analytics).

| Field | Type | Constraints | Notes |
|---|---|---|---|
| `id` | UUID / Serial | PK, NOT NULL | |
| `customerId` | UUID / Serial | FK → customers.id, NOT NULL | |
| `contentId` | UUID / Serial | FK → content.id, NOT NULL | |
| `viewedAt` | TIMESTAMP | NOT NULL, DEFAULT NOW() | |

**Relationships**:
- `N:1` → `customers`
- `N:1` → `content`

**Used by UI**: Determines `freeContentRemaining` decrement (public content page); powers analytics (view count, top viewed content, views over time).

---

## 7. `activity_log`

System-wide activity stream for the dashboard.

| Field | Type | Constraints | Notes |
|---|---|---|---|
| `id` | UUID / Serial | PK, NOT NULL | |
| `type` | ENUM('content_upload','new_customer','subscription','payment') | NOT NULL | Categorizes the action |
| `description` | TEXT | NOT NULL | Human-readable summary |
| `subject` | VARCHAR(255) | NULLABLE | Target entity identifier |
| `performedBy` | UUID / Serial | FK → users.id, NULLABLE | Admin who performed action |
| `customerId` | UUID / Serial | FK → customers.id, NULLABLE | Related customer |
| `contentId` | UUID / Serial | FK → content.id, NULLABLE | Related content |
| `createdAt` | TIMESTAMP | NOT NULL, DEFAULT NOW() | |

**Relationships**: Optional FKs to `users`, `customers`, `content`.

**Used by UI**: Dashboard overview (`/dashboard`) — recent activity timeline.

---

## 8. `contact_messages`

Messages submitted via the public Contact Us form.

| Field | Type | Constraints | Notes |
|---|---|---|---|
| `id` | UUID / Serial | PK, NOT NULL | |
| `fullName` | VARCHAR(255) | NOT NULL | |
| `email` | VARCHAR(255) | NOT NULL | |
| `subject` | VARCHAR(255) | NOT NULL | |
| `message` | TEXT | NOT NULL | |
| `isRead` | BOOLEAN | NOT NULL, DEFAULT FALSE | Admin read status |
| `createdAt` | TIMESTAMP | NOT NULL, DEFAULT NOW() | |

**Relationships**: None.

**Used by UI**: Contact page (`/contact`) — form submission (UI exists, admin read panel is planned).

---

## Enum Reference

These are database-level ENUMs used across multiple collections.

### `user_role`
- `ADMIN` — Full access (users, payments, content, customers)
- `MANAGER` — Limited access (content, customers only)

### `content_status`
- `DRAFT` — Not visible to public
- `PUBLISHED` — Visible to public
- `ARCHIVED` — Hidden/retired

### `subscription_status`
- `FREE` — No active subscription
- `ACTIVE` — Paid subscription current
- `EXPIRED` — Subscription lapsed
- `CANCELLED` — Voluntarily cancelled

### `payment_status`
- `PENDING` — Awaiting confirmation
- `COMPLETED` — Successfully processed
- `FAILED` — Payment rejected
- `REFUNDED` — Money returned

### `activity_type`
- `content_upload`
- `new_customer`
- `subscription`
- `payment`

---

## Entity Relationship Summary

```
users ──1:N──> content (createdBy)
users ──1:N──> activity_log (performedBy)

customers ──1:N──> subscriptions
customers ──1:N──> payments
customers ──M:N──> content ──< content_views >──
customers ──1:N──> activity_log (customerId)

subscriptions ──1:N──> payments

content ──1:N──> activity_log (contentId)
```

---

## Indexes to Consider

| Table | Index | Type | Reason |
|---|---|---|---|
| `users` | `email` | UNIQUE | Login lookup |
| `customers` | `email` | UNIQUE | Duplicate prevention |
| `customers` | `subscriptionStatus` | NON-UNIQUE | Filtering by status |
| `customers` | `isEmailVerified` | NON-UNIQUE | Unverified customer queries |
| `customers` | `verificationToken` | NON-UNIQUE | Email verification lookup |
| `customers` | `resetPasswordToken` | NON-UNIQUE | Password reset lookup |
| `subscriptions` | `(customerId, status)` | NON-UNIQUE | Current plan lookup |
| `subscriptions` | `endDate` | NON-UNIQUE | Expiring subscriptions query |
| `payments` | `(customerId, paidAt)` | NON-UNIQUE | Payment history |
| `payments` | `status` | NON-UNIQUE | Failed payment monitoring |
| `content` | `status` | NON-UNIQUE | Published vs. draft filtering |
| `content` | `isPremium` | NON-UNIQUE | Public page filter by type |
| `content_views` | `(customerId, contentId)` | UNIQUE | One view record per customer per content |
| `content_views` | `contentId` | NON-UNIQUE | View count aggregation |
| `content_views` | `viewedAt` | NON-UNIQUE | Analytics over time |
| `activity_log` | `createdAt` | NON-UNIQUE | Recent activity sorting |
