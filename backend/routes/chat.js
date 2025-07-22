import express from 'express';
import { body, validationResult } from 'express-validator';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createChatStream } from '../services/geminiService.js';
import { rateLimitChat } from '../middleware/rateLimiter.js';

const router = express.Router();

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Validation middleware
const validateChatRequest = [
  body('message')
    .trim()
    .isLength({ min: 1, max: 10000 })
    .withMessage('Message must be between 1 and 10000 characters'),
  body('mode')
    .optional()
    .isIn(['explain', 'bugs', 'translate', 'optimize', 'general'])
    .withMessage('Mode must be one of: explain, bugs, translate, optimize, general'),
  body('conversationHistory')
    .optional()
    .isArray()
    .withMessage('Conversation history must be an array'),
];

/**
 * POST /api/chat
 * Send a message to the AI assistant
 */
router.post('/', rateLimitChat, validateChatRequest, async (req, res) => {
  try {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { message, mode = 'general', conversationHistory = [] } = req.body;

    // Set response headers for streaming
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Create streaming response
    const stream = await createChatStream({
      message,
      mode,
      conversationHistory,
      genAI
    });

    // Handle stream events
    stream.on('data', (chunk) => {
      res.write(chunk);
    });

    stream.on('end', () => {
      res.end();
    });

    stream.on('error', (error) => {
      console.error('Stream error:', error);
      if (!res.headersSent) {
        // Send error as plain text to match streaming headers
        res.status(500);
        res.write(`Error: ${error.message || 'Failed to process request'}`);
        res.end();
      } else {
        // If headers already sent, just end the stream
        res.end();
      }
    });

  } catch (error) {
    console.error('Chat endpoint error:', error);
    
    if (!res.headersSent) {
      res.status(500).json({
        error: 'Internal server error',
        message: error.message || 'Failed to process chat request'
      });
    }
  }
});

/**
 * POST /api/chat/analyze
 * Analyze code without streaming response
 */
router.post('/analyze', validateChatRequest, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { message, mode = 'general' } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Create system instruction based on mode
    const systemInstructions = {
      explain: "You are a code explanation expert. Provide detailed, educational explanations of code including concepts, patterns, and best practices.",
      bugs: "You are a debugging expert. Analyze code for potential bugs, security vulnerabilities, and issues. Provide specific fixes and recommendations.",
      translate: "You are a programming language translation expert. Convert code between different programming languages while maintaining functionality and following best practices.",
      optimize: "You are a code optimization expert. Analyze code for performance improvements, better patterns, and optimization opportunities.",
      general: "You are a helpful AI programming assistant. Provide clear, accurate, and helpful responses to programming questions."
    };

    const instruction = systemInstructions[mode] || systemInstructions.general;
    const prompt = `${instruction}\n\nUser request: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      response: text,
      mode,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Analyze endpoint error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message || 'Failed to analyze request'
    });
  }
});

/**
 * GET /api/chat/modes
 * Get available chat modes and their descriptions
 */
router.get('/modes', (req, res) => {
  res.json({
    modes: {
      explain: {
        name: 'Code Explanation',
        description: 'Get detailed explanations of how code works, including concepts and best practices',
        icon: 'code'
      },
      bugs: {
        name: 'Bug Detection',
        description: 'Find and fix bugs, security vulnerabilities, and code issues',
        icon: 'bug'
      },
      translate: {
        name: 'Language Translation',
        description: 'Convert code between different programming languages',
        icon: 'languages'
      },
      optimize: {
        name: 'Code Optimization',
        description: 'Improve code performance, readability, and best practices',
        icon: 'zap'
      },
      general: {
        name: 'General Chat',
        description: 'General programming assistance and questions',
        icon: 'message-square'
      }
    }
  });
});

export default router;
