import { MyNodeModel, MyNode } from '@/types';
import { Node } from 'tree-model';
import * as log from 'loglevel';

function getVirtualRoot(rootNode: MyNode, wantedPath: number[]): MyNode {
    log.debug("inside getVirtualRoot");
    if (wantedPath.length === 0) {
        log.debug("returning root node");
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
        throw new Error("not found: " + leaf);
    }
}

function findValidChildren(
    rootNode: Node<MyNodeModel>, wantedPath: number[]
): MyNodeModel[] {
    const virtualRoot: MyNode = getVirtualRoot(rootNode, wantedPath);
    const children: MyNode[] = virtualRoot.children;
    log.debug("number of children found was " + children.length);
    const result = children.map(n => n.model);
    log.debug("returning %o", JSON.stringify(result.map(n => n.content)));
    return result;
};

export default { findValidChildren };

