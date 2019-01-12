import { PathSegment, TaxonDisplayInfo, NodeIdentifier } from '@/types';

export class DefinedPathSegment implements PathSegment {
    isVisible: boolean;
    nodeId: NodeIdentifier;
    content: string;

    constructor(id: NodeIdentifier, content: string) {
        this.isVisible = true;
        this.nodeId = id;
        this.content = content;
    }

    toTaxonDisplayInfo(level: number): TaxonDisplayInfo {
        return {
            level: level,
            value: this.content,
            isVisible: this.isVisible
        }
    }


    hasDefiniteValue(): boolean {
        return true;
    }

    toPathElements(): NodeIdentifier[] {
        return [this.nodeId]
    }
}

export class TentativePathSegment implements PathSegment {
    isVisible: boolean;

    constructor() {
        this.isVisible = true;
    }

    hasDefiniteValue(): boolean {
        return false;
    }

    toTaxonDisplayInfo(level: number): TaxonDisplayInfo {
        if (level < 1)
            throw new Error("level must be 1-based");

        return {
            level: level,
            value: "",
            isVisible: this.isVisible
        }
    }

    // It should not be counted.
    toPathElements(): NodeIdentifier[] {
        return [];
    }
}
