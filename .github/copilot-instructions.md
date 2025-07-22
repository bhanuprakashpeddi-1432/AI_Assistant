<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# AI Code Assistant Project Instructions

## Project Overview

This is a full-stack AI-powered code assistant application built with:

- **Frontend**: React + Vite + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + Gemini AI API
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions

## Architecture

- **Monorepo structure** with separate frontend and backend directories
- **RESTful API** with Server-Sent Events (SSE) for real-time streaming
- **Microservices-ready** with Docker containerization
- **Production-ready** with nginx reverse proxy and security headers

## Code Style Guidelines

- Use **ES6+ features** and modern JavaScript/TypeScript patterns
- Follow **React functional components** with hooks
- Implement **proper error handling** and validation
- Use **Tailwind CSS** for styling with consistent design system
- Follow **REST API conventions** for backend endpoints

## Security Best Practices

- Input validation on both frontend and backend
- Rate limiting and CORS configuration
- Environment variables for sensitive data
- Helmet.js for security headers
- Docker security best practices

## Key Features to Implement

1. **Code Explanation**: Detailed analysis of code functionality
2. **Bug Detection**: Identify and suggest fixes for code issues
3. **Code Translation**: Convert between programming languages
4. **Real-time Streaming**: Server-Sent Events for AI responses
5. **Responsive Design**: Mobile-first approach with Tailwind CSS

## Development Guidelines

- Use **TypeScript** for type safety where applicable
- Implement **comprehensive error handling**
- Add **loading states** and **user feedback**
- Follow **component-based architecture**
- Use **semantic HTML** and **accessibility best practices**

## API Integration

- **Gemini AI API** for natural language processing
- **Streaming responses** for better user experience
- **Proper error handling** for API failures
- **Rate limiting** to prevent abuse

## Testing Strategy

- Unit tests for utility functions
- Integration tests for API endpoints
- Component tests for React components
- End-to-end tests for critical user flows
