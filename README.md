# Accessible Image Gallery (React)

## Overview

Accessible Image Gallery is a fully responsive, full-screen image viewer built using React. The application loads images from a local JSON source on initial render and dynamically switches to Unsplash API results when users perform a search.

The project focuses on accessibility, clean component architecture, smooth UI transitions, and performance optimisation. Special attention was given to preventing image flicker, handling loading states properly, and maintaining a stable full-viewport layout across desktop and mobile devices.

In response to feedback from Week 4, a pre-render loading animation was implemented to improve perceived performance when deploying to Render. This prevents users from seeing a blank screen while the application is still loading or building, which can otherwise make them think the website is broken. Instead, a loading indicator reassures them that the system is working in the background.

---

## Live Demo

**Render Deployment URL:**  
https://accessible-gallery-react.onrender.com

**GitHub Repository URL:**  
https://github.com/bh-official/accessible-gallery-react/tree/main

---

## Tech Stack

- React
- JavaScript
- Custom CSS (layout & animation control)
- Unsplash API
- Vite (environment variables)

---

# Key Features

## Full-Screen Viewer Layout

- Entire gallery fills the viewport using fixed positioning
- `object-fit: cover` for proper image scaling
- Caption overlay with semi-transparent background
- Hidden page scroll for immersive viewing experience

---

## Search Functionality

- Controlled search input
- Debounced API requests (using `useEffect`)
- Unsplash integration using environment variables
- Local JSON images used as default fallback
- Clear search button
- “Back to Gallery” reset state when no results found

---

## Navigation

- Arrow button navigation
- Keyboard navigation (ArrowLeft / ArrowRight)
- Thumbnail strip navigation rendered using `.map()`
- Active thumbnail highlight
- Thumbnail show/hide toggle with animated slide transition
- Focusable interactive elements for keyboard users

---

## Smooth Transitions

- Fade-in / fade-out image animation
- Scale transition for subtle zoom effect
- Image loader overlay while large images are loading
- Conditional rendering to prevent black flicker

---

# Loading States

The application implements clearly separated loading states to improve user experience and perceived performance.

## 1. Initial Application Loading State (`isInitialLoading`)

Managed in **App.jsx** using `useState` and `useEffect`.

- Displays a full-screen loading animation before the gallery renders
- Includes animated title fade-in
- Includes animated progress bar
- Delayed intentionally for 2 seconds using `setTimeout`
- Designed specifically to improve perceived performance during Render deployment delays (Week 4 feedback improvement)
- Prevents users from seeing a blank screen during static site build time

This loading screen renders **before** the `Gallery` component mounts.

---

## 2. API Search Loading State (`isLoading`)

Managed in **App.jsx** and passed to `Gallery` as a prop.

Triggered when:

- A user enters a search term
- Debounced search updates
- Unsplash API request begins

Behaviour:

- `setIsLoading(true)` before API call
- `setIsLoading(false)` in `finally` block after request completes
- Maintains layout stability while new images load

---

## 3. Empty State Handling

If:

- `images.length === 0`
- and `isLoading === false`

An accessible empty state is shown:

- “No images found. Try another search.”
- Includes reset button to return to default gallery

This ensures defensive rendering and prevents hook order errors.

---

# Responsive Design

- Full viewport layout using `position: fixed`
- Mobile-specific adjustments via media queries
- Dynamic thumbnail resizing for smaller screens
- Touch-friendly navigation buttons
- Responsive search input sizing
- `100dvh` handling for mobile viewport stability

---

# Styling Implementation

This project uses a custom CSS.

### Custom CSS handles:

- Full-screen fixed layout structure
- Thumbnail positioning and slide animation
- Scrollbar styling
- Caption overlay
- Navigation button styling
- Loading animation keyframes
- Fade transitions
- Mobile media query adjustments

---

# Architecture

Clean component separations such as `App.jsx`, `Gallery.jsx`, `Viewer.jsx`, `Thumbnails.jsx`, `SearchBar.jsx`

## Responsibilities

### App

Handles gallery state, data fetching, debounce logic, loading state separation, and Unsplash API integration.

### Gallery

Controls navigation logic, fade transitions, thumbnail visibility, keyboard navigation, and layout rendering.

### Viewer

Renders the active image, caption, and image loading overlay.

### Thumbnails

Dynamically renders image previews using `.map()` and manages selected state.

### SearchBar

Controlled input component for search functionality.

---

# Assignment Requirements Achieved

- Implemented `useState` to manage selected image, thumbnail visibility, search term, and loading states
- Used `useEffect` for initial image fetching and dynamic API updates
- Returned JSX from multiple reusable components
- Rendered images dynamically using `.map()`
- Displayed a larger version of images when thumbnails are clicked
- Provided meaningful alt text for all images
- Implemented keyboard accessibility and focusable interactive elements

---

# Stretch Goals Achieved

- Integrated Unsplash API with secure environment variable handling
- Implemented debounced search updates using `useEffect` dependency array
- Added enhanced UI styling with full responsive layout
- Created smooth transitions and loading animations
- Separated initial loading and API loading states
- Implemented thumbnail show/hide animation
- Added clear search functionality and reset state handling
- Implemented a pre-render animated loading screen based on Week 4 assignment feedback

---

# Accessibility

- Meaningful alt text for all images
- ARIA labels for navigation and toggle buttons
- Keyboard navigation support
- Focusable interactive buttons
- Logical tab flow
- Defensive rendering when image array is empty

---

# Performance Optimisations

- Debounced search requests
- `srcSet` usage for responsive image loading
- Conditional rendering to avoid unnecessary DOM updates
- Fade transition smoothing
- Separation of initial load and search load states
- Controlled state updates to prevent hook order issues

---

# Challenges Solved

- Preventing hook order mismatch errors
- Managing full-screen layout without UI collapse
- Avoiding black flicker during image transitions
- Handling dynamic image sizes from API responses
- Maintaining consistent thumbnail alignment
- Preventing scroll bleed outside the gallery container

---

# What I Learned

- How `useState` enables state-driven UI without manual DOM manipulation
- How `useEffect` manages side effects such as data fetching and event listeners
- The importance of dependency arrays in preventing unnecessary re-renders
- How to debounce user input to improve performance and reduce API calls
- How to separate loading states for better UX and cleaner architecture
- How perceived performance can be improved using pre-render animations
- How to securely handle API keys using environment variables
- How to debug hook order errors and rendering issues
- How to manage full-screen layouts across different screen sizes
- How accessibility considerations improve overall usability

---

# Future Improvements

- Move Unsplash logic to a dedicated API utility module
- Add Error Boundaries
- Implement swipe gesture support for mobile
- Add advanced image preloading for seamless transitions
- Add zoom/lightbox functionality
- Add lazy loading for thumbnails

---

# What This Project Demonstrates

- Advanced use of React Hooks
- API integration with environment variables
- Controlled components
- Conditional rendering best practices
- Accessibility-focused design
- Performance-aware UI development
- Clean, scalable component architecture
