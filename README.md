# HRMS Lite

A lightweight, production-ready Human Resource Management System built with React, FastAPI, and MongoDB. Designed for admin users to manage employee records and track daily attendance.

**Live Demo:** Coming soon (deployment in progress)  
**GitHub:** https://github.com/rahulitme/-HRMS-Lite

## Features

✅ **Employee Management**
- Add employees with unique IDs
- Store full name, email, department
- View all employees in a sortable table
- Delete employees (cascades attendance records)

✅ **Attendance Tracking**
- Mark attendance as Present/Absent
- View attendance history with employee details
- Calculate daily attendance rate
- Track by date and employee

✅ **Professional UI**
- Dark theme with glassmorphic design
- Responsive layout (desktop/tablet/mobile)
- Real-time feedback with toast notifications
- Loading and error states
- Empty state indicators

✅ **Backend Features**
- RESTful API with validation
- Email format validation
- Duplicate employee ID/email prevention
- CORS enabled for cross-origin requests
- Async MongoDB queries

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, TypeScript, CSS3 |
| Backend | FastAPI, Python 3.11+ |
| Database | MongoDB Atlas (Cloud) |
| Deployment | Docker, Docker Compose |

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone Repository
```bash
git clone https://github.com/rahulitme/-HRMS-Lite.git
cd HRMS-Lite
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/Scripts/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure MongoDB (already set in .env)
# Edit .env if using different MongoDB URL
```

Start backend:
```bash
python -c "import uvicorn; uvicorn.run('app.main:app', host='0.0.0.0', port=8000, reload=False)"
```

Backend runs at: **http://localhost:8000**  
API Docs: **http://localhost:8000/docs**

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend runs at: **http://localhost:5173**

### 4. Test Integration

1. Open http://localhost:5173 in your browser
2. Add an employee with ID, name, email, department
3. Mark their attendance
4. View employees and attendance records

## API Endpoints

### Employees
- `GET /employees` - List all employees
- `POST /employees` - Create new employee
- `DELETE /employees/{id}` - Delete employee

### Attendance
- `GET /attendance` - List attendance records
- `GET /attendance?employee_id={id}` - Filter by employee
- `POST /attendance` - Mark attendance

### Health
- `GET /health` - Health check

## Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build

# Services start at:
# Frontend: http://localhost:5173
# Backend: http://localhost:8000
```

## Project Structure

```
HRMS-Lite/
├── frontend/                    # React + Vite application
│   ├── src/
│   │   ├── components/         # Feature & UI components
│   │   │   ├── employees/      # Employee CRUD
│   │   │   ├── attendance/     # Attendance forms & tables
│   │   │   └── common/         # Shared components
│   │   ├── api/                # API client
│   │   ├── types/              # TypeScript definitions
│   │   ├── styles.css          # Dark theme styling
│   │   ├── App.tsx             # Main app component
│   │   └── main.tsx            # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── index.html
│   └── Dockerfile
│
├── backend/                     # FastAPI server
│   ├── app/
│   │   ├── main.py             # Application entry
│   │   ├── config.py           # Settings & env vars
│   │   ├── database.py         # MongoDB connection
│   │   ├── schemas/            # Pydantic models
│   │   │   ├── employee.py
│   │   │   └── attendance.py
│   │   └── routes/             # API endpoints
│   │       ├── employees.py
│   │       └── attendance.py
│   ├── requirements.txt
│   ├── .env
│   ├── .env.example
│   └── Dockerfile
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Environment Variables

### Backend (.env)
```env
MONGODB_URL=mongodb+srv://user:password@cluster.mongodb.net/
DATABASE_NAME=hrms_lite
```

### Frontend (.env.local)
```env
VITE_API_BASE_URL=http://localhost:8000
```

## Validation & Error Handling

- **Email validation**: Standard email format check
- **Duplicate prevention**: Employee ID and email uniqueness
- **Required fields**: All fields mandatory for employee creation
- **HTTP status codes**: Proper error responses (400, 404, 500)
- **User feedback**: Clear error messages in UI

## Performance Features

- Async MongoDB queries with motor
- Efficient filtering and sorting
- Responsive pagination ready
- Optimized React component rendering
- Lazy loading ready
- CORS pre-flight optimization

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- [ ] User authentication & authorization
- [ ] Export to CSV/PDF
- [ ] Bulk attendance import
- [ ] Salary management
- [ ] Leave management
- [ ] Performance analytics
- [ ] Multi-language support
- [ ] Advanced filtering & search

## Troubleshooting

### Backend won't start
```bash
# Check if port 8000 is in use
netstat -ano | findstr :8000
# Kill process if needed
taskkill /F /PID <PID>
```

### MongoDB connection failed
- Verify `MONGODB_URL` in `.env`
- Check MongoDB Atlas network access settings
- Ensure IP is whitelisted

### Frontend can't reach backend
- Verify backend is running on http://localhost:8000
- Check `VITE_API_BASE_URL` in frontend/.env.local
- Check browser console for CORS errors

### Port already in use
```bash
# Frontend (5173)
# Backend (8000)
# Modify port in vite.config.ts or uvicorn command if needed
```

## Security Notes

⚠️ **Development Only:**
- CORS is open (allow all origins)
- No authentication implemented
- Use in production only with proper security setup

🔒 **Production Checklist:**
- [ ] Add authentication (JWT/OAuth)
- [ ] Enable HTTPS
- [ ] Restrict CORS origins
- [ ] Use environment-specific configs
- [ ] Add request rate limiting
- [ ] Implement audit logging
- [ ] Hash sensitive data
- [ ] Use secrets management

## License

MIT License - See LICENSE file for details

## Support

For issues, questions, or feature requests, please open an issue on GitHub:  
https://github.com/rahulitme/-HRMS-Lite/issues

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Push to the branch
5. Create a Pull Request

---

**Created:** January 2026  
**Version:** 1.0.0
