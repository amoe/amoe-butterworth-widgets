import { TweenMax } from 'gsap';

// Get the boundingbox of respective elements, calculate
// the diff and animate to the same values
function warp(elementToMove: Element, targetElement: Element): void {
    const box = targetElement.getBoundingClientRect();
    const targetLeft = box.left;

    console.log("targetLeft is %o", targetLeft);


    const sourceLeft = elementToMove.getBoundingClientRect().left;
    console.log("sourceLeft is %o", sourceLeft);

    const diff = sourceLeft - targetLeft;

    console.log("will move %o", diff);

    TweenMax.to(elementToMove, 1, { x: -diff });
}

export default { warp };
