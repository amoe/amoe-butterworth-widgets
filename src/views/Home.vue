<template>
  <div>
  <widget-view></widget-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TreeModel from 'tree-model';
import WidgetView from '@/components/WidgetView.vue'; // @ is an alias to /src


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
            taxonomyRoot: t.parse(TAXONOMY_DATA)
        }
    },
    mounted() {
        console.log("root is %o", this.taxonomyRoot);
    }
});
</script>

<style lang="less">

</style>
