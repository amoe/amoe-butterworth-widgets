// Payloads for vuex mutations

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
