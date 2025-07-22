import React from "react";

const CodeInput = ({ value, onChange, placeholder }) => {
  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
        style={{
          fontFamily:
            "'JetBrains Mono', 'Fira Code', 'Monaco', 'Cascadia Code', monospace",
        }}
      />
      <div className="absolute bottom-2 right-2 text-xs text-gray-400">
        {value.length} characters
      </div>
    </div>
  );
};

export default CodeInput;
