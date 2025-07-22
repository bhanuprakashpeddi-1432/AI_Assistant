#!/bin/bash

# AI Assistant Integrated Setup Script

echo "🚀 Setting up AI Assistant - Frontend & Backend Integration..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18.0.0 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
REQUIRED_VERSION="18.0.0"

echo "✅ Node.js version $NODE_VERSION detected"

# Navigate to project root
cd "$(dirname "$0")"

echo "📦 Setting up Backend..."
cd backend

# Install backend dependencies
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Backend .env file created from .env.example"
    echo "⚠️  Please edit backend/.env file and add your Google Gemini API key"
else
    echo "✅ Backend .env file already exists"
fi

echo "📦 Setting up Frontend..."
cd ../frontend

# Install frontend dependencies
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

# Create .env.local file if it doesn't exist
if [ ! -f .env.local ]; then
    cp .env.local.example .env.local
    echo "✅ Frontend .env.local file created"
else
    echo "✅ Frontend .env.local file already exists"
fi

echo "🧪 Running tests..."
cd ../backend
npm test
if [ $? -eq 0 ]; then
    echo "✅ Backend tests passed"
else
    echo "⚠️  Some backend tests failed, but setup continues..."
fi

echo ""
echo "🎉 Integrated AI Assistant setup completed!"
echo ""
echo "🔧 Configuration:"
echo "  Backend: http://localhost:5000"
echo "  Frontend: http://localhost:3000"
echo ""
echo "📝 Next steps:"
echo "1. Edit backend/.env file and add your Google Gemini API key:"
echo "   GEMINI_API_KEY=your_api_key_here"
echo ""
echo "2. Start the integrated application:"
echo "   cd frontend && npm run dev:full"
echo ""
echo "   OR start services separately:"
echo "   Terminal 1: cd backend && npm run dev"
echo "   Terminal 2: cd frontend && npm run dev"
echo ""
echo "📚 Available commands (from frontend directory):"
echo "  npm run dev:full     - Start both backend and frontend"
echo "  npm run dev:backend  - Start only backend"
echo "  npm run dev          - Start only frontend"
echo "  npm run build:full   - Build both services"
echo ""
echo "🔗 Integration features:"
echo "  ✅ Frontend proxies to backend API"
echo "  ✅ Streaming responses from backend"
echo "  ✅ Multiple AI modes (explain, debug, translate, optimize)"
echo "  ✅ CORS configured for frontend-backend communication"
echo "  ✅ Rate limiting and security features"
echo ""
