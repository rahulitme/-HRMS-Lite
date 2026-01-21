# DEPLOYMENT GUIDE

## Option 1: Render + Vercel (Recommended - Free Tier)

### Backend Deployment on Render

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub account

2. **Deploy Backend**
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Select `HRMS-Lite` repo
   - Choose root directory: `backend`
   - Environment: `Docker`
   - Build command: `(leave default)`
   - Start command: `(leave default)`

3. **Add Environment Variables**
   - Go to "Environment" tab
   - Add:
     ```
     MONGODB_URL=mongodb+srv://rahulmandal705071_db_user:fViRknWBUdzSx9w7@hrmslite.vrui0oi.mongodb.net/
     DATABASE_NAME=hrms_lite
     ```
   - Click "Deploy"

4. **Get Backend URL**
   - After deployment, copy the URL (e.g., https://hrms-backend.onrender.com)

### Frontend Deployment on Vercel

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign in with GitHub

2. **Deploy Frontend**
   - Click "New Project"
   - Select `HRMS-Lite` repository
   - Project name: `hrms-lite-frontend`
   - Framework: `Vite`
   - Root directory: `frontend`
   - Build command: `npm run build`
   - Output directory: `dist`

3. **Add Environment Variables**
   - Under "Environment Variables":
     ```
     VITE_API_BASE_URL=https://hrms-backend.onrender.com
     ```
   - (Replace with your actual Render backend URL)

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

5. **Get Frontend URL**
   - After deployment, you'll have https://hrms-lite-frontend.vercel.app

---

## Option 2: Railway (Backend + Frontend in One)

### Deploy Both on Railway

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign in with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `HRMS-Lite`

3. **Add Services**

   **Backend Service:**
   - Add from repo (select backend)
   - Root directory: `backend`
   - Environment variables:
     ```
     MONGODB_URL=mongodb+srv://rahulmandal705071_db_user:fViRknWBUdzSx9w7@hrmslite.vrui0oi.mongodb.net/
     DATABASE_NAME=hrms_lite
     PORT=8000
     ```

   **Frontend Service:**
   - Add from repo (select frontend)
   - Root directory: `frontend`
   - Build command: `npm run build && npm run preview`
   - Environment variables:
     ```
     VITE_API_BASE_URL=[BACKEND_URL]
     ```

4. **Deploy**
   - Railway deploys automatically

---

## Option 3: Heroku (Legacy but Free Credits)

### Deploy Backend on Heroku

1. **Install Heroku CLI**
   ```bash
   choco install heroku-cli
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create App**
   ```bash
   heroku create hrms-lite-backend
   ```

4. **Add Environment Variables**
   ```bash
   heroku config:set MONGODB_URL="mongodb+srv://rahulmandal705071_db_user:fViRknWBUdzSx9w7@hrmslite.vrui0oi.mongodb.net/"
   heroku config:set DATABASE_NAME="hrms_lite"
   ```

5. **Deploy**
   ```bash
   cd backend
   git push heroku master
   ```

6. **View Logs**
   ```bash
   heroku logs --tail
   ```

### Deploy Frontend on Netlify

1. **Connect GitHub to Netlify**
   - Go to https://netlify.com
   - Click "New site from Git"
   - Select GitHub, choose `HRMS-Lite`

2. **Configure Build**
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Add Environment Variable**
   - In "Build & Deploy" → "Environment":
     ```
     VITE_API_BASE_URL=https://hrms-lite-backend.herokuapp.com
     ```

4. **Deploy**

---

## Local Testing Before Deployment

### Start Backend Locally
```bash
cd backend
python -c "import uvicorn; uvicorn.run('app.main:app', host='0.0.0.0', port=8000, reload=False)"
```

API available at: http://localhost:8000
Docs at: http://localhost:8000/docs

### Start Frontend Locally
```bash
cd frontend
npm install
npm run dev
```

Frontend available at: http://localhost:5173

### Test Integration
1. Open http://localhost:5173
2. Add an employee
3. Mark attendance
4. Verify data appears in tables

---

## Post-Deployment Checklist

- [ ] Backend API is accessible
- [ ] Frontend loads without errors
- [ ] Frontend can reach backend API
- [ ] Create employee works
- [ ] View employees displays data
- [ ] Mark attendance works
- [ ] Delete employee works
- [ ] Attendance records show correctly

---

## Troubleshooting

### Backend won't start
```bash
# Check logs on Render/Railway/Heroku dashboard
# Verify MONGODB_URL is correct
# Check MongoDB Atlas network access settings
```

### Frontend shows "Network Error"
- Verify `VITE_API_BASE_URL` environment variable is set
- Check CORS in backend (should allow all origins)
- Test backend URL directly in browser

### Build failures
- Check Node/Python versions match requirements
- Verify all dependencies in package.json and requirements.txt
- Check for missing environment variables

---

## Performance Optimization

### Backend
- Enable caching headers
- Add request rate limiting
- Use connection pooling for MongoDB

### Frontend
- Enable gzip compression
- Use CDN for static assets
- Minify JavaScript/CSS

---

## Security for Production

⚠️ **Before going public:**

1. **Enable HTTPS** (automatic on Render/Vercel/Railway/Heroku)
2. **Add Authentication**
   - Implement JWT or OAuth2
   - Add user login
3. **Restrict CORS**
   - Only allow frontend domain
4. **Rate Limiting**
   - Add to backend API
5. **Database**
   - Create dedicated MongoDB user
   - Use IP whitelist
   - Enable encryption
6. **Secrets Management**
   - Never commit .env files
   - Use platform's secret management
   - Rotate credentials regularly

---

## Monitoring & Logging

- **Render/Railway**: Built-in logs in dashboard
- **Vercel**: Analytics and error tracking
- **MongoDB Atlas**: Real-time performance monitoring
- Consider adding: Sentry, LogRocket, or New Relic

---

## Cost Estimates (as of Jan 2026)

| Service | Tier | Cost |
|---------|------|------|
| Render | Free | $0/month |
| Vercel | Free | $0/month |
| Railway | Free Trial | $5/month after trial |
| MongoDB Atlas | Free | $0/month (up to 512MB) |
| **Total** | | **$0-5/month** |

---

## Next Steps

1. Choose deployment option (Render + Vercel recommended)
2. Set up accounts
3. Follow deployment steps above
4. Test in production
5. Share live URLs
6. Monitor logs and performance
7. Plan scaling strategy

---

For help:
- Render docs: https://render.com/docs
- Vercel docs: https://vercel.com/docs
- Railway docs: https://docs.railway.app
- FastAPI deployment: https://fastapi.tiangolo.com/deployment/
