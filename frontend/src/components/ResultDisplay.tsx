import React from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const ResultDisplay = ({ result, isLoading, error }) => {
  if (error) {
    return (
      <div className="flex items-center justify-center h-64 bg-red-50 border-2 border-red-200 rounded-lg">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-800 mb-2">Error</h3>
          <p className="text-red-600 max-w-md">{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading && !result) {
    return (
      <div className="flex items-center justify-center h-64 bg-blue-50 border-2 border-blue-200 rounded-lg">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-500 mx-auto mb-4 animate-spin" />
          <h3 className="text-lg font-medium text-blue-800 mb-2">Processing</h3>
          <p className="text-blue-600">AI is analyzing your code...</p>
        </div>
      </div>
    );
  }

  if (!result && !isLoading) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 border-2 border-gray-200 rounded-lg">
        <div className="text-center">
          <div className="bg-gray-100 p-4 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            Ready to Help
          </h3>
          <p className="text-gray-500">
            Enter your code and select a task to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-white">
        <ReactMarkdown
          className="prose prose-sm max-w-none"
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={oneLight}
                  language={match[1]}
                  PreTag="div"
                  className="rounded-md"
                  {...props}>
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code
                  className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono"
                  {...props}>
                  {children}
                </code>
              );
            },
            pre({ children }) {
              return <>{children}</>;
            },
            h1({ children }) {
              return (
                <h1 className="text-xl font-bold mb-4 text-gray-900">
                  {children}
                </h1>
              );
            },
            h2({ children }) {
              return (
                <h2 className="text-lg font-semibold mb-3 text-gray-800">
                  {children}
                </h2>
              );
            },
            h3({ children }) {
              return (
                <h3 className="text-md font-medium mb-2 text-gray-700">
                  {children}
                </h3>
              );
            },
            p({ children }) {
              return (
                <p className="mb-3 text-gray-700 leading-relaxed">{children}</p>
              );
            },
            ul({ children }) {
              return <ul className="mb-3 pl-4 space-y-1">{children}</ul>;
            },
            ol({ children }) {
              return <ol className="mb-3 pl-4 space-y-1">{children}</ol>;
            },
            li({ children }) {
              return <li className="text-gray-700">{children}</li>;
            },
          }}>
          {result}
        </ReactMarkdown>
      </div>

      {isLoading && result && (
        <div className="absolute bottom-2 right-2 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs flex items-center space-x-1">
          <Loader2 className="h-3 w-3 animate-spin" />
          <span>Streaming...</span>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
