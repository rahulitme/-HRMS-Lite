# 🚀 HRMS Lite - Quick Deployment

## Backend URLs to Remember
- **Local**: http://localhost:8000
- **Render**: https://hrms-lite-backend.onrender.com (example)
- **API Docs**: {your-backend-url}/docs

## Frontend URLs
- **Local**: http://localhost:5174
- **Vercel**: https://hrms-lite-frontend.vercel.app (example)

## ⚡ 5-Minute Deployment

### Render (Backend)
1. https://render.com → Sign in with GitHub
2. "New +" → "Web Service"
3. Connect `HRMS-Lite` repo
4. Set environment:
   - `MONGODB_URL` = your connection string
   - `DATABASE_NAME` = hrms_lite
5. Deploy ✅

### Vercel (Frontend)
1. https://vercel.com → Sign in with GitHub
2. "Add New" → "Project"
3. Import `HRMS-Lite` repo
4. Root: `./frontend`
5. Add env: `VITE_API_BASE_URL` = your Render URL
6. Deploy ✅

## Environment Variables

### Backend (.env or Render dashboard)
```
MONGODB_URL=mongodb+srv://rahulmandal705071_db_user:fViRknWBUdzSx9w7@hrmslite.vrui0oi.mongodb.net/
DATABASE_NAME=hrms_lite
```

### Frontend (.env.local or Vercel dashboard)
```
VITE_API_BASE_URL=https://hrms-lite-backend.onrender.com
```

## Test Checklist
- [ ] Frontend loads
- [ ] Can add employee
- [ ] Can view employees
- [ ] Can mark attendance
- [ ] Can view attendance
- [ ] Can delete employee

## Common Issues

| Issue | Fix |
|-------|-----|
| "Network Error" | Check VITE_API_BASE_URL matches backend URL |
| MongoDB error | Verify MONGODB_URL and IP whitelist |
| Build fails | Check Node 18+, npm dependencies |
| Backend crash | Check logs in Render dashboard |

## GitHub Repository
https://github.com/rahulitme/-HRMS-Lite

## MongoDB Credentials
User: `rahulmandal705071_db_user`
Database: `hrms_lite`
(Connection string in backend .env)

## Support
- Full guide: See `DEPLOY_INSTRUCTIONS.md`
- Local setup: See `README.md`
- Issues: Check GitHub Actions logs
