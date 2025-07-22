'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Code, Bug, Languages, MessageSquare, Copy, Check } from 'lucide-react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedMode, setSelectedMode] = useState('general');
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  // Predefined prompts for different modes
  const promptTemplates = {
    explain: "Please explain the following code in detail, including what it does, how it works, and any important concepts:\n\n",
    bugs: "Please analyze the following code for potential bugs, errors, or issues. Provide specific recommendations for fixes:\n\n",
    translate: "Please translate the following code to a different programming language. If no target language is specified, suggest the most appropriate alternative:\n\n",
    optimize: "Please review the following code and suggest optimizations for better performance, readability, or best practices:\n\n",
    general: ""
  };

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  // Handle quick action buttons
  const handleQuickAction = (mode: string, placeholder: string) => {
    setSelectedMode(mode);
    if (inputRef.current) {
      inputRef.current.placeholder = placeholder;
      inputRef.current.focus();
    }
  };

  // Copy message content to clipboard
  const copyToClipboard = async (content: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Custom submit handler to add prompt templates
  const handleCustomSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const template = promptTemplates[selectedMode as keyof typeof promptTemplates] || '';
    const enhancedMessage = template + input;
    
    // Temporarily modify the input value for submission
    if (inputRef.current) {
      const originalValue = inputRef.current.value;
      inputRef.current.value = enhancedMessage;
      
      // Submit the form with enhanced message
      handleSubmit(e);
      
      // Reset the input to original value (it will be cleared by useChat anyway)
      inputRef.current.value = originalValue;
    }
    
    setSelectedMode('general'); // Reset to general mode after submit
  };

  return (
    <div className="min-h-screen flex flex-col max-w-7xl mx-auto p-4">
      <Card className="flex-1 flex flex-col h-[calc(100vh-2rem)] overflow-hidden shadow-xl border-0">
        {/* Header */}
        <div className="flex-shrink-0 border-b p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
          <h1 className="text-2xl font-bold text-center mb-1">AI-Powered Code Assistant</h1>
          <p className="text-xs text-muted-foreground text-center mb-3">
            Get help with code explanation, bug detection, and language translation
          </p>
          
          {/* Quick Action Buttons */}
          <div className="flex flex-wrap justify-center gap-1 max-w-2xl mx-auto">
            <Button
              variant={selectedMode === 'explain' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleQuickAction('explain', 'Paste your code here for explanation...')}
              className="flex items-center gap-1 text-xs px-2 py-1 h-8"
            >
              <Code className="w-3 h-3" />
              Explain
            </Button>
            <Button
              variant={selectedMode === 'bugs' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleQuickAction('bugs', 'Paste your code here for bug analysis...')}
              className="flex items-center gap-1 text-xs px-2 py-1 h-8"
            >
              <Bug className="w-3 h-3" />
              Bugs
            </Button>
            <Button
              variant={selectedMode === 'translate' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleQuickAction('translate', 'Paste your code here for translation...')}
              className="flex items-center gap-1 text-xs px-2 py-1 h-8"
            >
              <Languages className="w-3 h-3" />
              Translate
            </Button>
            <Button
              variant={selectedMode === 'optimize' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleQuickAction('optimize', 'Paste your code here for optimization...')}
              className="flex items-center gap-1 text-xs px-2 py-1 h-8"
            >
              <MessageSquare className="w-3 h-3" />
              Optimize
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea ref={scrollAreaRef} className="flex-1 min-h-0">
          <div className="p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground">
                <div className="max-w-full mx-auto pb-8">
                  <div className="mb-8">
                    <Code className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                    <h3 className="text-xl font-bold mb-2">Welcome to AI Code Assistant!</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Get intelligent help with code explanation, bug detection, language translation, and optimization
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-8 max-w-3xl mx-auto">
                      <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                        <Code className="w-6 h-6 text-blue-500" />
                        <span className="font-medium text-sm">Explain</span>
                        <span className="text-xs text-center text-muted-foreground">Detailed code explanations</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800">
                        <Bug className="w-6 h-6 text-red-500" />
                        <span className="font-medium text-sm">Debug</span>
                        <span className="text-xs text-center text-muted-foreground">Find and fix issues</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                        <Languages className="w-6 h-6 text-green-500" />
                        <span className="font-medium text-sm">Translate</span>
                        <span className="text-xs text-center text-muted-foreground">Convert languages</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800">
                        <MessageSquare className="w-6 h-6 text-purple-500" />
                        <span className="font-medium text-sm">Optimize</span>
                        <span className="text-xs text-center text-muted-foreground">Performance tips</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-4 py-3 relative group ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground ml-4'
                        : 'bg-muted mr-4'
                    }`}
                  >
                    <div className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                      {message.role === 'assistant' ? (
                        <div className="prose prose-sm max-w-none dark:prose-invert">
                          {message.content.split('```').map((part, index) => 
                            index % 2 === 0 ? (
                              <span key={index}>{part}</span>
                            ) : (
                              <pre key={index} className="bg-gray-100 dark:bg-gray-800 p-2 rounded font-mono text-xs overflow-x-auto">
                                <code>{part}</code>
                              </pre>
                            )
                          )}
                        </div>
                      ) : (
                        <div className="font-mono">{message.content}</div>
                      )}
                    </div>
                    
                    {/* Copy button for assistant messages */}
                    {message.role === 'assistant' && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(message.content, message.id)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                      >
                        {copiedMessageId === message.id ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-4 py-3 mr-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <span className="text-sm ml-2">Analyzing code...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Form */}
        <div className="border-t p-4 bg-gray-50 dark:bg-gray-900">
          {selectedMode !== 'general' && (
            <div className="mb-3 text-xs text-muted-foreground">
              <span className="font-medium">Active mode:</span> {selectedMode} | 
              <button 
                onClick={() => setSelectedMode('general')} 
                className="ml-1 text-blue-500 hover:text-blue-700 underline"
              >
                switch to general chat
              </button>
            </div>
          )}
          <form onSubmit={handleCustomSubmit} className="flex space-x-2">
            <Input
              ref={inputRef}
              value={input}
              placeholder={
                selectedMode === 'explain' ? 'Paste your code here for explanation...' :
                selectedMode === 'bugs' ? 'Paste your code here for bug analysis...' :
                selectedMode === 'translate' ? 'Paste your code here for translation...' :
                selectedMode === 'optimize' ? 'Paste your code here for optimization...' :
                'Ask me about your code or paste it here...'
              }
              onChange={handleInputChange}
              disabled={isLoading}
              className="flex-1 font-mono"
              autoFocus
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              {selectedMode === 'general' ? 'Send' : 'Analyze'}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
