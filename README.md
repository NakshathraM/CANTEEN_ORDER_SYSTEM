# 🍔 Campus Canteen — Classroom Food Delivery Application

A modern, responsive web application for ordering food from the college canteen directly to classrooms. Built with a clean component structure, local persistence, real-time live status tracking, and a password-protected admin portal.

---

## 🎨 Color Palette & Design System

The application strictly adopts the required palette:
- **Coral Red**: `#FA5053` — Primary actions, alerts, order status highlights, bestseller tags
- **Royal Blue**: `#274AB3` — Navigation, headers, secondary actions, classroom location cards
- **Soft White**: `#FFFAFA` — Page backgrounds and cards
- **Warm Beige**: `#EED9C4` — Subtle sections, chips, empty states, decorative elements

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open **[http://localhost:5174](http://localhost:5174)** in your web browser.

---

## 🔑 Login Credentials

### Student / User Ordering Experience
- **No account or password needed!**
- Students can browse the menu, add items to their classroom tray, enter their classroom details, and order immediately.
- Order tracking is available using only **Order ID** (e.g. `#CC-9021`) or **Phone Number**.

### Canteen Staff / Admin Portal
- **URL**: Click the **Admin** button in the top navigation or access `#/admin`
- **Password**: `campus2026` or `admin123`
*(A convenient "Auto Fill" button is provided on the login card for easy evaluation).*

---

## 🌟 Application Features

1. **Student Storefront**:
   - Hero section with message: *"Fresh food, delivered to your classroom."*
   - Prominent **Order Now** and **Track Order** CTAs.
   - Category filtering: **All**, **Meals**, **Snacks**, **Beverages**, **Desserts**.
   - Dietary filtering: **All**, **Veg Only**, **Non-Veg**.
   - Live food search with instant results.
   - Food cards with images, dietary tags, price in ₹, preparation time, and quantity stepper.

2. **Classroom Tray (Cart)**:
   - Slide-out drawer with real-time quantity adjustments.
   - Subtotal and free classroom delivery summary.
   - Itemized bill preview.

3. **Validated Classroom Checkout**:
   - Student Full Name *(required, validated)*
   - Mobile Phone Number *(required, 10 digits validated)*
   - Academic Department *(dropdown: Computer Science, Mechanical, Civil, Electronics, Commerce, Arts, etc.)*
   - Classroom Number *(required, e.g. Room 304, CS Lab 2)*
   - Floor Number *(required, Ground Floor to 4th Floor)*
   - Optional Delivery Note *(e.g. "Deliver during 11:30 AM interval")*
   - Payment Choice: **Cash on Delivery** or **Online Payment (Simulated UPI/QR)**

4. **Order Confirmation & Live Tracking**:
   - Order Ticket `#CC-XXXX` with clipboard copy.
   - Estimated delivery arrival countdown.
   - Prominent classroom delivery destination callout.
   - Interactive 4-stage delivery tracker: **Received → Preparing → Out for Delivery → Delivered**.
   - Anonymous order tracking with quick-select chips for recent orders on the device.

5. **Canteen Admin Dashboard**:
   - Live metrics: Total Orders, Pending / Received, Cooking in Kitchen, Out for Delivery, Delivered, and Gross Revenue.
   - Classroom order dispatcher with search, status filters, and 1-click status advancement.
   - Menu inventory management: add items, edit items, toggle in-stock / out-of-stock, and delete items.
   - Category management: add custom food categories.
   - Demo reset button to restore realistic sample orders anytime.
