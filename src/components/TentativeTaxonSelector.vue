<template>
  <div class="widget tentative-taxon-selector" ref="widgets">
    <select class="taxon-select">
      <option v-for="item in childrenOfCurrentPath">{{item}}</option>
    </select>

    <div class="level-container">
      <x-circle-icon class="widget-close-icon"
                     v-on:click="spewDebugInfo">
      </x-circle-icon>

      <span v-for="n in largestCurrentPath">
        <circle-icon :width="16" :height="16" class="circle-icon"></circle-icon>
      </span>

      <plus-circle-icon class="widget-add-icon"
                        :width="16" :height="16"
                        v-on:click="spewDebugInfo">
      </plus-circle-icon>
    </div>

    <button v-on:click="spewDebugInfo">Hide</button>
  </div>
</template>

<script lang="ts">
import { XCircleIcon } from 'vue-feather-icons';
import CircleIcon from '@/components/CircleIcon.vue';
import {mapGetters} from 'vuex';
import PlusCircleIcon from '@/components/PlusCircleIcon.vue';
import {TaxonomyNode} from '@/types';
import Vue from 'vue';
import util from '@/util';

export default Vue.extend({
    props: ['selectedPath', 'taxonomyRef'],
    data() {
        return {
            largestCurrentPath: 2,
            items: ['foo', 'bar', 'baz']
        };
    },
    created() {
    },
    methods: {
        spewDebugInfo() {
            console.log("spew debug info %o", arguments);
        }
    },
    components: { XCircleIcon, CircleIcon, PlusCircleIcon },
    computed: {
        childrenOfCurrentPath(this: any): string[] {
            console.log("value of selectedPath is %o", this.selectedPath);

            // If the value is empty then we just want to return all children of
            // this taxonomy.  This is part of the responsibility of the findValidChildren
            // method.

            // Strip the path to the node ID only
            const result = util.findValidChildren(
                this.taxonomies[this.taxonomyRef],
                this.selectedPath.map((s: TaxonomyNode) => s.nodeId)
            );

            return ['foo', 'bar', 'baz'];
        },
        ... mapGetters(['taxonomies'])
    }
});
</script>

<style lang="less">
</style>
