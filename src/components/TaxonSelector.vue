<template>
  <div class="widget"
       :style="styleOverrides" 
       ref="widgets">
    <select class="taxon-select">
      <option v-for="sibling in siblings">{{sibling.content}}</option>
    </select>

    <div class="level-container">
      <x-circle-icon class="widget-close-icon"
                     v-on:click="kill">
      </x-circle-icon>

      <span v-for="n in taxon.level">
        <circle-icon :width="16" :height="16" class="circle-icon"></circle-icon>
      </span>

      <plus-circle-icon class="widget-add-icon"
                        :width="16" :height="16"
                        v-on:click="addTaxonSelector">
      </plus-circle-icon>
    </div>

    <button v-on:click="hide">Hide</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapGetters} from 'vuex';
import mc from '@/mutation-constants';
import * as log from 'loglevel';
import {TaxonomyNodeModel, PathSegment} from '@/types';
import { XCircleIcon } from 'vue-feather-icons';
import CircleIcon from '@/components/CircleIcon.vue';
import PlusCircleIcon from '@/components/PlusCircleIcon.vue';
import util from '@/util';

export default Vue.extend({
    props: ['index', 'styleOverrides', 'taxon', 'selectedPath', 'taxonomyRef'],
    components: { XCircleIcon, CircleIcon, PlusCircleIcon },
    data() {
        return {
        };
    },
    created() {
        console.log("I consumed a REAL taxon.");
        console.log("The taxon is called %o", this.taxon);
    },
    methods: {
        kill(): void {
            // Need to pass the buck to the parent because we don't know which
            // compound element we are
            this.$emit('killed', this.index);
        },
        hide(): void {
            this.$emit('hidden', this.index);
        },
        addTaxonSelector(): void {
            log.info("I would add a new taxon selector to this compound widget");
            this.$store.commit(mc.MAKE_TENTATIVE_SELECTOR, this.index);
        }
    },
    computed: {
        siblings(this: any): TaxonomyNodeModel[] {
            const parentLevel = this.level - 1;

            const pathStem: PathSegment[] = this.selectedPath.slice(0, parentLevel);

            const siblings = util.findValidChildren(
                this.taxonomies[this.taxonomyRef],
                pathStem.map(s => s.nodeId)
            );

            return siblings.map(n => n.model);
        }, ...mapGetters(['taxonomies'])
    }
});
</script>

<style lang="less">
@import "../assets/variables.less";


.widget {
    display: flex;
    flex-direction: column;

    padding-top: @space-medium;
    padding-bottom: @space-medium;


    // Outset border gives it the raised quality.
    // To make these 'absorb' into each other, we could try first-child and 
    // last-child CSS properties.

    border-top: @widget-border-style;
    border-bottom: @widget-border-style;
    border-radius: @roundedness;

    min-width: 0;

    width: 8em;
    overflow: hidden;
}

.widget:first-child {
    border-left: @widget-border-style;
}
.widget:last-child {
    border-right: @widget-border-style;
}

.level-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    color: @orange;
}

.widget-close-icon {
    width: 1em;
    height: 1em;
    cursor: pointer;
}

.widget-add-icon {
    stroke: @grey;
    cursor: pointer;
}

.taxon-select {
    min-width: 8em;
    background-color: @offwhite;
    margin: @space-small;
}
</style>
