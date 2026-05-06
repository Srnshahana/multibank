# Multibank Trading Dashboard & Portfolio


## 🚀 Features

- **Live Market Data:** Real-time ticker updates and pricing powered by WebSockets.
- **Interactive Charts:** Beautiful and dynamic market charts.
- **Professional Portfolio:** An integrated, premium profile page showcasing professional experience, skills, and projects.
- **Modern UI/UX:** A sleek Blue & Sky Blue theme built with Tailwind CSS, featuring glassmorphism, responsive grids, and smooth animations.
- **Responsive Design:** Fully functional across desktop and mobile devices.



## 💡 How It Works

1. **Connection:** When the frontend application loads, it immediately establishes a WebSocket connection to the Node.js backend.
2. **Data Feed:** The backend constantly emits `price_update` events containing newly generated market data. 
3. **UI Reactivity:** The React frontend listens to these events via a custom `SocketContext` and updates the Dashboard UI instantly—triggering green/red flashes to indicate price movements.
4. **View Switching:** A global state manager allows the user to click the profile icon, smoothly transitioning the UI from the live trading feed to a static, beautifully rendered professional portfolio.

---

## 🔥 Highlighted Work

Want to see more of what I can build? 

Check out this **killer website I built**: 
👉 **[Mentor-Mentee Platform](https://internify-sigma.vercel.app/)** 

It is a fully functional platform designed to connect mentors and mentees for guided learning, complete with a robust backend powered entirely by **Supabase**.

---
*Developed by Sherin Shahana*
