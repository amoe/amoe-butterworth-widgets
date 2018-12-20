import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import mc from '@/mutation-constants';
import {
    TaxonomyNode, TaxonomyNodeModel, SwapParameters,
    KillTaxonSelectorParameters, HideTaxonSelectorParameters,
    CompoundWidget, VisibleTaxon, PathSegment,
    RootState, TaxonomiesCache
} from '@/types'
import TreeModel from 'tree-model';
import _ from 'lodash';
import sampleData from '@/sample-data';
import util from '@/util';

import * as log from 'loglevel';

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


const store: StoreOptions<RootState> = {
    state: {
        // This is used for the TS2View
        widgetState: [
            { isVisible: true }
        ],
        taxonomyData: TAXONOMY_DATA,
        selectedPathTS2: [],

        // This is used for the orthodox view
        compoundWidgets: [],
        taxonomiesData: {}
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
            const path = state.compoundWidgets[params.compoundWidgetIndex].selectedPath;
            path.splice(params.taxonSelectorIndex);
        },
        [mc.SHUFFLE_TAXON_SELECTORS]: (state) => {
            state.compoundWidgets.forEach(c => {
                c.taxons = _.shuffle(c.taxons);
            });
        },
        [mc.LOAD_SAMPLE_DATA]: (state) => {
            state.compoundWidgets = sampleData;
        },
        [mc.ADD_COMPOUND_WIDGET]: (state) => {
            state.compoundWidgets.push(util.makeEmptyCompoundWidget());
        },
        [mc.INITIALIZE_TAXONOMIES]: (state, taxonomiesData) => {
            state.taxonomiesData = taxonomiesData;
        },
        [mc.HIDE_TAXON_SELECTOR]: (state, params: HideTaxonSelectorParameters) => {
            const path = state.compoundWidgets[params.compoundWidgetIndex].selectedPath;
            path[params.taxonSelectorIndex].isVisible = false;
        },
    },
    actions: {
    },
    getters: {
        taxonomyTree(state, getters) {
            return treeModel.parse<TaxonomyNodeModel>(state.taxonomyData);
        },
        selectedPathTS2(state, getters) {
            return state.selectedPathTS2;
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
        },
        getSelectedPath(state) {
            return (index: number): PathSegment[] => state.compoundWidgets[index].selectedPath;
        },
        taxonomies(state): TaxonomiesCache {
            const allKeys = Object.keys(state.taxonomiesData);
            const result: TaxonomiesCache = {};

            allKeys.forEach(k => {
                result[k] = treeModel.parse<TaxonomyNodeModel>(state.taxonomiesData[k]);
            });

            return result;
        },
        getTaxonsByCompoundWidgetIndex(state, getters) {
            return (index: number) => {
                const thisCompoundWidget = state.compoundWidgets[index];
                const taxonomyType = thisCompoundWidget.taxonomyRef;
                const selectedPath = thisCompoundWidget.selectedPath;

                if (taxonomyType === null) {
                    throw new Error("can't happen");
                }

                log.debug("looking up taxonomy type %o", taxonomyType);

                log.debug("taxonomies list %o", getters.taxonomies);

                const targetTaxonomy = getters.taxonomies[taxonomyType];
                log.debug("locating in target taxonomy %o", targetTaxonomy);
                log.debug("selectedpath is %o", selectedPath);

                // This might be disgustingly inefficient but we're just
                // going to ignore that for now.

                const nodes = selectedPath.map(
                    segment => util.getNodeById(targetTaxonomy, segment.nodeId)
                );

                // Some values are propagated from the path segment.
                const result = nodes.map((n, index) => {
                    return {
                        value: n.model.content,
                        level: index + 1,
                        isVisible: selectedPath[index].isVisible
                    }
                });

                return result;
            };
        }
    }
};


export default new Vuex.Store<RootState>(store);
