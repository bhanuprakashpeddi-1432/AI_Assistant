# AI Assistant Backend

A robust Node.js and Express.js backend for the AI-powered code assistant application.

## 🚀 Features

- **RESTful API** - Clean REST endpoints for chat and health monitoring
- **Google Gemini Integration** - Advanced AI responses using Google's Gemini Pro model
- **Streaming Responses** - Real-time streaming for better user experience
- **Rate Limiting** - Protection against abuse with configurable limits
- **Error Handling** - Comprehensive error handling and logging
- **Security** - Helmet, CORS, input validation, and sanitization
- **Health Monitoring** - Detailed health checks and system monitoring
- **Multiple Chat Modes** - Specialized modes for different use cases

## 📋 Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager
- Google Gemini API key

## 🛠️ Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd AI_assistant/backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment setup**:
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** in `.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   GEMINI_API_KEY=your_gemini_api_key_here
   FRONTEND_URL=http://localhost:3000
   ```

## 🚀 Getting Started

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
npm run lint:fix
```

## 📡 API Endpoints

### Health Check
- **GET** `/api/health` - Basic health check
- **GET** `/api/health/detailed` - Detailed system information

### Chat API
- **POST** `/api/chat` - Send message to AI (streaming response)
- **POST** `/api/chat/analyze` - Analyze code (non-streaming response)
- **GET** `/api/chat/modes` - Get available chat modes

### Chat Modes

| Mode | Description | Use Case |
|------|-------------|----------|
| `explain` | Code explanation | Understanding how code works |
| `bugs` | Bug detection | Finding and fixing issues |
| `translate` | Language translation | Converting between languages |
| `optimize` | Code optimization | Performance improvements |
| `general` | General chat | Basic programming assistance |

## 📝 API Usage Examples

### Send Chat Message
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Explain this React component",
    "mode": "explain",
    "conversationHistory": []
  }'
```

### Analyze Code
```bash
curl -X POST http://localhost:5000/api/chat/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "message": "function factorial(n) { return n <= 1 ? 1 : n * factorial(n - 1); }",
    "mode": "optimize"
  }'
```

### Health Check
```bash
curl http://localhost:5000/api/health
```

## 🏗️ Project Structure

```
backend/
├── server.js                 # Main server entry point
├── package.json              # Dependencies and scripts
├── .env.example              # Environment variables template
├── routes/
│   ├── chat.js              # Chat API routes
│   └── health.js            # Health check routes
├── services/
│   └── geminiService.js     # Google Gemini integration
├── middleware/
│   ├── errorHandler.js      # Global error handling
│   ├── notFound.js          # 404 handler
│   └── rateLimiter.js       # Rate limiting configuration
└── utils/
    ├── validation.js        # Input validation utilities
    └── logger.js           # Logging utilities
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment mode | development |
| `GEMINI_API_KEY` | Google Gemini API key | Required |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | 900000 (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |

### Rate Limiting

- **General API**: 100 requests per 15 minutes
- **Chat endpoints**: 20 requests per minute
- **Resource-intensive**: 5 requests per 5 minutes

## 🛡️ Security Features

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Request throttling
- **Input Validation** - Request validation and sanitization
- **Error Handling** - Safe error responses without exposing internals

## 📊 Monitoring

### Health Endpoints

The `/api/health` endpoint provides:
- Server status
- Uptime information
- Memory usage
- Environment details
- Dependency status

### Logging

Structured JSON logging with different levels:
- **ERROR** - Error messages
- **WARN** - Warning messages
- **INFO** - General information
- **DEBUG** - Debug information

## 🚀 Deployment

### Production Checklist

1. Set `NODE_ENV=production`
2. Configure proper `GEMINI_API_KEY`
3. Set appropriate `FRONTEND_URL`
4. Configure rate limiting for production traffic
5. Set up process manager (PM2, Docker, etc.)
6. Configure reverse proxy (Nginx, Apache)
7. Set up SSL/TLS certificates

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🤝 API Integration

### Frontend Integration

Update your frontend to use the backend API:

```javascript
// Chat API call
const response = await fetch('http://localhost:5000/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: 'Your code here',
    mode: 'explain',
    conversationHistory: []
  })
});
```

## 📈 Performance

- **Streaming responses** for real-time user experience
- **Request validation** to prevent invalid requests
- **Rate limiting** to prevent abuse
- **Compression** for reduced payload sizes
- **Efficient error handling** for better performance

## 🔍 Troubleshooting

### Common Issues

1. **Gemini API Key not working**
   - Verify API key is correct
   - Check API key permissions
   - Ensure billing is enabled

2. **CORS errors**
   - Check `FRONTEND_URL` configuration
   - Verify origin in browser requests

3. **Rate limiting issues**
   - Adjust rate limits in development
   - Check IP-based limiting

## 📚 Additional Resources

- [Google Gemini API Documentation](https://ai.google.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## 📄 License

MIT License - see LICENSE file for details.
