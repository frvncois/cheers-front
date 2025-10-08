# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Vue 3 + Vite application for cannabis product marketing with internationalization (en/fr-CA), age verification, and location-based product filtering. Built with Pinia for state management, Vue Router, and Lenis for smooth scrolling.

## Development Commands

```bash
npm install              # Install dependencies
npm run dev              # Start dev server with hot reload
npm run build            # Production build
npm run preview          # Preview production build
```

Node version requirement: ^20.19.0 || >=22.12.0

## Architecture

### Core Flow

1. **App initialization** (main.js): Lenis (smooth scroll), custom Scrollr parallax system, and Animate services are initialized globally before Vue app mounts
2. **Age verification gate** (App.vue): Shows GlobalRouter component for age/location verification before displaying main app content
3. **Content loading**: After verification, contentStore fetches all content based on user's language (QC → fr-CA, others → en)
4. **Product filtering**: Products are filtered by user location using the locationAvailabilityMap (QC→SQDC, ON→OCS, AB→Alberta, DE/UK→International)

### State Management (Pinia Stores)

**userStore** (stores/user.js)
- Manages age verification state, user birthday, location (QC/ON/AB/DE/UK), and session persistence
- Validates legal age by location (18 for QC/AB/DE, 19 for ON, 18 for UK)
- Handles "remember me" with 30-day vs 24-hour session durations

**contentStore** (stores/content.js)
- Stores content separately for each language ('fr-CA' and 'en')
- Manages home, about, saintLaurent, products, blog, and productList content
- Tracks loading states, errors, and last fetched timestamps per content type and language
- Provides methods to fetch individual content types or load all languages at once

**translationStore** (stores/translation.js)
- Provides UI translation strings for both languages
- Initialized after app mount in main.js

### API Integration (services/api.js)

StrapiAPI class handles all backend communication:
- Base URL: `VITE_STRAPI_URL` (defaults to heroic-champion-86333ba9c3.strapiapp.com)
- Authentication: Uses `VITE_STRAPI_API_KEY` for API token
- Supports locale parameter for internationalization
- Query builder for populate, sort, filters, and pagination options

### Custom Animation Systems

**Lenis** (main.js:13-14)
- Smooth scrolling library, initialized globally as `window.lenis`
- Auto-rafed, resets to top on route changes

**Scrollr** (services/scrollr.js)
- Custom parallax/scroll-speed controller using HTML `speed` attribute
- Example: `<div speed="1.5">` (positive = faster down) or `speed="-0.3"` (counter-scroll)
- Shared static ticker across instances, Lenis-friendly
- Configuration: multiplier: 0.08, ease: 0.15, clamp: [-2, 2]

**Animate** (services/animate.js)
- Fade-up animation system using IntersectionObserver
- Uses custom cubic-bezier easing functions

### Component Structure

Components organized by feature:
- **global/**: GlobalHeader, GlobalFooter, GlobalRouter (age gate), GlobalMailinglist, GlobalImageMarquee, GlobalTextMarquee, GlobalTestimonials
- **home/**: Home page specific components
- **products/**: Product listing and filtering components
- **single/**: Single product view components
- **saintlaurent/**: Saint Laurent specific page components
- **blog/**: Blog listing and article components
- **about/**: About page components
- **contact/**: Contact page components

### Routing

Standard Vue Router with web history mode, all routes defined in src/router/index.js:
- `/` - HomeView
- `/about` - AboutView
- `/saint-laurent` - SaintLaurentView
- `/products` - ProductsView (filtered by location)
- `/products/:id` - SingleView (individual product)
- `/blog` - BlogView
- `/blog/:id` - ArticleView
- `/newsletter` - NewsletterView
- `/contact` - ContactView

### Location-Based Product Filtering

Products are filtered based on user location code using the availability mapping in App.vue:
- QC → SQDC
- ON → OCS
- AB → Alberta
- DE/UK → International

Only products with matching `Availability` field are shown to users.

## Path Aliasing

`@` is aliased to `/src` directory (vite.config.js)

## Environment Variables

Required in `.env`:
- `VITE_STRAPI_URL` - Strapi CMS backend URL
- `VITE_STRAPI_API_KEY` - Strapi API authentication token
