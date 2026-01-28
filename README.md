# User Feedback Collector (React + Node/Express)

This repository contains a full-stack example: a React frontend (Vite) and a Node/Express backend.
The frontend allows users to submit feedback (name, rating, comment). Submissions use optimistic updates:
new feedback appears immediately in the UI and is replaced with the confirmed backend version when the API responds.

## Structure

- `backend/` - Node/Express backend (port 4000 by default)
  - `server.js` - Express server with `GET /feedback` and `POST /feedback`
  - `data/feedback.json` - simple JSON file acting as a mock database
- `frontend/` - Vite + React frontend (dev server runs at 5173 by default)
  - `src/` - React source including Redux setup and components

  ## 🎥 Demo Video

    Watch the full walkthrough here:

    https://www.loom.com/share/78cb4901f2fc4da9b07f951071cfd268

## Requirements

- Node.js (v18+ recommended)
- npm

## Quick setup (development)

1. Start the backend:
   ```
   cd backend
   npm install
   npm start
   ```
   Backend will listen on `http://localhost:4000`.

2. Start the frontend in another terminal:
   ```
   cd frontend
   npm install
   npm run dev
   ```
   Frontend dev server will open (commonly at `http://localhost:5173`).

3. Open the frontend URL in your browser, submit feedback, and watch optimistic updates.

## Notes & Guarantees

- The backend stores feedback in `backend/data/feedback.json`.
- The backend validates `name` and `rating`.
- The frontend uses optimistic updates: it inserts a temporary item with `id` like `temp-<timestamp>` and `_optimistic: true`.
  When the server responds, the temporary item is replaced with the server-assigned `id` and real `createdAt`.
- All APIs (`GET /feedback`, `POST /feedback`) are implemented and should work out of the box.

## Troubleshooting

- If CORS errors appear, ensure backend is running and accessible at the URL in `frontend/.env` or change `VITE_API_BASE`.
- If ports are busy, change `PORT` in `backend/server.js` or `VITE` dev port.

## License

MIT
