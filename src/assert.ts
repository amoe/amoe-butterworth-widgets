function assert(condition: boolean, message: string): void {
    if (condition !== true) {
        throw new Error("assertion failed: " + message);
    }
}

export default assert;
