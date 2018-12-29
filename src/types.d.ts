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

export interface HideTaxonSelectorParameters {
    compoundWidgetIndex: number;
    taxonSelectorIndex: number;
}

// This is an interface that is never used as concrete state in the store.
// It's only used when laying stuff out.
export interface TaxonDisplayInfo {
    level: number;
    value: string;
    isVisible: boolean;
}

export interface PathSegment {
    nodeId: number;
    isVisible: boolean;
}

export interface CompoundWidget {
    taxonomyRef: string | null;
    isCurrentlyBeingDragged: boolean;
    selectedPath: PathSegment[];
}


// Visible taxon is derived state and is calculated by a getter.
export interface VisibleTaxon {
    value: string;
    level: number;    // 1-based
    isVisible: boolean;
}


interface WidgetData {
    isVisible: boolean
}

// Don't know how to write the type for a JSON tree.
interface TaxonomiesData {
    [key: string]: any
}

export interface TaxonomiesCache {
    [key: string]: TaxonomyNode
}


export interface RootState {
}

export interface WidgetsState {
    widgetState: WidgetData[];   // not used
    taxonomyData: any,
    selectedPathTS2: [];
    // This is used for the orthodox view
    compoundWidgets: CompoundWidget[],
    taxonomiesData: TaxonomiesData;
}
