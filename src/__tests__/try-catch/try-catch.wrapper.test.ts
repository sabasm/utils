import { tryCatch } from '../../try-catch/try-catch.wrapper';
import { firstValueFrom } from 'rxjs';

describe('tryCatch Wrapper', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should handle successful operations', async () => {
    const result = await firstValueFrom(tryCatch(() => Promise.resolve('success')));
    expect(result).toBe('success');
  });

  it('should handle synchronous operations', async () => {
    const result = await firstValueFrom(tryCatch(() => 'success'));
    expect(result).toBe('success');
  });

  it('should handle errors with custom handler', async () => {
    const errorHandler = jest.fn();
    const error = new Error('test error');

    await firstValueFrom(tryCatch(
      () => Promise.reject(error),
      { errorHandler }
    ));

    expect(errorHandler).toHaveBeenCalledWith(error);
  });

  it('should return fallback value on error', async () => {
    const fallbackValue = 'fallback';

    const result = await firstValueFrom(tryCatch(
      () => Promise.reject(new Error('test error')),
      { fallbackValue }
    ));

    expect(result).toBe(fallbackValue);
  });

  it('should transform errors', async () => {
    const transformError = jest.fn(error => new Error(`Transformed: ${error}`));
    const errorHandler = jest.fn();

    await firstValueFrom(tryCatch(
      () => Promise.reject('original error'),
      { transformError, errorHandler }
    ));

    expect(transformError).toHaveBeenCalledWith('original error');
    expect(errorHandler).toHaveBeenCalled();
  });
})
