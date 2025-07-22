#!/usr/bin/env node

/**
 * Simple script to test Google Gemini API key
 * Run: node test-api-key.js
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testApiKey() {
  console.log('🧪 Testing Google Gemini API Key...\n');

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error('❌ Error: GEMINI_API_KEY not found in .env file');
    console.log('\n📝 To fix this:');
    console.log('1. Open backend/.env file');
    console.log('2. Add your API key: GEMINI_API_KEY=your_actual_key_here');
    console.log('3. Get a key at: https://ai.google.dev/');
    process.exit(1);
  }

  if (apiKey === 'your_actual_gemini_api_key_here') {
    console.error('❌ Error: Please replace the placeholder API key with your actual key');
    console.log('\n📝 To fix this:');
    console.log('1. Get a Google Gemini API key at: https://ai.google.dev/');
    console.log('2. Open backend/.env file');
    console.log('3. Replace "your_actual_gemini_api_key_here" with your real API key');
    process.exit(1);
  }

  try {
    console.log('🔑 API Key found, testing connection...');
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent("Hello! Just testing the API. Please respond with 'API test successful!'");
    const response = await result.response;
    const text = response.text();

    console.log('✅ API Key is valid!');
    console.log('📡 Test Response:', text.substring(0, 100) + (text.length > 100 ? '...' : ''));
    console.log('\n🎉 Your AI assistant is ready to use!');
    console.log('💡 Run "npm run dev:full" in the frontend directory to start the application');

  } catch (error) {
    console.error('❌ API Key test failed:');
    
    if (error.message?.includes('API key not valid')) {
      console.error('   Invalid API key. Please check your key.');
      console.log('\n📝 To fix this:');
      console.log('1. Verify your API key at: https://ai.google.dev/');
      console.log('2. Make sure the key has proper permissions');
      console.log('3. Check if the key is correctly copied (no extra spaces)');
    } else if (error.message?.includes('quota')) {
      console.error('   API quota exceeded. Please try again later.');
    } else {
      console.error('   Network or other error:', error.message);
    }
    
    process.exit(1);
  }
}

// Run the test
testApiKey();
