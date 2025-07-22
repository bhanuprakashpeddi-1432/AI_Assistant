# AI Assistant - Frontend & Backend Integration

This document explains how the frontend and backend work together to create a seamless AI-powered code assistant experience.

## 🏗️ Architecture Overview

```
┌─────────────────┐    HTTP/WebSocket    ┌─────────────────┐    HTTP/gRPC    ┌─────────────────┐
│                 │ ────────────────────▶ │                 │ ───────────────▶ │                 │
│   Frontend      │                       │   Backend       │                 │  Google Gemini  │
│   (Next.js)     │ ◀──────────────────── │   (Node.js)     │ ◀─────────────── │     AI API      │
│                 │    Streaming JSON     │                 │   AI Responses   │                 │
└─────────────────┘                       └─────────────────┘                  └─────────────────┘
```

## 🔄 Integration Flow

### 1. **Frontend (Next.js)**
- **Location**: `frontend/app/api/chat/route.ts`
- **Role**: Proxy layer between UI and backend
- **Functionality**:
  - Receives messages from React UI
  - Determines AI mode from message content
  - Forwards requests to Node.js backend
  - Streams responses back to frontend

### 2. **Backend (Node.js + Express)**
- **Location**: `backend/server.js` + `backend/routes/chat.js`
- **Role**: Main API server with AI integration
- **Functionality**:
  - Handles API requests from frontend
  - Integrates with Google Gemini Pro
  - Provides streaming responses
  - Implements security, rate limiting, validation

### 3. **AI Service (Google Gemini)**
- **Location**: `backend/services/geminiService.js`
- **Role**: AI processing and response generation
- **Functionality**:
  - Processes different AI modes
  - Generates intelligent code assistance
  - Streams real-time responses

## 🛠️ Configuration

### Environment Variables

#### Backend (`.env`)
```bash
PORT=5000
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key_here
FRONTEND_URL=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Frontend (`.env.local`)
```bash
BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🚀 Development Workflow

### Starting Both Services
```bash
# Option 1: Integrated start (from frontend directory)
cd frontend
npm run dev:full

# Option 2: Separate terminals
# Terminal 1
cd backend
npm run dev

# Terminal 2  
cd frontend
npm run dev
```

### Service URLs
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 📡 API Communication

### Request Flow
```javascript
// 1. Frontend UI sends message
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ messages })
});

// 2. Frontend API proxy forwards to backend
const backendResponse = await fetch('http://localhost:5000/api/chat', {
  method: 'POST',
  body: JSON.stringify({ message, mode, conversationHistory })
});

// 3. Backend processes with Gemini AI
const stream = await createChatStream({ message, mode, genAI });

// 4. Streaming response back through proxy
```

### AI Modes Integration
The system automatically detects AI modes from message content:

| Mode | Trigger Words | Backend Processing |
|------|---------------|-------------------|
| `explain` | "explain", "how does", "what is" | Code explanation with detailed analysis |
| `bugs` | "bug", "error", "fix", "debug" | Bug detection and fix recommendations |
| `translate` | "translate", "convert", "change to" | Language translation between programming languages |
| `optimize` | "optimize", "improve", "performance" | Code optimization and best practices |
| `general` | *default* | General programming assistance |

## 🔒 Security Features

### Frontend Security
- **CORS Configuration**: Only allows requests from configured origins
- **Input Validation**: Client-side validation before sending to backend
- **Error Handling**: Safe error responses without exposing internals

### Backend Security
- **Helmet**: Security headers
- **Rate Limiting**: Prevents abuse (100 requests per 15 minutes)
- **Input Sanitization**: Validates and sanitizes all inputs
- **API Key Protection**: Gemini API key stored securely in backend

## 🏃‍♂️ Performance Optimizations

### Streaming Responses
- **Real-time Updates**: Users see responses as they're generated
- **Better UX**: No waiting for complete response
- **Reduced Latency**: Immediate feedback

### Efficient Communication
- **Proxy Pattern**: Minimal frontend API surface
- **Conversation History**: Smart context management
- **Connection Pooling**: Reused HTTP connections

## 🧪 Testing Integration

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests  
```bash
cd frontend
npm run test
```

### End-to-End Testing
```bash
# Start both services
cd frontend && npm run dev:full

# Test the integration
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"explain this code"}]}'
```

## 🐛 Troubleshooting

### Common Issues

#### 1. **CORS Errors**
```
Access to fetch at 'http://localhost:5000' from origin 'http://localhost:3000' has been blocked
```
**Solution**: Verify `FRONTEND_URL` in backend `.env` matches frontend URL

#### 2. **Backend Connection Failed**
```
fetch failed: connect ECONNREFUSED 127.0.0.1:5000
```
**Solution**: 
- Ensure backend is running: `cd backend && npm run dev`
- Check `BACKEND_URL` in frontend `.env.local`

#### 3. **Gemini API Errors**
```
Error: API key not configured
```
**Solution**: Add valid `GEMINI_API_KEY` to backend `.env`

#### 4. **Streaming Issues**
```
Stream ended unexpectedly
```
**Solution**: Check network connectivity and API rate limits

### Debug Mode
Enable debug logging:
```bash
# Backend
LOG_LEVEL=DEBUG npm run dev

# Frontend  
DEBUG=1 npm run dev
```

## 📊 Monitoring

### Health Checks
- **Backend Health**: http://localhost:5000/api/health
- **Detailed Health**: http://localhost:5000/api/health/detailed

### Logging
- **Backend Logs**: Structured JSON logging with levels
- **Frontend Logs**: Browser console with detailed errors
- **Performance**: Request timing and memory usage

## 🚀 Deployment

### Production Configuration

#### Backend
```bash
NODE_ENV=production
PORT=5000
GEMINI_API_KEY=prod_api_key
FRONTEND_URL=https://yourdomain.com
```

#### Frontend
```bash
BACKEND_URL=https://api.yourdomain.com
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
```

### Docker Deployment
```dockerfile
# Multi-service Docker Compose
version: '3.8'
services:
  backend:
    build: ./backend
    ports: ["5000:5000"]
    environment:
      - GEMINI_API_KEY=${GEMINI_API_KEY}
  
  frontend:  
    build: ./frontend
    ports: ["3000:3000"]
    environment:
      - BACKEND_URL=http://backend:5000
```

## 🔄 API Reference

### Chat Endpoint
```
POST /api/chat
Content-Type: application/json

{
  "messages": [
    {"role": "user", "content": "explain this code"}
  ]
}

Response: Server-Sent Events (text/event-stream)
data: {"content": "This code..."}
data: [DONE]
```

### Health Endpoint
```
GET /api/health

Response:
{
  "status": "OK",
  "timestamp": "2025-01-XX...",
  "uptime": 3600,
  "memory": {...}
}
```

This integration provides a robust, scalable, and secure foundation for your AI-powered code assistant! 🎉
