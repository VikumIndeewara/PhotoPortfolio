# 📸 Creative Portfolio & Media Showcase Website

This project is a **modern, high-performance creative portfolio website** built for photographers, videographers, and digital creators. It showcases visual work through a clean, cinematic UI while providing a secure admin interface for managing media content dynamically.

The website is designed with **scalability, performance, and visual storytelling** in mind, combining smooth animations, responsive layouts, and a real-time backend powered by Supabase.

---

## ✨ Key Features & Functionality

### 🧭 Application Structure & Routing

* **App Shell & Routing** handled by `react-router-dom`
* Centralized layout wrapper for navigation and footer
* Clean separation between **public pages** and **admin pages**
* File references:

  * `App.tsx`
  * `Layout.tsx`

---

### 🏠 Home Page Experience

* Modular home page composed of reusable sections
* Smooth scrolling and visual hierarchy for storytelling
* File reference:

  * `Home.tsx`

---

### 🎞️ Hero Slider

* Auto-rotating slides with parallax motion
* Mouse-based color reveal interaction
* Cinematic visual focus for first impressions
* File reference:

  * `HeroSlider.tsx`

---

### ℹ️ About Section with Animated Counters

* Animated statistics using `CountUp`
* Animations triggered only when visible using `useInView`
* Optimized for performance and user engagement
* File references:

  * `About.tsx`
  * `CountUp.tsx`

---

### 🛠️ Services Section

* Clearly defined list of services
* Icon-based visual representation
* File reference:

  * `Services.tsx`

---

### 🗂️ Portfolio Overview

* Tab-based portfolio filtering:

  * **Photography**
  * **Videography**
* Smooth UI transitions
* File reference:

  * `Portfolio.tsx`

---

### 🖼️ Gallery Pages

* Dynamic routing per category
* Images fetched from Supabase database
* Responsive grid layout
* Fullscreen lightbox preview
* File references:

  * `GalleryPage.tsx`
  * `Lightbox.tsx`

---

### 💬 Testimonials

* Carousel / card-based testimonial display
* Enhances credibility and trust
* File reference:

  * `Testimonials.tsx`

---

### 📬 Contact Form

* Client-side validated contact form
* Local submit handling (ready for API/email integration)
* File reference:

  * `Contact.tsx`

---

### 📱 Navigation System

* Scroll-aware navigation
* Fully responsive mobile menu
* File reference:

  * `Navigation.tsx`

---

### 🔐 Admin Dashboard

* Secure admin authentication
* Protected routes using Supabase session checks
* Dedicated admin layout
* Image upload system:

  * Uploads files to Supabase Storage
  * Inserts metadata into `portfolio_images` table
* File references:

  * `AdminLoginPage.tsx`
  * `ProtectedRoute.tsx`
  * `AdminLayout.tsx`
  * `ImageUploadForm.tsx`

---

### 🧾 Global Footer

* Persistent footer across all pages
* File reference:

  * `Footer.tsx`

---

## 🗄️ Backend & Storage (Supabase)

* Supabase client configuration and environment variables
* Image storage handled via Supabase Storage bucket (`pdb`)
* Metadata stored in Postgres table: `portfolio_images`
* File references:

  * `SupabaseClient.tsx`
  * `.env`

---

## 🧰 Tech Stack & Libraries

### Frontend

* **React + TypeScript**
* **Vite** for fast development and builds
* **Tailwind CSS** for utility-first styling
* **PostCSS** for CSS processing
* **lucide-react** for modern icons

### Routing

* `react-router-dom`

### Backend

* **Supabase**

  * Authentication
  * Storage
  * PostgreSQL database

### Tooling & Dev Utilities

* ESLint for code quality
* Environment-based configuration
* NPM scripts for development and production
* File references:

  * `vite.config.ts`
  * `tsconfig.app.json`
  * `tailwind.config.js`
  * `postcss.config.js`
  * `eslint.config.js`
  * `package.json`

---

## 🧠 Architecture & Design Patterns

* **Component-driven UI**
  Reusable, isolated components under `src/components/*`

* **Route-based organization**
  Public pages in `src/pages/*`
  Admin pages in `src/pages/admin/*`

* **Protected Routes**
  Admin access controlled via Supabase session checks

* **Client-side Media Flow**
  Image file → Supabase Storage → Database metadata insert

* **Performance Optimizations**

  * Intersection Observer (`useInView`)
  * Animation timing with `requestAnimationFrame`

---

