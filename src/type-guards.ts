function isElementArray(value: any): value is Element[] {
    return value.length !== undefined;
}

export default { isElementArray };
