import { ValidationUtils } from '../../validation/validation.utils';

describe('ValidationUtils', () => {
  describe('isValidPage', () => {
    it('should validate page numbers correctly', () => {
      expect(ValidationUtils.isValidPage(1)).toBe(true);
      expect(ValidationUtils.isValidPage(0)).toBe(false);
      expect(ValidationUtils.isValidPage(-1)).toBe(false);
      expect(ValidationUtils.isValidPage(1.5)).toBe(false);
    });
  });

  describe('isValidLimit', () => {
    it('should validate limits correctly', () => {
      expect(ValidationUtils.isValidLimit(10, 100)).toBe(true);
      expect(ValidationUtils.isValidLimit(0, 100)).toBe(false);
      expect(ValidationUtils.isValidLimit(150, 100)).toBe(false);
      expect(ValidationUtils.isValidLimit(10.5, 100)).toBe(false);
    });
  });

  describe('normalizePageParams', () => {
    it('should normalize page parameters', () => {
      expect(ValidationUtils.normalizePageParams(0, 0)).toEqual({ page: 1, limit: 1 });
      expect(ValidationUtils.normalizePageParams(2, 20, 50)).toEqual({ page: 2, limit: 20 });
      expect(ValidationUtils.normalizePageParams(-1, 150, 100)).toEqual({ page: 1, limit: 100 });
    });
  });
});


