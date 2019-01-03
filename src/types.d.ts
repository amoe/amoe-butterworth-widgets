import { Node } from 'tree-model';

export type NodeIdentifier = string;

export interface TaxonomyNodeModel {
    content: string;
    uri: NodeIdentifier;
    label: string;
}

export type TaxonomyNode = Node<TaxonomyNodeModel>

export type TransitionCallback = () => void;

// This is an interface that is never used as concrete state in the store.
// To reiterate, derived state, calculated by a getter.
// It's only used when laying stuff out.
export interface TaxonDisplayInfo {
    level: number;
    value: string;
    isVisible: boolean;
}

export interface PathSegment {
    isVisible: boolean;
    hasDefiniteValue(): boolean;
    toTaxonDisplayInfo(level: number): TaxonDisplayInfo;
    toPathElements(): NodeIdentifier[];
}

export interface CompoundWidget {
    taxonomyRef: string | null;
    isCurrentlyBeingDragged: boolean;
    selectedPath: PathSegment[];
    hasTentativeTaxonSelector: boolean;
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

export type TaxonomyPath = NodeIdentifier[]

export interface QuerySegment {
    taxonomyRef: string;
    selectedPath: TaxonomyPath;
}

export type SerializedQuery = QuerySegment[]
