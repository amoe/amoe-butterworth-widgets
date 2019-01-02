<template>
  <div class="widget tentative-taxon-selector" ref="widgets">
    <select class="taxon-select" v-model="currentChosenTaxon">
      <option v-for="nodeModel in childrenOfCurrentPath"
              :value="nodeModel.uri">{{nodeModel.content}}</option>
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
                        v-on:click="confirmTentativeTaxon">
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
import {TaxonomyNode, TaxonomyNodeModel, NodeIdentifier} from '@/types';
import {AddPathSegmentParameters} from '@/requests';
import Vue from 'vue';
import util from '@/util';
import mc from '@/mutation-constants';

export default Vue.extend({
    props: ['selectedPath', 'taxonomyRef', 'index'],
    data() {
        return {
            largestCurrentPath: 2,   // FIXME FIXME FIXME!
            currentChosenTaxon: null as NodeIdentifier | null
        };
    },
    created() {
    },
    methods: {
        spewDebugInfo() {
            console.log("spew debug info %o", arguments);
        },
        confirmTentativeTaxon() {
            console.log("chosen taxon is %o", this.currentChosenTaxon);

            if (this.currentChosenTaxon === null) {
                throw new Error("must choose a taxon");
            }

            const parameters: AddPathSegmentParameters = {
                compoundWidgetIndex: this.index,
                nodeId: this.currentChosenTaxon
            };

            this.$store.commit(mc.ADD_PATH_SEGMENT, parameters);
        }
    },
    components: { XCircleIcon, CircleIcon, PlusCircleIcon },
    computed: {
        childrenOfCurrentPath(this: any): TaxonomyNodeModel[] {
            console.log("value of selectedPath is %o", this.selectedPath);

            // If the value is empty then we just want to return all children of
            // this taxonomy.  This is part of the responsibility of the findValidChildren
            // method.

            // Strip the path to the node ID only
            const result = util.findValidChildren(
                this.taxonomies[this.taxonomyRef],
                this.selectedPath.map((s: TaxonomyNode) => s.nodeId)
            );

            return result.map(n => n.model);
        },
        ... mapGetters(['taxonomies'])
    }
});
</script>

<style lang="less">
</style>
