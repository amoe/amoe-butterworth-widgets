// Payloads for vuex mutations

import { NodeIdentifier } from '@/types';

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

export interface SetTaxonomyRefParameters {
    compoundWidgetIndex: number;
    taxonomyRef: string;
}

export interface AddPathSegmentParameters {
    compoundWidgetIndex: number;
    nodeId: NodeIdentifier;
}



export interface ReplacePathSegmentParameters {
    compoundWidgetIndex: number;
    selectedPathIndex: number;
    nodeIdentifier: NodeIdentifier;
}
