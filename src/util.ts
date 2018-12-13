import { TaxonomyNode, CompoundWidget } from '@/types';
import { DraggableConstructor } from 'gsap/Draggable';

function getVirtualRoot(rootNode: TaxonomyNode, wantedPath: number[]): TaxonomyNode {
    console.log("inside getVirtualRoot");
    if (wantedPath.length === 0) {
        console.log("returning root node");
        return rootNode;
    }

    // Find the leaf of the path...
    const leaf = wantedPath[wantedPath.length - 1]
    const result = rootNode.all(function(node): boolean {
        return node.model.id === leaf;
    });
    if (result.length === 1) {
        return result[0];
    } else {
        // Should throw, but we just warn to avoid any weird event bugs
        //        console.warn("Could not find virtual root with id %o", leaf);
        throw new Error("not found: " + leaf);
    }
}

function findValidChildren(
    rootNode: TaxonomyNode, wantedPath: number[]
): TaxonomyNode[] {
    const virtualRoot = getVirtualRoot(rootNode, wantedPath);
    return virtualRoot.children;
};


function getCollidingElements(d: DraggableConstructor, validElements: Element[]) {
    return validElements.filter(e => d.hitTest(e, '50%'));
}

function makeEmptyCompoundWidget(): CompoundWidget {
    return {
        taxonomyRef: null,
        taxons: [],
        isCurrentlyBeingDragged: false
    };
}


export default { findValidChildren, getCollidingElements, makeEmptyCompoundWidget };
