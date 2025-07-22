import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 60000, // 60 seconds for AI processing
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(
      `Making ${config.method?.toUpperCase()} request to ${config.url}`
    );
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Response error:", error);

    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || "Server error occurred";
      throw new Error(message);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error(
        "Unable to connect to server. Please check your connection."
      );
    } else {
      // Something else happened
      throw new Error("An unexpected error occurred");
    }
  }
);

// Process code with streaming support
export const processCode = async ({
  code,
  task,
  targetLanguage,
  onChunk,
  onComplete,
  onError,
}) => {
  try {
    const payload = {
      code,
      task,
      ...(targetLanguage && { targetLanguage }),
    };

    // Use fetch for Server-Sent Events streaming
    const response = await fetch(`${api.defaults.baseURL}/ai/process`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Request failed");
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error("Streaming not supported");
    }

    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");

      // Keep the last incomplete line in buffer
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            const data = JSON.parse(line.slice(6));

            if (data.error) {
              onError(data.error);
              return;
            }

            if (data.content) {
              onChunk(data.content);
            }

            if (data.complete) {
              onComplete();
              return;
            }
          } catch (parseError) {
            console.warn("Failed to parse SSE data:", parseError);
          }
        }
      }
    }
  } catch (error) {
    console.error("Process code error:", error);
    onError(error.message || "An error occurred while processing your request");
  }
};

// Test API connectivity
export const testConnection = async () => {
  try {
    const response = await api.get("/ai/test");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await api.get("/health");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
