function debounceAwait<T, A extends any[]>(func: (...args: A) => Promise<T>): (...args: A) => Promise<T | void> {
    let isWaiting = false;

    return async (...args: A) => {
        if (isWaiting) {
            return;
        }
        isWaiting = true;
        try {
            return await func(...args);
        } finally {
            isWaiting = false;
        }
    };
}

export default debounceAwait;
