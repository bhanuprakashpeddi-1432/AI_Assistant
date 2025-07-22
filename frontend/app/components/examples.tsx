'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Bug, Languages, Zap } from 'lucide-react';

interface ExampleSectionProps {
  onExampleClick: (example: string, mode: string) => void;
}

export default function ExampleSection({ onExampleClick }: ExampleSectionProps) {
  const [showMore, setShowMore] = useState(false);

  const examples = [
    {
      title: "React Hook",
      mode: "explain",
      icon: <Code className="w-4 h-4" />,
      code: `const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);
  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);
  return { count, increment };
};`,
      description: "Custom React hook with optimization"
    },
    {
      title: "Memory Leak",
      mode: "bugs",
      icon: <Bug className="w-4 h-4" />,
      code: `class DataProcessor {
  constructor() {
    this.timer = setInterval(() => {
      this.processData();
    }, 1000);
  }
}`,
      description: "Find the memory leak issue"
    },
    {
      title: "Python to JS",
      mode: "translate",
      icon: <Languages className="w-4 h-4" />,
      code: `def fibonacci_generator(n):
    a, b = 0, 1
    count = 0
    while count < n:
        yield a
        a, b = b, a + b
        count += 1`,
      description: "Convert Python generator to JavaScript"
    },
    {
      title: "Optimize Algorithm",
      mode: "optimize",
      icon: <Zap className="w-4 h-4" />,
      code: `function findCommon(arr1, arr2) {
  const common = [];
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) {
        common.push(arr1[i]);
      }
    }
  }
  return common;
}`,
      description: "Improve this O(n²) algorithm"
    }
  ];

  const moreExamples = [
    {
      title: "Async/Await",
      mode: "explain",
      icon: <Code className="w-4 h-4" />,
      code: `async function fetchData(userId) {
  try {
    const response = await fetch('/api/users/' + userId);
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error:', error);
  }
}`,
      description: "Learn async/await patterns"
    },
    {
      title: "SQL Injection",
      mode: "bugs",
      icon: <Bug className="w-4 h-4" />,
      code: `app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT * FROM users WHERE id = ' + userId;
  db.query(query, (err, results) => {
    res.json(results);
  });
});`,
      description: "Spot the SQL injection vulnerability"
    },
    {
      title: "C++ to Rust",
      mode: "translate",
      icon: <Languages className="w-4 h-4" />,
      code: `#include <vector>
#include <iostream>

class Vector3D {
private:
    float x, y, z;
public:
    Vector3D(float x, float y, float z) : x(x), y(y), z(z) {}
    float magnitude() const {
        return sqrt(x*x + y*y + z*z);
    }
};`,
      description: "Convert C++ class to Rust"
    },
    {
      title: "Performance Fix",
      mode: "optimize",
      icon: <Zap className="w-4 h-4" />,
      code: `function processItems(items) {
  const results = [];
  for (let i = 0; i < items.length; i++) {
    if (isValid(items[i])) {
      const processed = transform(items[i]);
      if (processed !== null) {
        results.push(processed);
      }
    }
  }
  return results;
}`,
      description: "Optimize this processing function"
    }
  ];

  const allExamples = showMore ? [...examples, ...moreExamples] : examples;

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h4 className="text-base font-semibold mb-4 text-center">Try These Examples</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        {allExamples.map((example, index) => (
          <Card key={index} className="p-3 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-blue-500">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 p-1.5 rounded-md bg-muted">
                {example.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="font-medium text-sm mb-1">{example.title}</h5>
                <p className="text-xs text-muted-foreground mb-2">{example.description}</p>
                <div className="bg-muted rounded p-2 mb-2">
                  <code className="text-xs font-mono block overflow-hidden">
                    {example.code.split('\n').slice(0, 3).join('\n')}
                    {example.code.split('\n').length > 3 && '...'}
                  </code>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-6 text-xs px-2"
                  onClick={() => onExampleClick(example.code, example.mode)}
                >
                  Try This
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowMore(!showMore)}
          className="text-xs"
        >
          {showMore ? 'Show Less' : 'Show More Examples'}
        </Button>
      </div>
    </div>
  );
}
