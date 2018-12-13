import Vue from 'vue';
import Vuex from 'vuex';
import mc from '@/mutation-constants';
import { TaxonomyNodeModel, SwapParameters, KillTaxonSelectorParameters } from '@/types'
import TreeModel from 'tree-model';
import _ from 'lodash';
import sampleData from '@/sample-data';

Vue.use(Vuex);

const config = {};
const treeModel = new TreeModel(config)

const TAXONOMY_DATA = {
    'children': [{
        'content': 'Rock', 'id': 1, 'label': 'Taxon',
        'children': [{ 'content': 'Metal', 'id': 3, 'label': 'Taxon' }]
    },
    {
        'content': 'Classical', 'id': 2, 'label': 'Taxon',
        'children': [{ 'content': 'Baroque', 'id': 4, 'label': 'Taxon' }]
    }],
    'content': 'Music',
    'id': 0,
    'label': 'Taxon'
};




interface WidgetData {
    isVisible: boolean
};


interface TaxonInfo {
    level: number;
    value: string;
};

interface CompoundWidget {
    taxonomyRef: string;
    taxons: TaxonInfo[];
    isCurrentlyBeingDragged: boolean;
};


export default new Vuex.Store({
    state: {
        // This is used for the TS2View
        widgetState: [
            { isVisible: true }
        ] as WidgetData[],
        taxonomyData: TAXONOMY_DATA,
        selectedPath: [],

        // This is used for the orthodox view
        compoundWidgets: [] as CompoundWidget[],
    },
    mutations: {
        [mc.ADD_NEW_WIDGET]: (state) => {
            state.widgetState.push({ isVisible: true });
        },
        [mc.HIDE_WIDGET]: (state, index) => {
            state.widgetState[index].isVisible = false;
        },
        [mc.COMPOUND_WIDGET_DRAG_FLAG_ON]: (state, index: number) => {
            state.compoundWidgets[index].isCurrentlyBeingDragged = true;
        },
        [mc.COMPOUND_WIDGET_DRAG_FLAG_OFF]: (state, index: number) => {
            state.compoundWidgets[index].isCurrentlyBeingDragged = false;
        },
        [mc.SWAP_COMPOUND_WIDGETS]: (state, params: SwapParameters) => {
            const cutItems = state.compoundWidgets.splice(params.sourceIndex, 1);
            const theItem = cutItems[0];
            state.compoundWidgets.splice(params.targetIndex, 0, theItem);
        },
        [mc.KILL_TAXON_SELECTOR]: (state, params: KillTaxonSelectorParameters) => {
            const taxons = state.compoundWidgets[params.compoundWidgetIndex].taxons;
            taxons.splice(params.taxonSelectorIndex, 1);
        },
        [mc.SHUFFLE_TAXON_SELECTORS]: (state) => {
            state.compoundWidgets.forEach(c => {
                c.taxons = _.shuffle(c.taxons);
            });
        },
        [mc.LOAD_SAMPLE_DATA]: (state) => {
            state.compoundWidgets = sampleData;
        }
    },
    actions: {
    },
    getters: {
        taxonomyTree(state, getters) {
            return treeModel.parse<TaxonomyNodeModel>(state.taxonomyData);
        },
        selectedPath(state, getters) {
            return state.selectedPath;
        },
        definedWidgetCount(state, getters) {
            return state.widgetState.length;
        },
        widgetVisibility(state) {
            return state.widgetState.map(w => w.isVisible);
        },
        // method-style access that's used in the child compound widget
        isSpecificCompoundWidgetBeingDragged(state) {
            return (index: number) => state.compoundWidgets[index].isCurrentlyBeingDragged;
        },
        compoundWidgets(state) {
            return state.compoundWidgets;
        }
    }
});
