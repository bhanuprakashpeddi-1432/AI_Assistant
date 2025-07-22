import { useState } from "react";
import CodeInput from "./components/CodeInput";
import TaskSelector from "./components/TaskSelector";
import ResultDisplay from "./components/ResultDisplay";
import Header from "./components/Header";
import { processCode } from "./services/api";

function App() {
  const [code, setCode] = useState("");
  const [task, setTask] = useState("explain");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!code.trim()) {
      setError("Please enter some code to process");
      return;
    }

    if (task === "translate" && !targetLanguage.trim()) {
      setError("Please specify a target language for translation");
      return;
    }

    setIsLoading(true);
    setError("");
    setResult("");

    try {
      await processCode({
        code,
        task,
        targetLanguage: task === "translate" ? targetLanguage : "",
        onChunk: (chunk: string) => {
          setResult((prev: string) => prev + chunk);
        },
        onComplete: (): void => {
          setIsLoading(false);
        },
        onError: (errorMessage: string): void => {
          setError(errorMessage);
          setIsLoading(false);
        },
      });
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCode("");
    setResult("");
    setError("");
    setTargetLanguage("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Code Input
                </h2>
                <CodeInput
                  value={code}
                  onChange={setCode}
                  placeholder="Enter your code here..."
                />
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Task Selection
                </h2>
                <TaskSelector
                  task={task}
                  onTaskChange={setTask}
                  targetLanguage={targetLanguage}
                  onTargetLanguageChange={setTargetLanguage}
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                  {isLoading ? "Processing..." : "Process Code"}
                </button>
                <button
                  onClick={handleReset}
                  disabled={isLoading}
                  className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                  Reset
                </button>
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                AI Response
              </h2>
              <ResultDisplay
                result={result}
                isLoading={isLoading}
                error={error}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
