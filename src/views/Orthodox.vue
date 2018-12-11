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

const TAXONOMY_DATA = {
    'children': [{'content': 'Rock', 'id': 1, 'label': 'Taxon'},
                 {'content': 'Classical', 'id': 2, 'label': 'Taxon'}],
    'content': 'Music',
    'id': 0,
    'label': 'Taxon'
}

const config = {};
const t = new TreeModel(config)

export default Vue.extend({
    name: '',
    components: {WidgetView},
    data() {
        return {
            someArray: [1, 2, 3],
            anotherArray: [4, 5, 6],
            taxonomies: {'Music': t.parse(TAXONOMY_DATA)}
        }
    },
    mounted() {
        log.debug("root is %o", this.taxonomies);
    }
});
</script>

<style lang="less">

</style>
