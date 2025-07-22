import React from "react";
import { Code, Brain, Bug, Languages } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Code className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                AI Code Assistant
              </h1>
              <p className="text-gray-600 text-sm">
                Powered by Google Gemini AI
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>Explain Code</span>
            </div>
            <div className="flex items-center space-x-2">
              <Bug className="h-4 w-4" />
              <span>Find Bugs</span>
            </div>
            <div className="flex items-center space-x-2">
              <Languages className="h-4 w-4" />
              <span>Translate</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
