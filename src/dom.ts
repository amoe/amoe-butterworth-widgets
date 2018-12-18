import { TweenMax } from 'gsap';
import * as log from 'loglevel';


// Get the boundingbox of respective elements, calculate
// the diff and animate to the same values
function warp(elementToMove: Element, targetElement: Element): void {
    const box = targetElement.getBoundingClientRect();
    const targetLeft = box.left;

    log.debug("targetLeft is %o", targetLeft);


    const sourceLeft = elementToMove.getBoundingClientRect().left;
    log.debug("sourceLeft is %o", sourceLeft);

    const diff = sourceLeft - targetLeft;

    log.debug("will move %o", diff);

    TweenMax.to(elementToMove, 1, { x: -diff });
}

export default { warp };
