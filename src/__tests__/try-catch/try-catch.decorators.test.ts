// src/__tests__/try-catch/try-catch.decorators.test.ts
import { TestClass } from './test.class';
import { WithTryCatch } from '../../try-catch/try-catch.decorators';
import { firstValueFrom, Observable } from 'rxjs';

describe('WithTryCatch Decorator', () => {
  let instance: TestClass;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    instance = new TestClass();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should handle successful async methods', async () => {
    const result = await firstValueFrom(instance.successMethod());
    expect(result).toBe('success');
  });

  it('should handle sync errors with fallback', async () => {
    const result = await firstValueFrom(instance.errorMethod());
    expect(result).toBe('fallback');
  });

  it('should handle successful sync methods', async () => {
    const result = await firstValueFrom(instance.syncMethod());
    expect(result).toBe('sync success');
  });

  it('should handle sync errors with fallback', async () => {
    const result = await firstValueFrom(instance.syncErrorMethod());
    expect(result).toBe('sync fallback');
  });

  it('should call error handler and log error', async () => {
    const errorHandler = jest.fn();
    const target = {};
    
    const descriptor: TypedPropertyDescriptor<() => Observable<string>> = {
      value: function(this: any): Observable<string> {
        throw new Error('test error');
      },
      writable: true,
      enumerable: true,
      configurable: true
    };

    const decoratedDescriptor = WithTryCatch<string>({ 
      fallbackValue: 'logged', 
      logError: true, 
      errorHandler 
    })(target, 'throwError', descriptor);

    if (!decoratedDescriptor || !decoratedDescriptor.value) {
      throw new Error('Decorator did not return a valid descriptor');
    }

    const result = await firstValueFrom(decoratedDescriptor.value.call(target));

    expect(result).toBe('logged');
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(errorHandler).toHaveBeenCalled();
  });
});