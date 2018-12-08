import { MyNodeModel, MyNode } from '@/types';
import { Node } from 'tree-model';

function getVirtualRoot(rootNode: MyNode, wantedPath: number[]): MyNode {
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
        throw new Error("not found: " + leaf);
    }
}

function findValidChildren(
    rootNode: Node<MyNodeModel>, wantedPath: number[]
): MyNodeModel[] {
    const virtualRoot: MyNode = getVirtualRoot(rootNode, wantedPath);
    const children: MyNode[] = virtualRoot.children;
    console.log("number of children found was " + children.length);
    const result = children.map(n => n.model);
    console.log("returning %o", JSON.stringify(result.map(n => n.content)));
    return result;
};

export default { findValidChildren };

