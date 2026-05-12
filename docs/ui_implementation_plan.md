# Info Share UI Implementation Plan

Based on the `docs/infor_share_plan.md`, here is the detailed implementation plan focused solely on the UI components and pages for the Info Share project.

## Phase 1: UI Foundations & Design System
*Establish the visual tokens, animation system, and base components.*
- **CSS Variables & Theming**: Create `styles/globals.css`, `styles/theme.css`, and `styles/animations.css` based on the predefined tokens.
- **Framer Motion Setup**: Implement all animation variants in `utils/animationVariants.ts` (e.g., `fadeSlideUp`, `scaleIn`, `slideInDrawer`).
- **Base Components**: Build the foundational, reusable components following the design standards:
  - `Button`, `Input`, `Select`, `Toggle`
  - `Modal`, `Card`, `Badge`, `Avatar`
  - `Table`, `Pagination`, `Spinner`, `EmptyState`

## Phase 2: Layouts & Navigation
*Set up the structural shells for both public and protected areas.*
- **Public Layout**: Implement `PublicLayout`, `PublicHeader` (with navigation and login button), and `PublicFooter`.
- **Dashboard Layout**: Implement `DashboardLayout`, `Sidebar` (collapsible, role-based links), and `TopBar` (search, user profile).
- **Routing Integration**: Map the layouts to `PublicRoutes` and `ProtectedRoutes`.

## Phase 3: Public Pages Implementation
*Build out the unauthenticated, public-facing screens.*
- **Home Page (`/`)**: 
  - Hero section with gradient background and `fadeSlideUp` animations.
  - Animated Stats Bar (`countUp` animation).
  - Horizontal scroll/carousel for Featured Content.
  - How it Works & CTA sections.
- **Content Page (`/content`)**: 
  - Filter bar (Search, Tabs, Sort).
  - Responsive Content Grid.
  - Free Content Limit Banner & Premium Lock overlays (triggers after 5 views).
- **About Page (`/about`)**: Page Banner, Mission, and Features Grid.
- **Contact Page (`/contact`)**: Split layout with Contact Info and Form, FAQ Accordion.
- **Login Page (`/login`)**: Split layout with branding illustration and login form.

## Phase 4: Dashboard & Admin UI
*Build out the authenticated, data-rich interfaces.*
- **Dashboard Home (`/dashboard`)**: 
  - Animated Stat Cards.
  - Integration of Charts (Views over time, Views by content).
  - Top Viewed Posts and Recent Activity lists.
- **Content Hub (`/dashboard/content-hub`)**: 
  - Content table with pagination.
  - Add/Edit Content Modal with image/video file upload drag & drop areas.
- **Users Management (`/dashboard/users`)**: 
  - User table and Add/Edit User Modal (Admin only).
- **Customers Page (`/dashboard/customers`)**: 
  - Customer table with subscription badges.
  - Slide-in Customer Detail Drawer (showing sub status and payment history).
- **Payments Page (`/dashboard/payments`)**: 
  - Expiring Subscriptions warning section and list.
  - Expandable Reminder Composer.
  - Payments Table and Revenue Chart.

## Verification & Polish
- Ensure all pages are responsive across breakpoints (`sm` to `2xl`).
- Verify role-based UI rendering (Admin vs. Manager views).
- Audit animations to ensure they respect `prefers-reduced-motion`.
