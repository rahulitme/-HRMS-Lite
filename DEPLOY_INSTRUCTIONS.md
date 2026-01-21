# HRMS Lite - Deployment Guide

Complete step-by-step guide to deploy HRMS Lite to production.

## ⚡ Quick Start (Local)

### Start Backend
```bash
cd backend
pip install -r requirements.txt
python -c "import uvicorn; uvicorn.run('app.main:app', host='127.0.0.1', port=8000, reload=False)"
```
✅ Backend at: http://localhost:8000
📖 Docs at: http://localhost:8000/docs

### Start Frontend
```bash
cd frontend
npm install
npm run dev
```
✅ Frontend at: http://localhost:5174

---

## 🚀 Deploy to Render (Recommended)

Render offers free tier perfect for this project.

### Step 1: Create Render Account
1. Go to https://render.com
2. Click "Sign up"
3. Choose "Sign up with GitHub"
4. Authorize Render to access your GitHub account

### Step 2: Deploy Backend

1. Click **"New +"** → **"Web Service"**
2. **Connect Repository:**
   - Click "Connect account"
   - Select `HRMS-Lite` repository
   - Click "Connect"
3. **Configure Service:**
   - Name: `hrms-lite-backend`
   - Environment: `Docker`
   - Build Command: (leave empty)
   - Start Command: (leave empty)
   - Plan: `Free`
4. **Environment Variables:**
   - Click "Advanced"
   - Add variable:
     ```
     MONGODB_URL = mongodb+srv://rahulmandal705071_db_user:fViRknWBUdzSx9w7@hrmslite.vrui0oi.mongodb.net/
     ```
   - Add variable:
     ```
     DATABASE_NAME = hrms_lite
     ```
5. Click **"Create Web Service"**
6. Wait for deployment (2-3 minutes)
7. **Note the URL** - e.g., `https://hrms-lite-backend.onrender.com`

### Step 3: Deploy Frontend on Vercel

1. Go to https://vercel.com
2. Click **"Add New..."** → **"Project"**
3. **Import Repository:**
   - Click "Import Git Repository"
   - Paste: `https://github.com/rahulitme/-HRMS-Lite.git`
   - Click "Import"
4. **Configure Project:**
   - Framework Preset: `Vite`
   - Root Directory: `./frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. **Environment Variables:**
   - Click "Environment Variables"
   - Add:
     ```
     Name: VITE_API_BASE_URL
     Value: https://hrms-lite-backend.onrender.com
     ```
   - (Replace with your actual Render backend URL)
6. Click **"Deploy"**
7. Wait for build (1-2 minutes)
8. **Get Frontend URL** - e.g., `https://hrms-lite-frontend.vercel.app`

---

## 🔗 Connect Frontend to Backend

After both are deployed:

1. Go to your Vercel dashboard
2. Select `hrms-lite-frontend` project
3. Click **Settings** → **Environment Variables**
4. Update `VITE_API_BASE_URL`:
   ```
   Value: https://your-render-backend-url.onrender.com
   ```
5. Click **Save and Redeploy**

---

## ✅ Test Deployment

1. Open your Vercel frontend URL
2. Add an employee:
   - Employee ID: `EMP-001`
   - Name: `John Doe`
   - Email: `john@example.com`
   - Department: `Engineering`
3. Click **"+ Add Employee"**
4. Verify employee appears in table
5. Mark attendance for today
6. Verify record appears in attendance table

---

## 📊 Alternative: Railway (Backend + Frontend)

Railway simplifies multi-service deployment.

### Step 1: Create Railway Account
- Go to https://railway.app
- Sign in with GitHub

### Step 2: Create Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Select `HRMS-Lite` repository

### Step 3: Add Backend Service
1. Click **"Add Service"**
2. Select **"GitHub Repo"**
3. Choose backend folder
4. Set Environment Variables:
   ```
   MONGODB_URL=mongodb+srv://rahulmandal705071_db_user:fViRknWBUdzSx9w7@hrmslite.vrui0oi.mongodb.net/
   DATABASE_NAME=hrms_lite
   PORT=8000
   ```
5. Railway auto-deploys

### Step 4: Add Frontend Service
1. Click **"Add Service"**
2. Select **"GitHub Repo"**
3. Choose frontend folder
4. Set Environment Variables:
   ```
   VITE_API_BASE_URL=[your-backend-url-from-railway]
   ```
5. Set Build Command:
   ```
   npm run build
   ```
6. Railway auto-deploys

---

## 🐳 Docker Deployment (Advanced)

### Local Docker Testing

```bash
# Build images
docker-compose build

# Start services
docker-compose up

# Access
# Frontend: http://localhost:5173
# Backend: http://localhost:8000
```

### Deploy Docker to Cloud

**Options:**
- AWS ECS
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform

---

## 🔐 Security Checklist

Before sharing links publicly:

- [ ] HTTPS enabled (automatic on Render/Vercel)
- [ ] MongoDB credentials are not exposed
- [ ] CORS is set to frontend domain only
- [ ] API rate limiting is configured
- [ ] Error messages don't leak sensitive info
- [ ] Database backups are enabled

---

## 📈 Monitoring & Logs

### Render Logs
1. Go to your Render service dashboard
2. Click **"Logs"** tab
3. View real-time logs

### Vercel Logs
1. Go to your Vercel project
2. Click **"Deployments"**
3. Select deployment
4. Click **"Function Logs"** for errors

### MongoDB Atlas Logs
1. Go to https://cloud.mongodb.com
2. Click your project
3. Click **"Monitoring"** tab
4. View performance metrics

---

## 🛠️ Troubleshooting

### Frontend shows "Network Error"
**Solution:**
1. Check backend URL in Vercel environment variables
2. Verify backend is running on Render
3. Test backend directly: `curl https://your-backend-url.com/health`
4. Redeploy frontend after updating env vars

### Backend won't connect to MongoDB
**Solution:**
1. Verify `MONGODB_URL` is correct
2. Go to MongoDB Atlas → Network Access
3. Add Render/Railway IP to whitelist
4. Check credentials are not expired

### Build fails on Vercel
**Solution:**
1. Check Node version is 18+
2. Verify npm scripts in package.json
3. Check for syntax errors: `npm run build` locally
4. Check environment variables are set

### Render backend keeps crashing
**Solution:**
1. View logs: Dashboard → Logs
2. Check for MongoDB connection errors
3. Verify Python version is 3.11+
4. Check requirements.txt is complete

---

## 💡 Performance Tips

### Backend
- Enable Redis caching (optional)
- Add database connection pooling
- Use gzip compression
- Implement request logging

### Frontend
- Enable static asset caching
- Use image optimization
- Lazy load components
- Monitor Core Web Vitals

---

## 📱 Custom Domain (Optional)

### Add Domain to Vercel
1. Go to Vercel project settings
2. Click **"Domains"**
3. Enter your domain
4. Update DNS records
5. Wait for verification

### Add Domain to Render
1. Go to Render service settings
2. Click **"Custom Domains"**
3. Enter your domain
4. Add DNS CNAME record
5. Wait for verification

---

## 🔄 Continuous Deployment

Every push to `master` branch:
1. GitHub Actions runs tests
2. If tests pass, auto-deployment triggers
3. Services update automatically

---

## 📚 Useful Links

- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)

---

## 🎯 Next Steps

1. ✅ Deploy backend to Render
2. ✅ Deploy frontend to Vercel
3. ✅ Connect frontend to backend
4. ✅ Test all features
5. ✅ Share live URLs
6. ✅ Monitor performance
7. ✅ Plan scaling strategy

---

**Deployed!** 🎉

Share your live URLs:
- Frontend: `https://your-frontend.vercel.app`
- Backend: `https://your-backend.onrender.com`
- GitHub: `https://github.com/rahulitme/-HRMS-Lite`
