export class ValidationUtils {
  static isValidPage(page: number): boolean {
    return Number.isInteger(page) && page > 0;
  }

  static isValidLimit(limit: number, maxLimit: number = 100): boolean {
    return Number.isInteger(limit) && limit > 0 && limit <= maxLimit;
  }

  static normalizePageParams(page: number, limit: number, maxLimit: number = 100): {
    page: number;
    limit: number;
  } {
    return {
      page: Math.max(1, page),
      limit: Math.min(maxLimit, Math.max(1, limit))
    };
  }
}


