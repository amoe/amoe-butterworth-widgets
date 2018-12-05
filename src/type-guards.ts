function isElementArray(value: any): value is Element[] {
    return value.length !== undefined;
}

// Any DOM element has a tagName, this was defined in DOM 1.0 (1998)
function isElement(value: any): value is Element {
    return value.tagName !== undefined;
}

function isSvgGraphicsElement(value: any): value is SVGGraphicsElement {
    return value.transform !== undefined;
}


export default { isElementArray, isElement, isSvgGraphicsElement };
