import React from "react";
import { Brain, Bug, Languages } from "lucide-react";

type TaskSelectorProps = {
  task: string;
  onTaskChange: (taskId: string) => void;
  targetLanguage: string;
  onTargetLanguageChange: (lang: string) => void;
};

const TaskSelector: React.FC<TaskSelectorProps> = ({
  task,
  onTaskChange,
  targetLanguage,
  onTargetLanguageChange,
}) => {
  const tasks = [
    {
      id: "explain",
      label: "Explain Code",
      description: "Get a detailed explanation of how the code works",
      icon: Brain,
      color: "blue",
    },
    {
      id: "debug",
      label: "Find & Fix Bugs",
      description: "Identify potential issues and suggest improvements",
      icon: Bug,
      color: "red",
    },
    {
      id: "translate",
      label: "Translate Code",
      description: "Convert code to a different programming language",
      icon: Languages,
      color: "green",
    },
  ];

  const popularLanguages = [
    "Python",
    "JavaScript",
    "TypeScript",
    "Java",
    "C++",
    "C#",
    "Go",
    "Rust",
    "PHP",
    "Ruby",
    "Swift",
    "Kotlin",
    "Dart",
    "Scala",
    "R",
    "MATLAB",
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        {tasks.map((taskOption) => {
          const Icon = taskOption.icon;
          const isSelected = task === taskOption.id;

          return (
            <div
              key={taskOption.id}
              onClick={() => onTaskChange(taskOption.id)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                isSelected
                  ? `border-${taskOption.color}-500 bg-${taskOption.color}-50`
                  : "border-gray-200 hover:border-gray-300"
              }`}>
              <div className="flex items-start space-x-3">
                <div
                  className={`p-2 rounded-lg ${
                    isSelected
                      ? `bg-${taskOption.color}-500 text-white`
                      : "bg-gray-100 text-gray-600"
                  }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {taskOption.label}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {taskOption.description}
                  </p>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    isSelected
                      ? `border-${taskOption.color}-500 bg-${taskOption.color}-500`
                      : "border-gray-300"
                  }`}>
                  {isSelected && (
                    <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Target Language Input for Translation */}
      {task === "translate" && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Programming Language
          </label>
          <div className="space-y-3">
            <input
              type="text"
              value={targetLanguage}
              onChange={(e) => onTargetLanguageChange(e.target.value)}
              placeholder="e.g., Python, JavaScript, Java..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />

            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-gray-500 mb-1">
                Popular choices:
              </span>
              {popularLanguages.slice(0, 8).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => onTargetLanguageChange(lang)}
                  className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors duration-150">
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskSelector;
