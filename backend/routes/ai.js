const express = require("express");
const { body, validationResult } = require("express-validator");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Validation rules
const validateRequest = [
  body("code")
    .notEmpty()
    .withMessage("Code is required")
    .isLength({ max: 10000 })
    .withMessage("Code must be less than 10,000 characters"),
  body("task")
    .isIn(["explain", "debug", "translate"])
    .withMessage("Task must be one of: explain, debug, translate"),
  body("targetLanguage")
    .optional()
    .isLength({ min: 1, max: 50 })
    .withMessage("Target language must be between 1 and 50 characters"),
];

// AI processing endpoint with streaming
router.post("/process", validateRequest, async (req, res) => {
  try {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { code, task, targetLanguage } = req.body;

    // Set up SSE headers
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Cache-Control",
    });

    // Generate prompt based on task
    let prompt = "";
    switch (task) {
      case "explain":
        prompt = `Please explain the following code in detail. Break down what each part does, explain the logic flow, and mention any important concepts or patterns used:\n\n${code}`;
        break;
      case "debug":
        prompt = `Please analyze the following code for potential bugs, errors, or improvements. Identify any issues and suggest fixes:\n\n${code}`;
        break;
      case "translate":
        if (!targetLanguage) {
          res.write(
            `data: ${JSON.stringify({
              error: "Target language is required for translation",
            })}\n\n`
          );
          res.end();
          return;
        }
        prompt = `Please translate the following code to ${targetLanguage}. Maintain the same functionality and add comments explaining the translation choices:\n\n${code}`;
        break;
      default:
        throw new Error("Invalid task specified");
    }

    // Get the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate content with streaming
    const result = await model.generateContentStream(prompt);

    // Stream the response
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      if (chunkText) {
        res.write(`data: ${JSON.stringify({ content: chunkText })}\n\n`);
      }
    }

    // Send completion signal
    res.write(`data: ${JSON.stringify({ complete: true })}\n\n`);
    res.end();
  } catch (error) {
    console.error("AI processing error:", error);

    // Send error through SSE
    res.write(
      `data: ${JSON.stringify({
        error:
          "An error occurred while processing your request. Please try again.",
      })}\n\n`
    );
    res.end();
  }
});

// Test endpoint for API connectivity
router.get("/test", async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Gemini API key not configured",
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Say hello!");
    const response = await result.response;

    res.json({
      success: true,
      message: "AI service is working correctly",
      testResponse: response.text(),
    });
  } catch (error) {
    console.error("AI test error:", error);
    res.status(500).json({
      success: false,
      message: "AI service test failed",
      error: error.message,
    });
  }
});

module.exports = router;
