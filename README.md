# HRMS Lite

Lightweight HR management tool with employee and attendance tracking.

## Tech Stack

- **Frontend:** React 18 + Vite + TypeScript (port 5173)
- **Backend:** FastAPI + Motor (async MongoDB driver) (port 8000)
- **Database:** MongoDB Atlas

## Local Development

### Backend

1. Install dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. Configure MongoDB (`.env` already set up with credentials):
   ```bash
   # .env contains your MongoDB Atlas URI
   ```

3. Run the API server:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

API docs: http://localhost:8000/docs (Swagger UI)

### Frontend

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Run the dev server:
   ```bash
   npm run dev
   ```

Navigate to http://localhost:5173

## Docker Compose

Run both services with:

```bash
docker-compose up
```

This starts:
- Backend at http://localhost:8000
- Frontend at http://localhost:5173

## API Endpoints

- `GET /employees` - List all employees
- `POST /employees` - Create employee
- `DELETE /employees/{id}` - Delete employee
- `GET /attendance` - List attendance records (optional: `?employee_id=...`)
- `POST /attendance` - Mark attendance
- `GET /health` - Health check

## Project Structure

```
.
├── frontend/              # React + Vite UI
│   ├── src/
│   │   ├── components/   # Feature & common components
│   │   ├── api/          # API client
│   │   ├── types/        # Shared TypeScript types
│   │   └── styles.css    # Professional dark theme
│   ├── package.json
│   └── vite.config.ts
├── backend/              # FastAPI server
│   ├── app/
│   │   ├── main.py       # Application entry
│   │   ├── config.py     # Settings
│   │   ├── database.py   # MongoDB connection
│   │   ├── models/       # Data models
│   │   ├── schemas/      # Pydantic request/response models
│   │   └── routes/       # API endpoints
│   ├── requirements.txt
│   ├── .env
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Notes

- All validation (email format, duplicate IDs/emails) handled server-side
- CORS enabled for cross-origin requests
- Attendance records support Present/Absent status
- Deleting an employee removes their attendance history
- UI shows loading, empty, and error states
- Attendance rate calculated from today's records
