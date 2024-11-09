import { Observable, from, catchError, retry, isObservable, of, throwError } from 'rxjs';
import { TryCatchOptions } from '../interfaces/try-catch.interface';

export function tryCatch<T>(
  operation: () => T | Promise<T> | Observable<T>,
  options: TryCatchOptions = {}
): Observable<T | undefined> {
  const {
    errorHandler,
    retryAttempts = 0,
    retryDelay = 1000,
    fallbackValue,
    logError = true,
    transformError = (e: unknown) => (e instanceof Error ? e : new Error(String(e))),
  } = options;

  try {
    const result = operation();
    const source$ = isObservable(result) ? result : from(Promise.resolve(result));

    return source$.pipe(
      retry({ count: retryAttempts, delay: retryDelay }),
      catchError((error: unknown) => {
        const transformedError = transformError(error);
        if (errorHandler) {
          errorHandler(transformedError);
        } else if (logError) {
          console.error('Operation failed:', transformedError);
        }
        return fallbackValue !== undefined ? of(fallbackValue) : throwError(() => transformedError);
      })
    );
  } catch (error) {
    const transformedError = transformError(error);
    if (errorHandler) {
      errorHandler(transformedError);
    } else if (logError) {
      console.error('Operation failed:', transformedError);
    }
    return fallbackValue !== undefined ? of(fallbackValue) : throwError(() => transformedError);
  }
}


