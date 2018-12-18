import { Node } from 'tree-model';

export interface TaxonomyNodeModel {
    content: string;
    id: number;
    label: string;
}

export type TaxonomyNode = Node<TaxonomyNodeModel>

export interface MyNodeModel {
    content: string;
    id: number;
    label: string;
}

export type MyNode = Node<MyNodeModel>

export type TransitionCallback = () => void;

export interface SwapParameters {
    sourceIndex: number;
    targetIndex: number;
}

export interface KillTaxonSelectorParameters {
    compoundWidgetIndex: number;
    taxonSelectorIndex: number;
}

interface TaxonInfo {
    level: number;
    value: string;
}

export interface PathSegment {
    nodeId: number;
    isVisible: boolean;
}

export interface CompoundWidget {
    taxonomyRef: string | null;
    taxons: TaxonInfo[];
    isCurrentlyBeingDragged: boolean;
    selectedPath: PathSegment[];
}


// Visible taxon is derived state and is calculated by a getter.
export interface VisibleTaxon {
    value: string;
    level: number;    // 1-based
    isVisible: boolean;
}
