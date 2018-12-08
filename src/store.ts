import Vue from 'vue';
import Vuex from 'vuex';
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
        widgetState: [] as WidgetData[],
        taxonomyData: TAXONOMY_DATA,
        selectedPath: [],
    },
    mutations: {
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
        addNewWidget(state, getters) {
            state.widgetState.push({ isVisible: true });
        }
    }
});
