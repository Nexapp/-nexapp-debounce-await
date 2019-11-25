import { debounceAwait } from '../src';

class OnDemandPromise {
    public readonly promise: Promise<any>;
    public resolveFunction: ((value?: any) => void) | undefined;

    constructor() {
        this.promise = new Promise(resolve => {
            this.resolveFunction = resolve;
        });
    }
}

function setup() {
    const onDemandPromise = new OnDemandPromise();
    const vanillaFunction = jest.fn(() => onDemandPromise.promise);
    const debouncedFunction = debounceAwait(vanillaFunction);
    return { onDemandPromise, vanillaFunction, debouncedFunction };
}

describe('DebounceAwait', () => {
    describe('When calling the debounced function once', () => {
        const { onDemandPromise, vanillaFunction, debouncedFunction } = setup();
        it('should call the vanilla function once', async () => {
            const resultPromise = debouncedFunction();
            onDemandPromise.resolveFunction!();
            await resultPromise;

            expect(vanillaFunction).toBeCalledTimes(1);
        });
    });

    describe('When calling the debounced function twice before completion', () => {
        const { onDemandPromise, vanillaFunction, debouncedFunction } = setup();
        it('should call the vanilla function only once', async () => {
            const resultPromise = debouncedFunction();
            await debouncedFunction();
            onDemandPromise.resolveFunction!();
            await resultPromise;

            expect(vanillaFunction).toBeCalledTimes(1);
        });
    });

    describe('When calling the debounced function again after completion', () => {
        const { onDemandPromise, vanillaFunction, debouncedFunction } = setup();
        it('should call the vanilla function twice', async () => {
            onDemandPromise.resolveFunction!();
            await debouncedFunction();
            await debouncedFunction();

            expect(vanillaFunction).toBeCalledTimes(2);
        });
    });

    describe('When calling two instances of the debounced function', () => {
        const { onDemandPromise, vanillaFunction, debouncedFunction } = setup();
        const debouncedFunction2 = debounceAwait(vanillaFunction);
        it('should call the vanilla function twice', async () => {
            const resultPromise = debouncedFunction();
            const resultPromise2 = debouncedFunction2();
            onDemandPromise.resolveFunction!();
            await Promise.all([resultPromise, resultPromise2]);

            expect(vanillaFunction).toBeCalledTimes(2);
        });
    });
});
