# AI-Powered Code Assistant

A comprehensive full-stack application featuring an AI-powered code assistant with specialized modes for code explanation, bug detection, language translation, and optimization.

## 🌟 Features

- **🧠 AI-Powered Analysis** - Google Gemini Pro integration for intelligent code assistance
- **🔍 Code Explanation** - Detailed breakdowns of code functionality and concepts  
- **🐛 Bug Detection** - Identify and fix coding issues with specific recommendations
- **🔄 Language Translation** - Convert code between programming languages
- **⚡ Code Optimization** - Performance improvements and best practices
- **💬 Real-time Streaming** - Live responses as the AI processes your request
- **🎨 Modern UI** - Clean, responsive interface built with Next.js and Tailwind CSS
- **🔒 Security** - Rate limiting, input validation, and secure API handling
- **📱 Responsive Design** - Works perfectly on desktop and mobile devices

## 🏗️ Architecture

```
Frontend (Next.js)  ←→  Backend (Node.js/Express)  ←→  Google Gemini AI
     Port 3000              Port 5000                    Cloud API
```

### Frontend
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS + Shadcn/ui components
- **AI Integration**: Streaming responses with custom hooks
- **TypeScript**: Full type safety

### Backend  
- **Runtime**: Node.js with Express.js
- **AI Service**: Google Gemini Pro API
- **Security**: Helmet, CORS, rate limiting
- **Features**: Streaming responses, multiple AI modes, health monitoring

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0.0 or higher
- Google Gemini API key ([Get one here](https://ai.google.dev/))

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd AI_assistant
   ```

2. **Run the setup script**:
   ```bash
   # Windows
   setup.bat
   
   # Linux/macOS  
   chmod +x setup.sh
   ./setup.sh
   ```

3. **Configure API key**:
   Edit `backend/.env` and add your Gemini API key:
   ```bash
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Start the application**:
   ```bash
   cd frontend
   npm run dev:full
   ```

5. **Open your browser**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🎯 Usage

### AI Modes

The assistant automatically detects the mode based on your message:

| Mode | Description | Trigger Words | Example |
|------|-------------|---------------|---------|
| **Explain** | Code explanation and concepts | "explain", "how does", "what is" | "Explain this React hook" |
| **Debug** | Bug detection and fixes | "bug", "error", "fix", "debug" | "Find bugs in this function" |
| **Translate** | Language conversion | "translate", "convert", "change to" | "Convert this Python to JavaScript" |
| **Optimize** | Performance improvements | "optimize", "improve", "performance" | "Optimize this algorithm" |
| **General** | General programming help | *default* | "How do I implement authentication?" |

### Example Interactions

#### Code Explanation
```
You: "Explain this React component"
[Paste your React code]

AI: Provides detailed explanation of component structure, props, state management, etc.
```

#### Bug Detection  
```
You: "Find bugs in this function"
[Paste your code]

AI: Identifies issues like memory leaks, security vulnerabilities, logic errors, etc.
```

#### Language Translation
```
You: "Convert this Python code to JavaScript"
[Paste Python code]

AI: Provides equivalent JavaScript code with explanations of differences
```

## 🛠️ Development

### Project Structure
```
AI_Assistant/
├── frontend/                 # Next.js frontend application
│   ├── app/
│   │   ├── api/chat/         # API proxy to backend
│   │   ├── components/       # React components
│   │   └── page.tsx         # Main chat interface
│   └── package.json
├── backend/                  # Node.js backend API
│   ├── routes/              # API routes
│   ├── services/            # AI integration services  
│   ├── middleware/          # Security and validation
│   ├── utils/               # Utility functions
│   └── server.js           # Main server file
├── setup.sh                # Linux/macOS setup script
├── setup.bat               # Windows setup script
└── INTEGRATION.md          # Detailed integration guide
```

### Available Scripts

#### Integrated Development
```bash
npm run dev:full      # Start both frontend and backend
npm run build:full    # Build both services
```

#### Individual Services
```bash
# Frontend only
cd frontend
npm run dev

# Backend only  
cd backend
npm run dev
```

#### Testing
```bash
# Backend tests
cd backend
npm test

# Frontend linting
cd frontend
npm run lint
```

## 🔧 Configuration

### Environment Variables

#### Backend (`backend/.env`)
```bash
PORT=5000
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key_here
FRONTEND_URL=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Frontend (`frontend/.env.local`)  
```bash
BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📡 API Reference

### Chat Endpoint
```http
POST /api/chat
Content-Type: application/json

{
  "messages": [
    {"role": "user", "content": "Your message here"}
  ]
}
```

### Health Check
```http
GET /api/health

Response:
{
  "status": "OK",
  "timestamp": "2025-01-XX...",
  "uptime": 3600
}
```

## 🔒 Security Features

- **Rate Limiting**: 100 requests per 15 minutes
- **Input Validation**: Comprehensive request validation
- **CORS Protection**: Configured for frontend-backend communication
- **Error Handling**: Safe error responses
- **API Key Security**: Backend-only API key storage

## 📊 Performance

- **Streaming Responses**: Real-time AI responses
- **Efficient Communication**: Optimized frontend-backend integration
- **Memory Management**: Smart conversation history handling
- **Error Recovery**: Robust error handling and recovery

## 🚀 Deployment

### Local Development
```bash
# Start development environment
npm run dev:full
```

### Production Build
```bash
# Build for production
npm run build:full
```

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up --build
```

## 🐛 Troubleshooting

### Common Issues

1. **Backend not starting**: Check if port 5000 is available
2. **CORS errors**: Verify `FRONTEND_URL` in backend `.env`
3. **API key issues**: Ensure valid `GEMINI_API_KEY` is set
4. **Dependencies**: Run `npm install` in both frontend and backend directories

### Debug Mode
```bash
# Enable debug logging
LOG_LEVEL=DEBUG npm run dev
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes  
4. Add tests for new functionality
5. Submit a pull request

## 📚 Documentation

- [Integration Guide](INTEGRATION.md) - Detailed frontend-backend integration
- [Backend API](backend/README.md) - Backend documentation
- [Frontend Guide](frontend/README.md) - Frontend documentation

## 📄 License

MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- Google Gemini AI for powerful language processing
- Next.js team for the excellent React framework
- Express.js community for the robust backend framework
- Tailwind CSS for beautiful styling
- All open source contributors

---

**Built with ❤️ Bhanuprakash Peddi**
