import { Module } from 'vuex';
import {
    RootState, WidgetsState, PathSegment, TaxonomiesCache, TaxonomyNodeModel,
    TaxonDisplayInfo, SerializedQuery
} from '@/types';

import {
    HideTaxonSelectorParameters, SwapParameters, KillTaxonSelectorParameters,
    SetTaxonomyRefParameters, AddPathSegmentParameters
} from '@/requests';
import mc from '@/mutation-constants';
import TreeModel from 'tree-model';
import sampleData from '@/sample-data';
import sampleTaxonomyData from '@/sample-taxonomy-data';
import * as log from 'loglevel';
import util from '@/util';
import _ from 'lodash';

const config = {};
const treeModel = new TreeModel(config);

const widgets: Module<WidgetsState, RootState> = {
    state: {
        widgetState: [
            { isVisible: true }
        ],
        taxonomyData: sampleTaxonomyData,
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
        [mc.MAKE_TENTATIVE_SELECTOR]: (state, compoundWidgetIndex: number) => {
            state.compoundWidgets[compoundWidgetIndex].hasTentativeTaxonSelector = true;
        },
        [mc.SET_TAXONOMY_REF]: (state, parameters: SetTaxonomyRefParameters) => {
            state.compoundWidgets[parameters.compoundWidgetIndex].taxonomyRef = parameters.taxonomyRef;
        },
        [mc.ADD_PATH_SEGMENT]: (state, parameters: AddPathSegmentParameters) => {
            const compoundWidget = state.compoundWidgets[parameters.compoundWidgetIndex];

            const newSegment: PathSegment = {
                nodeId: parameters.nodeId,
                isVisible: true
            };

            compoundWidget.selectedPath.push(newSegment);
            compoundWidget.hasTentativeTaxonSelector = false;
        }
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
        hasTentativeTaxonSelector(state) {
            return (index: number) => state.compoundWidgets[index].hasTentativeTaxonSelector;
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
            return (index: number): TaxonDisplayInfo[] => {
                const thisCompoundWidget = state.compoundWidgets[index];
                const taxonomyType = thisCompoundWidget.taxonomyRef;
                const selectedPath = thisCompoundWidget.selectedPath;

                if (taxonomyType === null) {
                    return [];
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
                // The type of this is TaxonInfo.
                const result = nodes.map((n, index) => {
                    return {
                        value: n.model.content,
                        level: index + 1,
                        isVisible: selectedPath[index].isVisible
                    }
                });

                return result;
            };
        },
        serializedQuery(state, getters): SerializedQuery {
            // Narrow the state of each path to its node id which is an immutable
            // string.   Skip ones without a taxonomyRef.
            const result = [];


            for (let w of state.compoundWidgets) {
                if (w.taxonomyRef === null) continue;

                result.push(util.getQuerySegment(w));
            }

            return result;
        }
    }

};

export default widgets;
