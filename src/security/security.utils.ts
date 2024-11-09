export class SecurityUtils {
  static sanitizeInput(input: string): string {
    return input.replace(/<(\/?[^>]+)>/g, '$1>');
  }

  static validateId(id: string): boolean {
    return /^[a-zA-Z0-9-]+$/.test(id);
  }

  static generateNonce(): string {
    return Math.random().toString(36).substring(2);
  }
}
