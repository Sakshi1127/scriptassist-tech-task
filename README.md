# Project Title: SpaceX Launch Dashboard

## Overview
This project is a frontend dashboard application built using React and the SpaceX public API. It demonstrates key functionalities such as user authentication, data querying, filtering, deep linking, and component-based UI rendering using the Mantine UI library.

---

## Tech Stack

- **React**
- **React Router**
- **Mantine UI**
- **React Query**
- **Zustand** (for state management)
- **SpaceX API** (public API for data)

---

## Features

### 🔐 Authentication Mechanism
- A secure login page with basic password validation.
- Authentication state is persisted client-side to maintain login status across sessions.
- Routing is protected using `PrivateRoute` and `PublicRoute` components.

### 📋 Resource List Page
- After login, the user is redirected to the `/dashboard/launches` route.
- This page displays a list of all SpaceX launches in a tabular format.
- Search, sorting, and filtering functionalities are integrated to improve data usability.

### 🚀 Resource Detail Page
- Clicking on any launch from the list navigates to a detail page that displays the rocket information related to that launch.
- The rocket detail page uses multiple Mantine UI components to create a clean and informative layout.

### 🔄 Data Enrichment
- In the rocket detail page, additional API calls are made to fetch enriched data about the rocket.
- These details are presented using component composition to demonstrate an advanced UI structure.

### 🔗 Deep Linking
- Routes use dynamic path parameters to enable direct linking to both individual launches and rocket details.
- This allows users to bookmark or share specific pages directly.

---

## Folder Structure Overview
src/
├── api/
│ ├── useLaunches.js
│ └── useRocketDetails.js
├── components/
│ ├── PublicRoute
│ └── PrivateRoute
├── pages/
│ ├── auth/
│ │ └── login.tsx
│ ├── dashboard/
│ │ └── dashboard.tsx
│ └── rocketDetails/
│ └── RocketDetails.tsx
├── store/
│ ├── authStore.js
│ └── appStore.js
├── style/
│ └── theme/
├── app.tsx
└── main.tsx

---

## Getting Started

1. Install dependencies using your preferred package manager:
   - `npm install`
2. Start the development server:
   - `npm run dev` 
3. Navigate to the login page to begin.

---
