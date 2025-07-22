# Troubleshooting Guide

## 🚨 Common Issues and Solutions

### 1. API Key Issues

#### Error: "API key not valid"
```
Chat API error: API key not valid. Please pass a valid API key.
```

**Solution:**
1. **Get a valid API key:**
   - Visit https://ai.google.dev/
   - Sign in with your Google account
   - Create a new API key for Gemini
   - Copy the key (starts with `AIzaSy...`)

2. **Configure the API key:**
   ```bash
   # Open backend/.env file
   # Replace the placeholder with your real key:
   GEMINI_API_KEY=AIzaSyYourActualApiKeyHere
   ```

3. **Test your API key:**
   ```bash
   cd backend
   npm run test:api
   ```

#### Error: "GEMINI_API_KEY not found"
The `.env` file is missing or the API key variable is not set.

**Solution:**
```bash
# Make sure backend/.env exists with:
PORT=5000
NODE_ENV=development
GEMINI_API_KEY=your_actual_api_key_here
FRONTEND_URL=http://localhost:3000
```

### 2. HTTP Protocol Errors

#### Error: "Response does not match the HTTP/1.1 protocol"
```
Response does not match the HTTP/1.1 protocol (Content-Length can't be present with Transfer-Encoding)
```

**Cause:** Conflict between streaming headers and error responses.

**Solution:** This has been fixed in the latest code. Make sure you have the updated version.

### 3. Connection Issues

#### Error: "fetch failed" or "ECONNREFUSED"
The backend server is not running or not accessible.

**Solution:**
1. **Start the backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Check if backend is running:**
   - Open http://localhost:5000/api/health
   - Should see: `{"status":"OK","timestamp":"...","uptime":...}`

3. **Start both frontend and backend:**
   ```bash
   cd frontend
   npm run dev:full
   ```

#### Error: "CORS policy"
Frontend and backend are running on different ports and CORS is blocking requests.

**Solution:** Ensure `FRONTEND_URL=http://localhost:3000` is set in `backend/.env`

### 4. Port Conflicts

#### Error: "Port 5000 is already in use"
Another application is using port 5000.

**Solution:**
1. **Find what's using the port:**
   ```bash
   # Windows
   netstat -ano | findstr :5000
   
   # macOS/Linux
   lsof -i :5000
   ```

2. **Change the port:**
   ```bash
   # In backend/.env
   PORT=5001
   
   # In frontend/.env.local
   BACKEND_URL=http://localhost:5001
   ```

### 5. Dependencies Issues

#### Error: "Module not found" or import errors
Missing or incorrectly installed dependencies.

**Solution:**
```bash
# Reinstall dependencies
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

### 6. Environment Configuration

#### Frontend can't reach backend
Environment variables are not properly configured.

**Solution:**
1. **Check frontend/.env.local:**
   ```bash
   BACKEND_URL=http://localhost:5000
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

2. **Check backend/.env:**
   ```bash
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   GEMINI_API_KEY=your_actual_api_key_here
   ```

3. **Restart both services:**
   ```bash
   cd frontend
   npm run dev:full
   ```

## 🔧 Debugging Steps

### Step 1: Test API Key
```bash
cd backend
npm run test:api
```

### Step 2: Test Backend Health
```bash
# Start backend
cd backend
npm run dev

# In another terminal, test health endpoint
curl http://localhost:5000/api/health
```

### Step 3: Test Frontend-Backend Connection
```bash
# Start both services
cd frontend
npm run dev:full

# Open browser to http://localhost:3000
# Send a test message in the chat
```

### Step 4: Check Logs
Monitor the terminal output for both frontend and backend for error messages.

## 🆘 Getting Help

If you're still having issues:

1. **Check the logs** in both frontend and backend terminals
2. **Verify all environment variables** are set correctly
3. **Test the API key** with the test script
4. **Try restarting** both services
5. **Check firewall/antivirus** if connection issues persist

## 📋 Quick Checklist

- [ ] Valid Google Gemini API key obtained
- [ ] API key set in `backend/.env`
- [ ] Both frontend and backend dependencies installed
- [ ] Backend health endpoint responding
- [ ] Frontend environment variables configured
- [ ] Both services running on correct ports
- [ ] No port conflicts
- [ ] Firewall/antivirus not blocking connections

## 🎯 Test Commands

```bash
# Test everything in order:

# 1. Test API key
cd backend && npm run test:api

# 2. Test backend health
curl http://localhost:5000/api/health

# 3. Start integrated development
cd frontend && npm run dev:full

# 4. Open browser to http://localhost:3000
```
