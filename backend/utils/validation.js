/**
 * Utility functions for request validation and sanitization
 */

/**
 * Sanitize user input by removing potentially dangerous characters
 * @param {string} input - User input to sanitize
 * @returns {string} Sanitized input
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+\s*=/gi, ''); // Remove event handlers
}

/**
 * Validate code input for common patterns
 * @param {string} code - Code to validate
 * @returns {Object} Validation result
 */
export function validateCode(code) {
  const result = {
    isValid: true,
    warnings: [],
    suggestions: []
  };

  if (!code || typeof code !== 'string') {
    result.isValid = false;
    result.warnings.push('Code input is required and must be a string');
    return result;
  }

  // Check for extremely long code
  if (code.length > 50000) {
    result.isValid = false;
    result.warnings.push('Code is too long. Please limit to 50,000 characters');
    return result;
  }

  // Check for suspicious patterns (basic security)
  const suspiciousPatterns = [
    /eval\s*\(/gi,
    /document\.write/gi,
    /innerHTML\s*=/gi,
    /script\s*>/gi
  ];

  suspiciousPatterns.forEach(pattern => {
    if (pattern.test(code)) {
      result.warnings.push('Code contains potentially unsafe patterns');
    }
  });

  // Suggest formatting for common issues
  if (code.includes('\t') && code.includes('  ')) {
    result.suggestions.push('Mixed indentation detected. Consider using consistent spacing');
  }

  return result;
}

/**
 * Extract programming language from code
 * @param {string} code - Code to analyze
 * @returns {string} Detected language
 */
export function detectLanguage(code) {
  if (!code || typeof code !== 'string') return 'unknown';

  const patterns = {
    javascript: [
      /function\s+\w+\s*\(/,
      /const\s+\w+\s*=/,
      /let\s+\w+\s*=/,
      /var\s+\w+\s*=/,
      /=>\s*{/,
      /console\.log/,
      /require\(/,
      /import\s+.*from/
    ],
    python: [
      /def\s+\w+\s*\(/,
      /import\s+\w+/,
      /from\s+\w+\s+import/,
      /print\s*\(/,
      /if\s+__name__\s*==\s*['""]__main__['""]:/,
      /:\s*$/m
    ],
    java: [
      /public\s+class\s+\w+/,
      /public\s+static\s+void\s+main/,
      /System\.out\.println/,
      /private\s+\w+\s+\w+/,
      /public\s+\w+\s+\w+\s*\(/
    ],
    cpp: [
      /#include\s*<\w+>/,
      /std::/,
      /cout\s*<</, 
      /cin\s*>>/,
      /int\s+main\s*\(/,
      /using\s+namespace\s+std/
    ],
    csharp: [
      /using\s+System/,
      /namespace\s+\w+/,
      /Console\.WriteLine/,
      /public\s+class\s+\w+/,
      /static\s+void\s+Main/
    ],
    rust: [
      /fn\s+\w+\s*\(/,
      /let\s+mut\s+\w+/,
      /println!\(/,
      /use\s+std::/,
      /impl\s+\w+/
    ],
    go: [
      /package\s+\w+/,
      /import\s+\(/,
      /func\s+\w+\s*\(/,
      /fmt\.Println/,
      /var\s+\w+\s+\w+/
    ]
  };

  for (const [language, languagePatterns] of Object.entries(patterns)) {
    const matches = languagePatterns.filter(pattern => pattern.test(code)).length;
    if (matches >= 2) {
      return language;
    }
  }

  return 'unknown';
}

/**
 * Format response for consistent API structure
 * @param {string} message - Response message
 * @param {Object} data - Additional data
 * @param {string} status - Response status
 * @returns {Object} Formatted response
 */
export function formatResponse(message, data = null, status = 'success') {
  return {
    status,
    message,
    timestamp: new Date().toISOString(),
    ...(data && { data })
  };
}

/**
 * Calculate estimated reading time for text
 * @param {string} text - Text to analyze
 * @returns {number} Estimated reading time in minutes
 */
export function estimateReadingTime(text) {
  if (!text || typeof text !== 'string') return 0;
  
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
