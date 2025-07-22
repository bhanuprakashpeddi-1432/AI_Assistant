import { EventEmitter } from 'events';

/**
 * Create a streaming response for chat interactions
 * @param {Object} options - Configuration options
 * @param {string} options.message - User message
 * @param {string} options.mode - Chat mode (explain, bugs, translate, optimize, general)
 * @param {Array} options.conversationHistory - Previous conversation messages
 * @param {Object} options.genAI - Google Generative AI instance
 * @returns {EventEmitter} Stream emitter
 */
export async function createChatStream({ message, mode, conversationHistory, genAI }) {
  const stream = new EventEmitter();

  // Validate API setup early
  if (!genAI) {
    setTimeout(() => {
      stream.emit('error', new Error('Google Generative AI not properly initialized. Please check your API key configuration.'));
    }, 0);
    return stream;
  }

  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Create system instruction based on mode
    const systemInstructions = {
      explain: `You are an expert code explanation assistant. Your role is to:

1. **Analyze code thoroughly**: Break down the code structure, logic, and flow
2. **Explain concepts clearly**: Use simple language to explain complex programming concepts
3. **Provide context**: Explain why certain patterns or approaches are used
4. **Include examples**: When helpful, provide small examples to illustrate points
5. **Cover best practices**: Mention relevant best practices and conventions

Format your response with clear sections and use markdown for better readability.`,

      bugs: `You are an expert debugging and code analysis assistant. Your role is to:

1. **Identify issues**: Look for bugs, errors, security vulnerabilities, and potential problems
2. **Explain the problems**: Clearly describe what's wrong and why it's problematic
3. **Provide solutions**: Offer specific, actionable fixes and improvements
4. **Suggest best practices**: Recommend better approaches to prevent similar issues
5. **Consider edge cases**: Think about scenarios where the code might fail

Be thorough and prioritize issues by severity. Provide corrected code examples when appropriate.`,

      translate: `You are an expert programming language translation assistant. Your role is to:

1. **Understand the source code**: Analyze the functionality and logic
2. **Translate accurately**: Convert to the target language while preserving functionality
3. **Follow conventions**: Use idiomatic patterns and conventions of the target language
4. **Optimize for the target**: Take advantage of target language features
5. **Explain differences**: Highlight key differences between the languages

If no target language is specified, suggest the most appropriate one and explain why.`,

      optimize: `You are an expert code optimization assistant. Your role is to:

1. **Analyze performance**: Identify bottlenecks and inefficient patterns
2. **Suggest improvements**: Provide specific optimization techniques
3. **Consider readability**: Balance performance with code maintainability
4. **Explain trade-offs**: Discuss the pros and cons of different approaches
5. **Modern practices**: Recommend current best practices and design patterns

Focus on both performance and code quality improvements.`,

      general: `You are a helpful AI programming assistant. Provide clear, accurate, and helpful responses to programming questions. Be concise but thorough, and always aim to educate and assist the user.`
    };

    const systemInstruction = systemInstructions[mode] || systemInstructions.general;

    // Build conversation context
    let conversationContext = '';
    if (conversationHistory && conversationHistory.length > 0) {
      conversationContext = '\n\nConversation History:\n';
      conversationHistory.slice(-5).forEach((msg, index) => { // Limit to last 5 messages
        conversationContext += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
      });
      conversationContext += '\n---\n\n';
    }

    const fullPrompt = `${systemInstruction}${conversationContext}User request: ${message}`;

    // Generate streaming content
    const result = await model.generateContentStream(fullPrompt);

    // Process the stream
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      if (chunkText) {
        stream.emit('data', chunkText);
      }
    }

    stream.emit('end');

  } catch (error) {
    console.error('Gemini service error:', error);
    
    // Provide more user-friendly error messages
    let userMessage = 'Failed to process request';
    
    if (error.message?.includes('API key not valid')) {
      userMessage = 'Invalid API key. Please check your Google Gemini API key configuration.';
    } else if (error.message?.includes('quota')) {
      userMessage = 'API quota exceeded. Please try again later.';
    } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
      userMessage = 'Network error. Please check your internet connection.';
    }
    
    const friendlyError = new Error(userMessage);
    friendlyError.originalError = error;
    
    stream.emit('error', friendlyError);
  }

  return stream;
}

/**
 * Generate a single response (non-streaming)
 * @param {Object} options - Configuration options
 * @param {string} options.message - User message
 * @param {string} options.mode - Chat mode
 * @param {Object} options.genAI - Google Generative AI instance
 * @returns {Promise<string>} Generated response
 */
export async function generateResponse({ message, mode, genAI }) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const systemInstructions = {
      explain: "You are a code explanation expert. Provide detailed, educational explanations.",
      bugs: "You are a debugging expert. Find and fix bugs with specific recommendations.",
      translate: "You are a programming language expert. Translate code between languages accurately.",
      optimize: "You are a performance expert. Optimize code for better performance and practices.",
      general: "You are a helpful programming assistant."
    };

    const instruction = systemInstructions[mode] || systemInstructions.general;
    const prompt = `${instruction}\n\nUser request: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error('Generate response error:', error);
    throw error;
  }
}

/**
 * Validate Gemini API configuration
 * @returns {boolean} True if properly configured
 */
export function validateGeminiConfig() {
  return !!process.env.GEMINI_API_KEY;
}

/**
 * Test Gemini API connection
 * @param {Object} genAI - Google Generative AI instance
 * @returns {Promise<boolean>} True if connection is successful
 */
export async function testGeminiConnection(genAI) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Say 'Hello, I'm working!' in a single line.");
    const response = await result.response;
    const text = response.text();
    return text.includes('Hello') || text.includes('working');
  } catch (error) {
    console.error('Gemini connection test failed:', error);
    return false;
  }
}
