import { PathSegment, TaxonDisplayInfo, NodeIdentifier } from '@/types';

export class DefinedPathSegment implements PathSegment {
    isVisible: boolean;
    nodeId: NodeIdentifier;

    constructor(id: NodeIdentifier) {
        this.isVisible = true;
        this.nodeId = id;
    }

    toTaxonDisplayInfo(level: number): TaxonDisplayInfo {
        return {
            level: level,
            value: "",// FIXME,  We need to pass in some data that we can
            // return here when we call the constructor???
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
