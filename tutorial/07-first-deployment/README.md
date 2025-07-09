# Day 7: first-deployment

## 🎯 Goal

Deploy Milestone 1 of the application, including frontend and backend to Render.com for a complete production deployment.

## 📚 Learning Outcomes

- Deploy React application to Render Static Site
- Deploy Flask backend to Render Web Service
- Configure production environment with PostgreSQL database
- Set up environment variables for production
- Implement CORS for production cross-origin requests
- Configure database connections for cloud deployment
- Debug common deployment issues

## 🚀 Getting Started

Ensure your **Day 6 Posts Listing** is complete and tested. You should have a **Render.com account** and your code pushed to GitHub.

## 🛠️ Tasks

### Create and Switch to a New Branch

> **IMPORTANT:** Always create a new branch for each distinct piece of work.

```bash
# First, ensure you are on your 'master' branch and it's up-to-date
git checkout master
git pull origin master  # Get any potential updates from your own repository's master

# Now, create and switch to a new branch for this day's assignment/feature
git checkout -b day-7-deployment
```

> **What's happening?** You're creating an independent line of development for this day's tasks.

### Prepare Your Code for Deployment

#### Update API Configuration for Production

Before deploying, update your frontend API configuration to use environment variables:

```typescript
// In all API files (auth/api.ts, profile/api.ts, etc.)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
```

#### Update Backend CORS Configuration

Update your backend to allow production origins:

```python
# In main.py
ALLOWED_ORIGINS = os.getenv('ALLOWED_ORIGINS', 'http://localhost:5173,http://127.0.0.1:5173,https://your-frontend-url.onrender.com').split(',')

CORS(app,
     origins=ALLOWED_ORIGINS,
     methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
     allow_headers=['Content-Type', 'Authorization', 'X-Requested-With'],
     supports_credentials=True,
     max_age=3600)
```

#### Update Database Configuration

Ensure your backend can connect to cloud databases:

```python
# In config.py
DATABASE_URL = os.environ.get('DATABASE_URL')
if DATABASE_URL and DATABASE_URL.startswith('postgres://'):
    DATABASE_URL = DATABASE_URL.replace('postgres://', 'postgresql://', 1)

SQLALCHEMY_DATABASE_URI = DATABASE_URL or 'mysql://root:password@localhost/prok_db?charset=utf8mb4'
```

### Backend Deployment (Render Web Service)

#### 1. Create PostgreSQL Database

1. Go to [Render.com](https://render.com) and sign up/login
2. Click **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name**: `prok-database`
   - **Database**: `prok_db`
   - **User**: `prok_user`
   - **Region**: Choose closest to you
4. Click **"Create Database"**

#### 2. Deploy Backend Service

1. Click **"New +"** → **"Web Service"**
2. **Connect your GitHub repository**
3. **Choose branch**: `day-7-deployment`
4. **Configure the service**:

**Basic Settings:**

- **Name**: `prok-backend`
- **Root Directory**: `app/backend`
- **Runtime**: `Python 3`
- **Build Command**:
  ```bash
  pip install -r requirements.txt
  ```
- **Start Command**:
  ```bash
  gunicorn main:app
  ```

**Environment Variables:**

- `FLASK_ENV`: `production`
- `PYTHON_VERSION`: `3.10.12`
- `DATABASE_URL`: Copy from your PostgreSQL service
- `SECRET_KEY`: Generate a secure random string
- `JWT_SECRET_KEY`: Generate a secure random string

#### 3. Click "Create Web Service"

### Frontend Deployment (Render Static Site)

#### 1. Deploy Frontend Service

1. Click **"New +"** → **"Static Site"**
2. **Connect your GitHub repository**
3. **Choose branch**: `day-7-deployment`

**Configure the service:**

- **Name**: `prok-frontend`
- **Root Directory**: `app/frontend`
- **Build Command**:
  ```bash
  npm install && npm run build
  ```
- **Publish Directory**: `dist`

**Environment Variables:**

- `VITE_API_URL`: `https://your-backend-url.onrender.com`

#### 2. Click "Create Static Site"

### Production Configuration

#### Update Frontend Environment Variable

1. **Go to your frontend service on Render**
2. **Go to Environment tab**
3. **Add/Update**: `VITE_API_URL` = `https://your-backend-url.onrender.com`

#### Test Your Deployment

1. **Wait for both services to deploy** (2-3 minutes each)
2. **Test backend**: Visit `https://your-backend-url.onrender.com/api/test`
3. **Test frontend**: Visit your frontend URL
4. **Test signup/login** functionality

### Common Issues and Solutions

#### 1. CORS Errors

**Error**: `Access to fetch at '...' has been blocked by CORS policy`
**Solution**: Update CORS configuration to include your frontend URL

#### 2. Database Connection Errors

**Error**: `Can't connect to local server through socket`
**Solution**: Use cloud database (PostgreSQL) instead of local MySQL

#### 3. Missing Database Tables

**Error**: `relation "users" does not exist`
**Solution**: Ensure `db.create_all()` is called on app startup

#### 4. API URL Issues

**Error**: `Failed to load resource: net::ERR_CONNECTION_REFUSED`
**Solution**: Update frontend to use environment variables for API URLs

### Testing

- ✅ Test **production build and deployment**
- ✅ Test **API endpoints** from frontend to backend
- ✅ Test **database operations** (signup, login)
- ✅ Test **CORS configuration**
- ✅ Test **environment variables**

## 🔄 Git Workflow

### Develop and Save Your Progress

```bash
git add .
git commit -m "Day 7: Deploy milestone 1 to production with Render"
```

### Push Your Changes to Your Repository

```bash
git push -u origin day-7-deployment
```

### Merge After Completion

```bash
git checkout master
git pull origin master
git merge day-7-deployment
git push origin master
```

## Overview

> This module marks your first full-cycle deployment, from code to cloud using Render.com. It covers real-world deployment challenges including database setup, CORS configuration, and environment variable management. Use this as a reference for future deployments.

## ✅ Deliverable

A fully deployed application with:

- Frontend live on **Render Static Site**
- Backend live on **Render Web Service**
- PostgreSQL database on **Render**
- Proper **CORS and environment configuration**
- All **API endpoints working** in production
- Clean, **documented deployment steps**

## 🎯 Key Takeaways

1. **Environment Variables**: Essential for production configuration
2. **Database Setup**: Cloud databases are required for production
3. **CORS Configuration**: Must include production frontend URLs
4. **API URL Management**: Use environment variables for flexibility
5. **Error Debugging**: Check logs and test endpoints systematically
