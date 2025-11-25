# Barbershop Management App - Design Guidelines

## Authentication & User Flow
**Auth Required** - This is a business management app requiring user accounts.
- Use Apple Sign-In (iOS) and Google Sign-In for barber/owner authentication
- Include email/password as fallback option
- Onboarding flow (linear stack):
  1. Welcome screen with value proposition
  2. Login/Sign up screen
  3. Shop setup wizard (name, logo upload, hours, contact)
  4. Services setup (add at least one service)
  5. Complete → Navigate to main app
- Profile/Settings screen includes:
  - Shop logo/avatar (square, 120x120pt)
  - Barber name and shop name
  - Log out and delete account options

## Navigation Architecture
**Tab Navigation** (5 tabs with center action):
1. **Today** - Dashboard with today's appointments and current queue
2. **Calendar** - Weekly/monthly appointment view
3. **+ (Center FAB)** - Quick add (appointment or walk-in)
4. **Customers** - Customer database and history
5. **More** - Services, shop profile, settings

Navigation stack definitions:
- Today tab: Single screen (Today Dashboard)
- Calendar tab: Calendar → Appointment Details (modal)
- Customers tab: Customer List → Customer Profile (push) → Appointment History (push)
- More tab: Menu List → Services (push) → Add/Edit Service (modal), Shop Profile (push), Gallery (push), Settings (push)

## Screen Specifications

### 1. Today Dashboard
- **Purpose**: At-a-glance view of today's schedule and walk-in queue
- **Header**: Custom transparent header with shop logo (left), date (center), notification bell (right)
- **Layout**: ScrollView with sections
  - Current queue section (if customers in queue)
  - Today's appointments timeline (chronological list)
  - Quick stats card (total appointments, completed, revenue)
- **Safe area**: Top: headerHeight + Spacing.xl, Bottom: tabBarHeight + Spacing.xl
- **Components**: Queue cards (show position, name, wait time), appointment cards (time, customer, service), floating "Add Walk-in" button (bottom right) with drop shadow

### 2. Calendar Screen
- **Purpose**: View and manage appointments by week/month
- **Header**: Default navigation with week/month toggle (right)
- **Layout**: CalendarStrip (week view) + ScrollableList of appointments
- **Safe area**: Top: Spacing.xl, Bottom: tabBarHeight + Spacing.xl
- **Components**: Calendar component, appointment list items (tap to view details), empty state for days with no bookings
- **Interactions**: Swipe left on appointment for quick actions (confirm, cancel, complete)

### 3. Quick Add Modal (Center Tab)
- **Purpose**: Fast entry for appointments or walk-ins
- **Type**: Native modal (full-screen)
- **Header**: Custom with Cancel (left), "New Booking" title, Done (right)
- **Layout**: Scrollable form
  - Segmented control: "Appointment" | "Walk-in"
  - Customer selector (existing or new)
  - Service picker
  - Date/time picker (appointments only)
  - Notes field
- **Safe area**: Form content with bottom submit button
- **Buttons**: Cancel and Save in header

### 4. Customer List
- **Purpose**: Search and browse customer database
- **Header**: Default with search bar and Add (right)
- **Layout**: Searchable list (alphabetical sections)
- **Safe area**: Top: Spacing.xl, Bottom: tabBarHeight + Spacing.xl
- **Components**: Customer row (avatar, name, last visit, total visits), section headers (A-Z), empty state

### 5. Customer Profile
- **Purpose**: View customer history and preferences
- **Header**: Default with Edit (right)
- **Layout**: ScrollView
  - Customer info card (name, phone, email)
  - Visit history list
  - Preferred services
  - Notes section
- **Safe area**: Top: Spacing.xl, Bottom: Spacing.xl
- **Action**: "Book Appointment" button at bottom

### 6. Services Management
- **Purpose**: Manage service catalog
- **Header**: Default with Add (right)
- **Layout**: List of service cards
- **Safe area**: Top: Spacing.xl, Bottom: tabBarHeight + Spacing.xl
- **Components**: Service card (name, price, duration), tap to edit modal

### 7. Shop Profile
- **Purpose**: Manage shop information and gallery
- **Header**: Default with Edit (right)
- **Layout**: ScrollView
  - Shop logo (large, centered)
  - Business info (name, hours, location, contact)
  - Photo gallery grid (3 columns)
- **Safe area**: Top: Spacing.xl, Bottom: tabBarHeight + Spacing.xl

## Design System

### Color Palette
**Primary Colors**:
- Primary: #1A1A1A (barbershop black)
- Accent: #C5A572 (gold - for premium feel)
- Background: #F8F8F8 (light gray)
- Surface: #FFFFFF

**Semantic Colors**:
- Success: #4CAF50 (confirmed/completed)
- Warning: #FF9800 (pending)
- Error: #F44336 (cancelled)
- Info: #2196F3

### Typography
- **Headings**: SF Pro Display Bold (iOS) / Roboto Bold (Android)
  - H1: 28pt, H2: 22pt, H3: 18pt
- **Body**: SF Pro Text Regular (iOS) / Roboto Regular (Android)
  - Body: 16pt, Caption: 14pt, Small: 12pt
- **Color**: #1A1A1A for primary text, #666666 for secondary

### Spacing System
- xs: 4pt, sm: 8pt, md: 12pt, lg: 16pt, xl: 24pt, xxl: 32pt

### Components
**Cards**: White background, corner radius 12pt, no shadow by default. Elevated cards use subtle shadow.

**Buttons**:
- Primary: Gold background (#C5A572), white text, 12pt radius
- Secondary: Outline with gold border, gold text
- Visual feedback: 90% opacity when pressed

**Floating Action Button** (Add Walk-in, Quick actions):
- Circle, 56x56pt, gold background
- Drop shadow: offset (0, 2), opacity 0.10, radius 2
- White icon (Feather "plus" or "user-plus")

**Status Badges**: Rounded pill (20pt height), colored background with white text

### Icons
- Use Feather icons from @expo/vector-icons
- Common icons: calendar, clock, user, users, phone, mail, camera, settings, plus-circle, check, x
- Icon size: 20pt (standard), 24pt (tab bar), 16pt (inline)

### Required Assets
1. **Placeholder shop logo** - Circular barbershop pole icon (red/white/blue stripes, stylized)
2. **Service category icons** - Generate 6 haircut style illustrations (classic, fade, buzz, beard trim, shave, kids cut) in gold/black line art style
3. **Empty state illustrations** - Minimalist barbershop-themed illustrations for empty appointments, queue, customers (barber chair, scissors, comb motifs)
4. **Avatar placeholders** - Generate 5 professional avatar presets with different hairstyles in barbershop aesthetic (silhouettes)

### Accessibility
- Minimum touch target: 44x44pt
- Color contrast ratio: 4.5:1 for text
- Support dynamic type (scale text 80-160%)
- VoiceOver labels for all interactive elements
- Status updates announced for queue changes

### Visual Feedback
- All touchable elements: 90% opacity on press
- List item swipe actions: Reveal colored action buttons
- Loading states: Activity indicator with "Loading..." text
- Success/error toasts: Top of screen, auto-dismiss in 3s
- Pull-to-refresh on lists