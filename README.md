# 📸 Instagram Wrapped

> Turn your Instagram data into a personalized year-in-review experience.

🔗 **Live Demo:** https://instagram-wrapped-tau.vercel.app/  
🔗 **GitHub:** https://github.com/HarshAwasth-i/instagram-wrapped

---

## ✨ Overview

Instagram Wrapped is a privacy-first analytics dashboard that transforms an Instagram data export into a personalized yearly recap.

Instead of uploading personal Instagram data to a backend server, the application processes the exported ZIP file directly in the browser, extracts relevant JSON data, calculates analytics, and presents the results through an interactive dashboard and Wrapped-style story experience.

### 🔒 Privacy First

**Your Instagram data stays on your device.**

The application processes the uploaded Instagram export entirely in the browser. No Instagram data is sent to or stored on a backend server.

---

## 🚀 Features

### 📊 Analytics Dashboard

- Followers and following statistics
- Mutual followers
- Accounts not following you back
- Message statistics
- Sent vs received messages
- Most active messaging hours
- Top conversations
- Likes given
- Most liked accounts
- Content activity
- Monthly posting activity
- Story activity
- Search behavior
- Login activity
- Personality insights

### 🎞️ Wrapped Experience

A personalized Instagram Wrapped experience featuring:

- Year summary
- Message statistics
- Top friends
- Like activity
- Content activity
- Most active month
- Connection statistics
- Personality insights
- Animated story-style navigation
- Autoplay with progress indicators
- Keyboard navigation
- Pause/resume controls

### 📤 Share Your Recap

Generate a shareable recap containing:

- Messages
- Likes
- Reels
- Stories
- Top 5 conversations
- Most liked account
- Personality insights
- Optional username blurring
- Downloadable recap image
- Copy link functionality

---

## 🧠 How It Works

The application follows this processing pipeline:

**Instagram ZIP → JSON Parser → Analytics Engine → Dashboard → Wrapped Experience**

### Processing Flow

1. User uploads their Instagram data export ZIP.
2. The ZIP file is processed directly in the browser.
3. Instagram JSON files are extracted and parsed.
4. Raw data is transformed into useful analytics.
5. Analytics are displayed through the dashboard.
6. The same analytics power the Wrapped-style experience.
7. Users can generate a shareable recap.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI |
| TypeScript | Type-safe development |
| Vite | Build tooling |
| Tailwind CSS | Styling |
| Framer Motion | Animations and transitions |
| Recharts | Data visualization |
| JSZip | Instagram ZIP/JSON processing |
| IndexedDB | Local data persistence |
| Vercel | Deployment | 

---

## 🏗️ Project Structure

The project is organized into reusable React components, pages, context, types, and utility modules.

### Main directories

- `components/` — Dashboard, sections, upload, sharing, wrapped experience, and layout components
- `context/` — Global Instagram data and analytics state
- `pages/` — Landing page and dashboard
- `types/` — TypeScript interfaces and data types
- `utils/` — ZIP parsing, Instagram data parsing, and analytics processing

---

## 📈 Analytics

The application analyzes multiple parts of an Instagram export, including:

- 👥 Followers & Following
- 💬 Messages
- ❤️ Likes
- 💭 Comments
- 🔎 Searches
- 📱 Login activity
- 📝 Posts
- 📖 Stories
- 🤝 Connections
- 🧠 Personality patterns

Analytics can be recalculated for different years when the exported data contains the required timestamps.

---

## 🔐 Privacy Architecture

Instagram exports contain highly personal information, so privacy was a core design requirement.

### Traditional Approach

User → Upload → Backend Server → Process Data

This requires sending personal Instagram data to a remote server.

### Instagram Wrapped Approach

User
↓
Browser
↓
Read ZIP
↓
Parse JSON
↓
Calculate Analytics
↓
Store locally

The application processes the Instagram export directly in the browser without requiring a backend for Instagram data processing.

---

## 💻 Getting Started

### Prerequisites

- Node.js
- npm

### Installation

git clone https://github.com/HarshAwasth-i/instagram-wrapped.git

cd instagram-wrapped

npm install

### Run Locally

npm run dev

Open the local development URL shown by Vite.

### Production Build

npm run build

---

## 📸 Screenshots

Screenshots of the application can be added here.

### Landing Page

![Landing Page](screenshots/landing.png)

### Analytics Dashboard

![Analytics Dashboard](screenshots/dashboard.png)

### Wrapped Experience

![Wrapped Experience](screenshots/wrapped.png)

### Share Your Recap

![Share Your Recap](screenshots/share.png)

---

## 🌐 Live Demo

Try the deployed application:

**https://instagram-wrapped-tau.vercel.app/**

Download your Instagram data export and upload the ZIP file directly to the application to generate your personalized analytics.

---

## 🎯 What I Learned

Building Instagram Wrapped involved working with:

- Real-world JSON data structures
- ZIP file processing in the browser
- Data parsing and transformation
- Client-side analytics
- Dynamic year-based filtering
- React state management
- Persistent browser storage
- Interactive data visualization
- Animation-heavy UI
- Privacy-focused architecture
- Production deployment with Vercel

---

## 🔮 Future Improvements

- [ ] Better support for additional Instagram export formats
- [ ] More advanced yearly comparisons
- [ ] Additional analytics and trends
- [ ] More personalized Wrapped themes
- [ ] Improved mobile experience
- [ ] More export/share formats
- [ ] Performance improvements through code splitting

---

## 📄 License

This project is intended as a personal portfolio project.

---

## 👨‍💻 Author

**Harsh Awasthi**

B.Tech Computer Science Engineering

- GitHub: https://github.com/HarshAwasth-i
- Live Project: https://instagram-wrapped-tau.vercel.app/
