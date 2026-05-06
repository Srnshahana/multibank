# Beginner's Guide to the Backend

Since you mentioned you haven't done much backend work before, think of the backend as the **"Kitchen"** of a restaurant. 
The Frontend (React) is the **"Dining Area"** where customers sit and look at the menu (the UI). The Backend is where the food (the data) is actually cooked and prepared before being sent out to the tables.

Here is a simple explanation of every file in your `backend/src` folder and exactly what it does.

---

## 1. `src/mockData.ts` (The Data Engine / The Chef)
Normally, a trading app gets its data by talking to a real stock market API (like Binance or Yahoo Finance). Because this is a coding challenge, we don't want the reviewer to have to set up complicated API keys. So, we built our own "fake stock market" in this file!

**What this file does:**
- It starts with a hardcoded list of starting prices (e.g., AAPL starts at $175.50).
- **`updatePrices()`**: This is the magic function. Every time it runs, it loops through every stock and applies a "Random Walk" algorithm. It basically flips a coin to increase or decrease the price by a tiny random fraction of a percent (between -0.5% and +0.5%). This makes the chart look like a realistic, jittery stock market.
- **`getHistoricalData()`**: If the frontend asks for the past 50 data points to draw the initial chart, this function calculates backwards in time to create a fake history so the chart doesn't look empty when the page first loads.

---

## 2. `src/socket.ts` (The Live Broadcaster / The Waiter)
In a standard website, the browser asks the server for data, gets it, and the connection closes (this is a REST API). But for a *live* trading dashboard, the server needs to actively push data to the browser every second without the browser asking. We use a technology called **WebSockets** (specifically a library called `Socket.io`) to do this.

**What this file does:**
- It creates a global timer (`setInterval`) that ticks once every 1,000 milliseconds (1 second).
- Every second, it asks `mockData.ts` to run `updatePrices()` to generate new prices.
- It then uses `io.emit('price-update', prices)`. Think of `emit` as shouting through a megaphone to every connected browser: *"Hey everyone! Here are the new prices!"*
- It also tracks when a user connects (`io.on('connection')`) or disconnects, just so we can log it in our terminal.

---

## 3. `src/index.ts` (The Entry Point / The Restaurant Manager)
This is the very first file that runs when you start the backend server. It sets up the actual web server and glues everything together.

**What this file does:**
- **Express.js**: It sets up `express`, which is the most popular framework for making web servers in Node.js. 
- **CORS**: It enables `cors` (Cross-Origin Resource Sharing). Because your frontend runs on port `5173` and your backend runs on port `3001`, browsers will block them from talking to each other for security reasons. Enabling CORS tells the browser, "It's okay, they are allowed to talk."
- **REST API Routes**: It sets up two standard "fetch" endpoints:
  - `app.get('/api/tickers')`: The frontend can visit this to get a simple list of available stock symbols.
  - `app.get('/api/history/:symbol')`: The frontend can visit this to get the 50 historical data points for the chart.
- **Starting the Server**: Finally, it calls `server.listen(3001)`, which actually turns the server on and tells it to listen for traffic on port 3001.

---

## The Overall Flow (How it all connects)

1. **You run `npm run dev`**: Node.js looks at `package.json`, sees the command, and starts executing `src/index.ts`.
2. **The Server Boots Up**: `index.ts` turns on the Express server on port 3001 and initializes the Socket.io WebSocket.
3. **The Ticker Starts**: `socket.ts` starts an infinite loop, running every 1 second.
4. **The Frontend Connects**: Your React app opens and connects to port 3001.
5. **Initial Data Grab**: The React app makes a standard HTTP `fetch()` to `/api/history/AAPL`. `index.ts` hears this, asks `mockData.ts` for the history, and sends it back. The React Chart draws the initial line.
6. **The Live Stream**: Every second, `socket.ts` calls `updatePrices()` in `mockData.ts`. It takes the new prices and pushes them down the WebSocket pipe to the React app.
7. **UI Updates**: The React app receives the new data, updates the `SocketContext`, and your charts and sidebars automatically glow and shift in real-time!
