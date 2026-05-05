# Real-Time Trading Dashboard

A full-stack, real-time trading dashboard built with a microservices-friendly architecture. It streams simulated live ticker prices via WebSockets and visualizes them on a sleek, responsive, and dynamic UI using Recharts and Tailwind CSS.

## Features

- **Real-time Price Updates**: Backend simulates market movements and streams them via Socket.io.
- **Dynamic Charting**: Recharts implementation that updates live without flickering.
- **"Killer UI"**: Dark mode, glassmorphism design, neon glows for price changes, and smooth micro-animations.
- **Microservices Ready**: Frontend and backend are separated and containerized via Docker.
- **Kubernetes Manifests**: Ready-to-deploy basic K8s setup included.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Recharts, Socket.io-client.
- **Backend**: Node.js, Express, TypeScript, Socket.io.
- **Infrastructure**: Docker, Docker Compose, Kubernetes.

## Prerequisites

- Node.js >= 20
- Docker & Docker Compose

## Quick Start (Docker)

1. Clone the repository and navigate to the root directory.
2. Run the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```
3. Open your browser and navigate to `http://localhost:8080`.

## Manual Development Setup

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Running Tests

The backend includes Jest tests to verify the mock data generator logic.
```bash
cd backend
npm test
```

## Assumptions & Trade-offs

1. **Mock Data Generation**: Instead of connecting to a real financial API (which requires API keys, rate limits, and often paid tiers for WebSockets), I built a random-walk algorithm. This ensures the app is easily reviewable and runs perfectly out-of-the-box without requiring you to set up external API credentials.
2. **State Management**: React Context (`SocketContext`) was used instead of Redux. Given the focused scope of the dashboard, Context API + custom hooks provide a cleaner, less boilerplate-heavy approach for streaming data into components.
3. **Database & Caching**: No persistent database or Redis cache was implemented. Historical data is generated dynamically on backend start. Adding Redis for caching would be the natural next step for scaling the real-time data layer.

## How I Built This (Step-by-Step Implementation)

### 1. Project Initialization & Architecture Design
My first priority was ensuring a clear separation of concerns (microservices-friendly). I created two distinct directories (`/frontend` and `/backend`), each with their own `package.json`, TypeScript configs, and Dockerfiles. 

### 2. Backend Service (The Data Engine)
I needed a reliable way to stream live data without relying on a third-party API that might rate-limit the reviewer.
- **The Mock Data**: In `backend/src/mockData.ts`, I created a dictionary of popular tickers (AAPL, TSLA, BTC). I wrote an algorithm that applies a "Random Walk" (randomized fluctuations between -0.5% and +0.5%) to the prices every second. It also generates 50 ticks of historical data on demand.
- **The WebSocket**: In `backend/src/socket.ts`, I attached `socket.io` to the Express server. It runs a global `setInterval` that emits a `price-update` event with the fresh array of ticker data every 1000ms to all connected clients.
- **The REST API**: I exposed `/api/tickers` and `/api/history/:symbol` via Express to handle the initial data fetching before the WebSocket takes over.

### 3. Frontend Service (The Real-Time UI)
I chose Vite + React for lightning-fast development and minimal bundling overhead.

## Project Flow & UI Breakdown

The application functions as a single-page dashboard designed to provide an at-a-glance view of multiple financial instruments. Below is a breakdown of how the data flows into the UI and the purpose of each screen/component:

### Data Flow Overview
1. **Connection**: When the user opens the dashboard, the frontend establishes a persistent WebSocket connection to the backend.
2. **Initial Sync**: The frontend fetches the last 50 historical data points for the default active ticker (e.g., AAPL) via a REST API to immediately draw the chart.
3. **Continuous Streaming**: The backend pushes a `price-update` packet every 1 second to all connected clients.
4. **State Hydration**: The global React Context (`SocketContext`) intercepts these updates, seamlessly merging the new prices into both the global ticker list and the historical chart array.

### UI Components Breakdown (The Dashboard Screen)

Since the dashboard is a unified single-page application (SPA), the "screens" are effectively modular components that share the same screen space:

#### 1. The Sidebar (Market Tickers List)
* **Function**: Acts as the primary navigation and high-level overview. It displays all available financial instruments tracked by the system (e.g., AAPL, TSLA, BTC-USD).
* **Interactivity**: Clicking on any ticker card updates the global state to make it the "Active Ticker". This instantly swaps the data displayed in the Chart and Stats components.
* **Visual Cues**: Each card shows the symbol, current price, and a 24h percentage change. If the price goes up, the text turns neon green; if it goes down, it turns neon red, allowing users to quickly assess market trends.

#### 2. The Main Header (Top Navigation)
* **Function**: Provides branding and system status.
* **Interactivity**: Includes a glowing "Live Market Data" indicator. If the WebSocket connection is lost, this badge automatically turns red and reads "Disconnected", keeping the user informed of their connection health. It also includes mocked notification, settings, and user profile buttons for visual completeness.

#### 3. The Interactive Chart (Main View)
* **Function**: Visualizes the price history and real-time movement of the currently selected ticker. 
* **Interactivity**: Built using Recharts, it features a custom tooltip. When the user hovers over the area chart, they can see the exact price and timestamp of any historical data point. As new WebSocket data arrives every second, the chart smoothly appends the new data point without full-page reloads or flickering.

#### 4. The Real-Time Stats Cards (Bottom Section)
* **Function**: Breaks down the core metrics of the active ticker into easily digestible widgets.
* **Metrics Displayed**: 
  - **Current Price**: The absolute latest value.
  - **24h Change**: The percentage fluctuation, color-coded with trend arrows.
  - **Volume**: A mocked representation of current trading volume.
  - **Last Updated**: A precise timestamp of the last received WebSocket packet, proving to the reviewer that data is actively flowing.

### 4. DevOps & Polish
To make the submission professional and easy to run:
- I wrote multi-stage `Dockerfile`s for both the Node.js backend and the Nginx-served frontend, ensuring the images are lightweight.
- I tied them together with `docker-compose.yml` so the reviewer can spin up the entire stack with a single command.
- I wrote backend unit tests using `Jest` to mathematically verify that the price generation stays within realistic bounds.
- I included Kubernetes manifests (`k8s/deployment.yaml`) as a bonus to demonstrate how this microservice architecture would be deployed to a cluster.


flow of th project explained 

# multibank
