import { validateCode, detectLanguage, sanitizeInput } from '../utils/validation.js';

describe('Validation Utils', () => {
  describe('validateCode', () => {
    it('should validate normal code', () => {
      const code = 'function hello() { return "world"; }';
      const result = validateCode(code);
      
      expect(result.isValid).toBe(true);
      expect(result.warnings).toHaveLength(0);
    });

    it('should reject empty code', () => {
      const result = validateCode('');
      
      expect(result.isValid).toBe(false);
      expect(result.warnings).toContain('Code input is required and must be a string');
    });

    it('should reject extremely long code', () => {
      const longCode = 'a'.repeat(50001);
      const result = validateCode(longCode);
      
      expect(result.isValid).toBe(false);
      expect(result.warnings).toContain('Code is too long. Please limit to 50,000 characters');
    });

    it('should warn about suspicious patterns', () => {
      const suspiciousCode = 'eval("dangerous code")';
      const result = validateCode(suspiciousCode);
      
      expect(result.warnings).toContain('Code contains potentially unsafe patterns');
    });
  });

  describe('detectLanguage', () => {
    it('should detect JavaScript', () => {
      const jsCode = 'function test() { console.log("hello"); }';
      expect(detectLanguage(jsCode)).toBe('javascript');
    });

    it('should detect Python', () => {
      const pythonCode = 'def test():\n    print("hello")';
      expect(detectLanguage(pythonCode)).toBe('python');
    });

    it('should detect C++', () => {
      const cppCode = '#include <iostream>\nint main() { std::cout << "hello"; }';
      expect(detectLanguage(cppCode)).toBe('cpp');
    });

    it('should return unknown for unrecognized code', () => {
      const unknownCode = 'some random text';
      expect(detectLanguage(unknownCode)).toBe('unknown');
    });
  });

  describe('sanitizeInput', () => {
    it('should remove HTML tags', () => {
      const input = 'Hello <script>alert("xss")</script> world';
      const result = sanitizeInput(input);
      
      expect(result).not.toContain('<script>');
      expect(result).not.toContain('</script>');
    });

    it('should remove javascript protocols', () => {
      const input = 'javascript:alert("xss")';
      const result = sanitizeInput(input);
      
      expect(result).not.toContain('javascript:');
    });

    it('should handle non-string input', () => {
      expect(sanitizeInput(123)).toBe(123);
      expect(sanitizeInput(null)).toBe(null);
      expect(sanitizeInput(undefined)).toBe(undefined);
    });
  });
});
