import { Observable, of } from "rxjs";
import { WithTryCatch } from "../../try-catch/try-catch.decorators";

export class TestClass {
    @WithTryCatch<string>()
    successMethod(): Observable<string> {
        return of('success');
    }

    @WithTryCatch<string>({ fallbackValue: 'fallback' })
    errorMethod(): Observable<string> {
        throw new Error('test error');
    }

    @WithTryCatch<string>()
    syncMethod(): Observable<string> {
        return of('sync success');
    }

    @WithTryCatch<string>({ fallbackValue: 'sync fallback' })
    syncErrorMethod(): Observable<string> {
        throw new Error('sync error');
    }
}