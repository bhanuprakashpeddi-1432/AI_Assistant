/**
 * Logger utility for structured logging
 */

const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
};

const currentLogLevel = LOG_LEVELS[process.env.LOG_LEVEL] || LOG_LEVELS.INFO;

/**
 * Format log message with timestamp and metadata
 * @param {string} level - Log level
 * @param {string} message - Log message
 * @param {Object} meta - Additional metadata
 * @returns {string} Formatted log message
 */
function formatLog(level, message, meta = {}) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    message,
    ...meta
  };
  
  return JSON.stringify(logEntry);
}

/**
 * Log error messages
 * @param {string} message - Error message
 * @param {Object} meta - Additional metadata
 */
export function logError(message, meta = {}) {
  if (currentLogLevel >= LOG_LEVELS.ERROR) {
    console.error(formatLog('ERROR', message, meta));
  }
}

/**
 * Log warning messages
 * @param {string} message - Warning message
 * @param {Object} meta - Additional metadata
 */
export function logWarn(message, meta = {}) {
  if (currentLogLevel >= LOG_LEVELS.WARN) {
    console.warn(formatLog('WARN', message, meta));
  }
}

/**
 * Log info messages
 * @param {string} message - Info message
 * @param {Object} meta - Additional metadata
 */
export function logInfo(message, meta = {}) {
  if (currentLogLevel >= LOG_LEVELS.INFO) {
    console.log(formatLog('INFO', message, meta));
  }
}

/**
 * Log debug messages
 * @param {string} message - Debug message
 * @param {Object} meta - Additional metadata
 */
export function logDebug(message, meta = {}) {
  if (currentLogLevel >= LOG_LEVELS.DEBUG) {
    console.log(formatLog('DEBUG', message, meta));
  }
}

/**
 * Log API requests
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {number} duration - Request duration in ms
 */
export function logRequest(req, res, duration) {
  const meta = {
    method: req.method,
    url: req.originalUrl,
    status: res.statusCode,
    duration: `${duration}ms`,
    userAgent: req.get('User-Agent'),
    ip: req.ip
  };
  
  logInfo('API Request', meta);
}
