# Media North Advertising Manager

**Media North** is a comprehensive web dashboard built with React and Supabase to manage digital advertising across multiple **customers**, **videos**, **devices** (TVs), and **sites** (locations).

---

## 🗂️ Table of Contents

- [Overview](#overview)
- [Entity Relationships](#entity-relationships)
- [Features](#features)
- [Statistics Panels](#statistics-panels)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Logging & Audit](#logging--audit)

---

## 🔍 Overview

Media North streamlines digital ad management by modeling:

- **Customers**: Brands or organizations under contract.
- **Videos**: Ad assets created by customers.
- **Sites**: Physical locations (shopping centers, restaurants) where TVs are installed.
- **Devices**: Individual TVs or controllers assigned to sites.

A **customer** can create multiple **videos**, and each video can be scheduled to play on one or more **devices** across different **sites**. This flexible mapping enables targeted campaigns per location.

---

## 🧩 Entity Relationships

```
Customer 1––* Video *––* Device *––1 Site
```

- **Customer → Videos**: One customer may have many video campaigns.
- **Video → Devices**: One video may be assigned to many devices (TVs).
- **Device → Site**: Each device belongs to a single site (location).

---

## 🚀 Features

- **Customer Management**: Add/edit/delete customers, contracts with start/end dates, points and values.
- **Video Campaigns**: Upload video metadata (URL, title, duration), assign to multiple devices.
- **Site & Device Management**: Configure sites with contact and contract info; register devices with schedules and activation status.
- **Real-time Dashboard**: Key metrics on active vs inactive sites, devices, customers, and videos.
- **Activity Logs**: Track all user and device events with contextual metadata.

---

## 📊 Statistics Panels

Located on the main dashboard, the panels provide:

- **Active Customers**: Number of customers with ongoing contracts.
- **Active Videos**: Count of video campaigns currently active.
- **TVs Active vs Inactive**: Device status per site.
- **Site Activity**: Growth or decline in active sites month-over-month.

Each panel includes:

1. **Title**: Metric name
2. **Main Value**: Current count
3. **Subtitle/Detail**: Additional breakdown (e.g., inactive count)
4. **Trend**: Percentage change vs prior period

---

## 🧰 Tech Stack

- **Frontend**: React, React Router, Tailwind CSS, Lucide Icons, React Hot Toast
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Realtime)
- **Utilities**: date-fns, bcryptjs
- **Deployment**: Firebase Hosting

---

## 🏁 Getting Started

### Prerequisites

- Node.js (>=14.x)
- npm or yarn
- A Supabase project with the required tables and Auth

### Installation

```bash
git clone https://github.com/yourusername/media-north.git
cd media-north
npm install  # or yarn install
```

### Environment

Copy `.env.example` to `.env.local` and set your:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
FIREBASE_API_KEY=...
FIREBASE_PROJECT_ID=...
```

### Run Locally

```bash
npm run dev  # or yarn dev
```

---

## 📁 Project Structure

```
src/
├── components/    # UI (cards, blocks, forms, tables)
├── pages/         # Views and routes
├── hooks/         # Data-fetching and business hooks
├── helpers/       # Utility functions
├── services/      # API and logging services
├── contexts/      # Auth context
├── libs/          # Supabase and Firebase setup
└── App.jsx        # Main app
```

---

## 📝 Usage

- **Sites**: Manage display locations and contracts.
- **Devices**: Register TVs with schedule and status.
- **Customers**: CRUD customer profiles and contracts.
- **Videos**: Assign video campaigns to devices.
- **Logs**: View audit trail of actions.

---

## 🔍 Logging & Audit

All actions are recorded in the `log_event` table with:

- `event_type`, `summary`, `details` (JSON)
- `user_id` or `device_id`, `ip_address`, `user_agent`, `created_at`
