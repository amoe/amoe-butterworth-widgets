import Vue from 'vue';
import Vuex from 'vuex';
import mc from '@/mutation-constants';
import { TaxonomyNodeModel } from '@/types'
import TreeModel from 'tree-model';

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

export default new Vuex.Store({
    state: {
        widgetState: [
            { isVisible: true }
        ] as WidgetData[],
        taxonomyData: TAXONOMY_DATA,
        selectedPath: [],
    },
    mutations: {
        [mc.ADD_NEW_WIDGET]: (state) => {
            state.widgetState.push({ isVisible: true });
        },
        [mc.HIDE_WIDGET]: (state, index) => {
            state.widgetState[index].isVisible = false;
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
        }
    }
});
