# Veloxa

Veloxa is an ultra-fast, minimalist WebRTC video conferencing application designed for high performance and focused collaboration. Featuring a clean white-and-green aesthetic, direct peer-to-peer audio and video transmission, real-time screen sharing, and automatic room lifecycle management.

---

## ✨ Features

- **White & Emerald Palette**: Minimalist, clean UI with zero visual clutter.
- **Direct P2P WebRTC**: Ultra-low latency video and audio streams using WebRTC mesh architecture.
- **One-Click Instant Meetings**: Generate a room and join with zero signup required.
- **Direct Join & Shareable URLs**: Join via custom meeting codes or direct invite links (`/room/:id`).
- **Screen Sharing**: Live screen share with instant track-replacement across all peers in the room.
- **Audio & Video Controls**: Toggle camera and microphone at any time with real-time status indicators.
- **Active Participant Grid**: Responsive, adaptive video grid supporting 1-on-1 and group calls with camera-off avatar fallbacks.
- **Automatic Room Cleanup**: Automatic peer disconnect notification and cleanup when users exit.

---

## 🛠️ Tech Stack

### Frontend (`client/frontend`)
- **React 19** with **TypeScript**
- **Vite** (bundler & dev server)
- **TailwindCSS** (custom white & emerald design system)
- **PeerJS** (WebRTC peer connections)
- **Socket.io-client** (signaling server client)
- **Lucide React** (minimalist iconography)
- **React Router 7**

### Backend (`server`)
- **Node.js** with **Express** & **TypeScript**
- **Socket.IO** (WebRTC signaling, room orchestration, peer discovery)
- **UUID**

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have Node.js (v18+) and npm installed.

### 2. Start the Signaling Server
Open a terminal and start the server:

```bash
cd server
npm install
npm run dev
```
The server will run on `http://localhost:5000`.

### 3. Start the Frontend Client
In a separate terminal, start the Vite development server:

```bash
cd client/frontend
npm install
npm run dev
```
The client will run on `http://localhost:5173`.

---

## 📖 How to Use

1. **Create a Meeting**: Click **"Start a New Meeting"** on the home screen. You'll instantly enter a newly generated room.
2. **Invite Others**: Click **"Invite"** in the top bar or copy the room URL / ID and share it with teammates.
3. **Join an Existing Meeting**: Paste the room ID or URL into the input field on the home screen and click **"Join"**.
4. **In-Call Controls**:
   - 🎙️ Toggle Microphone (Mute / Unmute)
   - 📹 Toggle Camera (On / Off with initials avatar fallback)
   - 🖥️ Screen Share (Stream your display or window to other participants)
   - 📞 Leave Meeting (Gracefully disconnects and returns to the home page)
