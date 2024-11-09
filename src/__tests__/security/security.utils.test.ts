import { SecurityUtils } from '../../security/security.utils';

describe('SecurityUtils', () => {
  describe('sanitizeInput', () => {
    it('should sanitize HTML tags', () => {
      expect(SecurityUtils.sanitizeInput('<script>alert("xss")</script>')).toBe('script>alert("xss")/script>');
      expect(SecurityUtils.sanitizeInput('normal text')).toBe('normal text');
    });
  });

  describe('validateId', () => {
    it('should validate IDs correctly', () => {
      expect(SecurityUtils.validateId('valid-id-123')).toBe(true);
      expect(SecurityUtils.validateId('invalid#id')).toBe(false);
      expect(SecurityUtils.validateId('')).toBe(false);
    });
  });

  describe('generateNonce', () => {
    it('should generate unique nonces', () => {
      const nonce1 = SecurityUtils.generateNonce();
      const nonce2 = SecurityUtils.generateNonce();
      
      expect(nonce1).toBeTruthy();
      expect(nonce2).toBeTruthy();
      expect(nonce1).not.toBe(nonce2);
    });
  });
});


