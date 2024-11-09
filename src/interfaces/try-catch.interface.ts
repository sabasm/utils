export interface TryCatchOptions {
  errorHandler?: (error: unknown) => void;
  retryAttempts?: number;
  retryDelay?: number;
  fallbackValue?: any;
  logError?: boolean;
  transformError?: (error: unknown) => Error;
}


