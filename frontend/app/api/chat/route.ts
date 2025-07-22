// Frontend API route that proxies to the Node.js backend
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

// Define the message type
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    // Extract the latest message and conversation history
    const latestMessage = messages[messages.length - 1];
    const conversationHistory = messages.slice(0, -1).map((msg: Message) => ({
      role: msg.role,
      content: msg.content
    }));

    // Determine mode from message content or default to general
    let mode = 'general';
    const content = latestMessage.content.toLowerCase();
    
    if (content.includes('explain') || content.includes('how does') || content.includes('what is')) {
      mode = 'explain';
    } else if (content.includes('bug') || content.includes('error') || content.includes('fix') || content.includes('debug')) {
      mode = 'bugs';
    } else if (content.includes('translate') || content.includes('convert') || content.includes('change to')) {
      mode = 'translate';
    } else if (content.includes('optimize') || content.includes('improve') || content.includes('performance')) {
      mode = 'optimize';
    }

    // Forward request to backend
    const backendResponse = await fetch(`${BACKEND_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: latestMessage.content,
        mode,
        conversationHistory
      }),
    });

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      console.error('Backend error:', errorText);
      throw new Error(`Backend responded with status: ${backendResponse.status}`);
    }

    // Stream the response from backend
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          const reader = backendResponse.body?.getReader();
          if (!reader) {
            throw new Error('No response body from backend');
          }

          const decoder = new TextDecoder();
          let buffer = '';

          while (true) {
            const { done, value } = await reader.read();
            
            if (done) {
              // Process any remaining buffer content
              if (buffer.trim()) {
                const formattedChunk = `data: ${JSON.stringify({ content: buffer })}\n\n`;
                controller.enqueue(encoder.encode(formattedChunk));
              }
              // Send final message to complete the stream
              controller.enqueue(encoder.encode('data: [DONE]\n\n'));
              break;
            }

            // Decode the chunk and add to buffer
            const chunk = decoder.decode(value, { stream: true });
            buffer += chunk;

            // Process complete lines
            const lines = buffer.split('\n');
            buffer = lines.pop() || ''; // Keep incomplete line in buffer

            for (const line of lines) {
              if (line.trim()) {
                // Format for useChat hook compatibility
                const formattedChunk = `data: ${JSON.stringify({ content: line })}\n\n`;
                controller.enqueue(encoder.encode(formattedChunk));
              }
            }
          }

          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);
          controller.error(error);
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process chat request',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
