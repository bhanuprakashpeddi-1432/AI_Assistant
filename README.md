# AI-Powered Code Assistant

A modern, full-stack web application that leverages Google's Gemini AI to help developers understand, debug, and translate code in real-time.

## 🚀 Features

- **Code Explanation**: Get detailed explanations of how your code works
- **Bug Detection**: Identify potential issues and receive improvement suggestions
- **Code Translation**: Convert code between different programming languages
- **Real-time Streaming**: Server-Sent Events for live AI responses
- **Modern UI**: Responsive design with Tailwind CSS
- **Production Ready**: Docker containerization and CI/CD pipeline

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern UI library with hooks
- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **React Markdown** - Markdown rendering with syntax highlighting

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Google Gemini AI** - Advanced language model
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Express Rate Limit** - Rate limiting middleware

### DevOps

- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **GitHub Actions** - CI/CD pipeline
- **Nginx** - Reverse proxy and static file serving

## 📁 Project Structure

```
ai-code-assistant/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── services/        # API integration
│   │   └── styles/          # CSS and styling
│   ├── public/              # Static assets
│   └── package.json
├── backend/                 # Node.js backend API
│   ├── routes/             # API route handlers
│   ├── middleware/         # Custom middleware
│   ├── services/           # Business logic
│   └── package.json
├── .github/
│   ├── workflows/          # GitHub Actions CI/CD
│   └── copilot-instructions.md
├── docker-compose.yml      # Development orchestration
├── Dockerfile             # Multi-stage production build
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- **Node.js 18+**
- **npm or yarn**
- **Docker** (optional, for containerized development)
- **Gemini API Key** (get from [Google AI Studio](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ai-code-assistant
   ```

2. **Install dependencies**

   ```bash
   npm run install:all
   ```

3. **Set up environment variables**

   ```bash
   # Backend
   cp backend/.env.example backend/.env
   # Add your Gemini API key to backend/.env

   # Frontend
   cp frontend/.env.example frontend/.env
   ```

4. **Start development servers**

   ```bash
   npm run dev
   ```

   This will start:

   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

### Using Docker

1. **Start with Docker Compose**

   ```bash
   docker-compose up --build
   ```

2. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/health

## 🔧 Configuration

### Environment Variables

#### Backend (.env)

```env
PORT=5000
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key_here
FRONTEND_URL=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=AI Code Assistant
VITE_APP_VERSION=1.0.0
```

## 📡 API Endpoints

### Health Check

```
GET /health
```

### AI Processing

```
POST /api/ai/process
Content-Type: application/json

{
  "code": "console.log('Hello World');",
  "task": "explain|debug|translate",
  "targetLanguage": "Python" // Required for translate task
}
```

### Test Connection

```
GET /api/ai/test
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Backend tests only
cd backend && npm test

# Frontend tests only
cd frontend && npm test

# Run tests in watch mode
npm run test:watch
```

## 🚀 Deployment

### Docker Production Build

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy to production
docker-compose -f docker-compose.prod.yml up -d
```

### GitHub Actions

The project includes a comprehensive CI/CD pipeline that:

- Runs tests and linting
- Performs security scanning
- Builds Docker images
- Deploys to staging and production environments

## 🔒 Security Features

- **Input Validation**: Server-side validation for all inputs
- **Rate Limiting**: API endpoint protection
- **CORS Configuration**: Secure cross-origin requests
- **Security Headers**: Helmet.js integration
- **Environment Variables**: Secure configuration management
- **Docker Security**: Non-root user and minimal base images

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach
- **Real-time Feedback**: Loading states and progress indicators
- **Syntax Highlighting**: Code display with proper formatting
- **Markdown Support**: Rich text rendering for AI responses
- **Accessibility**: WCAG 2.1 compliant interface
- **Dark Mode Ready**: CSS custom properties for theming

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all checks pass in CI/CD pipeline

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` directory for detailed guides
- **Issues**: Report bugs and request features via GitHub Issues
- **Discussions**: Join community discussions in GitHub Discussions

## 🙏 Acknowledgments

- **Google Gemini AI** for providing the AI capabilities
- **React Team** for the amazing frontend framework
- **Express.js** for the robust backend framework
- **Tailwind CSS** for the utility-first styling approach

---

**Built with ❤️ for the developer community**
