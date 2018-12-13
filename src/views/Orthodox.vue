<template>
  <div>
  <widget-view :taxonomies="taxonomies"></widget-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TreeModel from 'tree-model';
import WidgetView from '@/components/WidgetView.vue'; // @ is an alias to /src
import * as log from 'loglevel';
import {TaxonomyNodeModel} from '@/types';

const MUSIC_TAXONOMY_JSON = {
    'children': [{'content': 'Rock', 'id': 1, 'label': 'Taxon',
                  'children': [{'content': 'Metal', 'id': 3, 'label': 'Taxon'}]},
                 {'content': 'Classical', 'id': 2, 'label': 'Taxon',
                  'children': [{'content': 'Baroque', 'id': 4, 'label': 'Taxon'}]}],
    'content': 'Music',
    'id': 0,
    'label': 'Taxon'
};

const OCCUPATION_TAXONOMY_JSON = {
    'children': [{'content': 'Manufacturing', 'id': 1, 'label': 'Taxon',
                  'children': [
                      {'content': 'Wood workers',
                       'id': 2, 
                       'label': 'Taxon', 
                       'children': [
                           {'content': 'Bandbox-maker',
                            'id': 3,
                            'label': 'Taxon'}
                       ]}
                  ]}],

    'content': 'Occupation',
    'id': 0,
    'label': 'Taxon'
};

const PLACE_TAXONOMY_JSON = {
    'children': [{'content': 'Country', 'id': 1, 'label': 'Taxon',
                  'children': [
                      {'content': 'France',
                       'id': 2, 
                       'label': 'Taxon'}]
                 }],
    'content': 'Place',
    'id': 0,
    'label': 'Taxon'
};


const config = {};
const t = new TreeModel(config)

export default Vue.extend({
    name: '',
    components: {WidgetView},
    data() {
        return {
            someArray: [1, 2, 3],
            anotherArray: [4, 5, 6],
            taxonomies: {
                'Music': t.parse<TaxonomyNodeModel>(MUSIC_TAXONOMY_JSON),
                'Occupation': t.parse<TaxonomyNodeModel>(OCCUPATION_TAXONOMY_JSON),
                'Place': t.parse<TaxonomyNodeModel>(PLACE_TAXONOMY_JSON)
            }
        }
    },
    mounted() {
        log.debug("root is %o", this.taxonomies);
    }
});
</script>

<style lang="less">

</style>
