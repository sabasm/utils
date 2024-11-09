import { TryCatchOptions } from "../interfaces/try-catch.interface";
import { Observable, from, of, isObservable } from 'rxjs';

function wrapResultInObservable<T>(result: T | Promise<T> | Observable<T>): Observable<T> {
  if (isObservable(result)) {
    return result;
  }
  if (result instanceof Promise) {
    return from(result);
  }
  return of(result);
}

function handleDecoratorError<T>(error: unknown, options: TryCatchOptions): Observable<T> {
  const { errorHandler, logError = true, fallbackValue } = options;
  if (errorHandler) {
    errorHandler(error);
  } else if (logError) {
    console.error('Operation failed:', error);
  }
  return fallbackValue !== undefined ? of(fallbackValue as T) : from(Promise.reject(error));
}

export function WithTryCatch<T>(options: TryCatchOptions = {}) {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => Observable<T>>
  ): TypedPropertyDescriptor<(...args: any[]) => Observable<T>> {
    const originalMethod = descriptor.value;
    if (!originalMethod) return descriptor;

    descriptor.value = function (this: any, ...args: any[]): Observable<T> {
      try {
        const result = originalMethod.apply(this, args);
        return wrapResultInObservable(result);
      } catch (error) {
        return handleDecoratorError(error, options);
      }
    };

    return descriptor;
  };
}
