# AI-Powered Code Assistant

A modern, interactive web application built with Next.js that provides AI-powered assistance for code-related tasks including code explanation, bug detection, language translation, and optimization suggestions.

## 🚀 Features

### Core Capabilities
- **Code Explanation**: Get detailed explanations of how code works, including logic flow and key concepts
- **Bug Detection**: Analyze code for potential bugs, errors, and security issues with specific fix recommendations
- **Language Translation**: Convert code between different programming languages while maintaining functionality
- **Code Optimization**: Receive suggestions for performance improvements, readability enhancements, and best practices

### User Interface
- **Interactive Examples**: Pre-built code examples to demonstrate each feature
- **Mode Selection**: Quick action buttons to switch between different analysis modes
- **Real-time Streaming**: Live token-by-token responses from Google Gemini Pro
- **Copy Functionality**: Easy copying of AI responses with visual feedback
- **Responsive Design**: Modern UI that works on desktop and mobile devices
- **Syntax Highlighting**: Monospace font rendering for better code readability

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **AI Integration**: Google Gemini Pro via Vercel AI SDK
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ installed
- Google AI API key (get one from [Google AI Studio](https://makersuite.google.com/app/apikey))

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create a `.env.local` file in the root directory:
```env
GOOGLE_API_KEY=your_google_api_key_here
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
frontend/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # AI API endpoint with Gemini integration
│   ├── components/
│   │   ├── chat.tsx              # Main chat interface component
│   │   └── examples.tsx          # Interactive examples component
│   ├── globals.css               # Global styles
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Main page component
├── components/
│   └── ui/                      # Shadcn/ui components
├── lib/
│   └── utils.ts                 # Utility functions
└── package.json
```

## 🎯 Usage Examples

### Code Explanation
```javascript
// Example: Paste this function and ask for explanation
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left = arr.slice(0, -1).filter(x => x <= pivot);
  const right = arr.slice(0, -1).filter(x => x > pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
}
```

### Bug Detection
```python
# Example: This function has a potential division by zero bug
def calculate_average(numbers):
    total = 0
    for num in numbers:
        total += num
    return total / len(numbers)  # Bug: What if numbers is empty?
```

### Language Translation
```javascript
// Example: Translate this JavaScript to Python
const users = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 }
];
const adults = users.filter(user => user.age >= 18);
```

### Code Optimization
```javascript
// Example: This function can be optimized
function findDuplicates(arr) {
  const duplicates = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j] && !duplicates.includes(arr[i])) {
        duplicates.push(arr[i]);
      }
    }
  }
  return duplicates;
}
```

## 🔧 Configuration

### API Configuration
The application uses Google Gemini Pro with the following configuration:
- **Temperature**: 0.7 (balanced creativity/accuracy)
- **Top P**: 0.8 (nucleus sampling)
- **Top K**: 40 (token selection)
- **Max Output Tokens**: 2048

### Prompt Templates
The application uses specialized prompt templates for each mode:
- **Explain**: Detailed code analysis with concepts and logic flow
- **Bug Detection**: Security and error analysis with fix recommendations
- **Translation**: Language conversion with functionality preservation
- **Optimization**: Performance and best practice suggestions

## 🎨 Customization

### Adding New Modes
To add a new analysis mode:

1. Update the `promptTemplates` object in `chat.tsx`
2. Add a new button in the header section
3. Update the placeholder text logic
4. Add corresponding examples in `examples.tsx`

### Styling
The application uses Tailwind CSS with custom color schemes:
- **Blue**: Code explanation
- **Red**: Bug detection
- **Green**: Language translation  
- **Purple**: Code optimization

## 📱 Responsive Design

The application is fully responsive with:
- **Desktop**: Full feature set with optimal layout
- **Tablet**: Adapted grid layouts and button sizing
- **Mobile**: Stacked layouts with touch-friendly interactions

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel with environment variables
```

### Other Platforms
```bash
npm run build
npm start
# Ensure GOOGLE_API_KEY is set in production environment
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -am 'Add new feature'`
5. Push to the branch: `git push origin feature/new-feature`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini Pro** for providing powerful AI capabilities
- **Vercel AI SDK** for seamless AI integration
- **Shadcn/ui** for beautiful, accessible UI components
- **Next.js team** for the excellent framework

---

Built with ❤️ using Next.js and Google Gemini Pro
