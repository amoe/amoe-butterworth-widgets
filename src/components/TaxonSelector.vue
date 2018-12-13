<template>
  <div class="widget"
       :style="styleOverrides" 
       ref="widgets">
    <select class="taxon-select">
      <option selected>{{taxonOrFresh.value}}</option>
    </select>

    <div class="level-container">
      <x-circle-icon class="widget-close-icon"
                     v-on:click="killTaxonSelector">
      </x-circle-icon>

      <span v-for="n in taxonOrFresh.level">
        <circle-icon :width="16" :height="16" class="circle-icon"></circle-icon>
      </span>

      <plus-circle-icon class="widget-add-icon"
                        :width="16" :height="16"
                        v-on:click="addTaxonSelector">
      </plus-circle-icon>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapGetters} from 'vuex';
import mc from '@/mutation-constants';
import * as log from 'loglevel';
import {TaxonomyNode} from '@/types';
import { XCircleIcon } from 'vue-feather-icons';
import CircleIcon from '@/components/CircleIcon.vue';
import PlusCircleIcon from '@/components/PlusCircleIcon.vue';
import util from '@/util';

// The problem is that this individual taxon selector needs some way to know
// about the selected path, which is a property of the parent compoundwidget. 
//  No problem, we can just pass it in as a prop?

export default Vue.extend({
    props: ['index', 'styleOverrides', 'taxon', 'selectedPath', 'taxonomyRef'],
    components: { XCircleIcon, CircleIcon, PlusCircleIcon },
    data() {
        return {
            level: this.taxon === undefined ? this.index + 1 : this.taxon.level
        }
    },
    methods: {
        killTaxonSelector(): void {
            // Need to pass the buck to the parent because we don't know which
            // compound element we are
            this.$emit('killed', this.index);
        },
        addTaxonSelector(): void {
            console.log("I would add a new taxon selector to this compound widget");
        }
    },
    computed: {
        // This is a hack to deal with the fact that n+1 widgets is always
        // rendered.  It doesn't matter too much because the changes are
        // decoupled from the data itself.
        taxonOrFresh(): object {
            if (this.taxon === undefined) {
                return {
                    value: "",
                    level: this.level
                };
            } else {
                return this.taxon;
            }
        },
        taxonomies(this: any) {
            return this.$store.getters.taxonomies;
        },
        filteredChildren(): TaxonomyNode[] {
            // We have the taxonomy tree.  We have a selected path.
            // Selected path should be cut off to the value of this.level,
            // Then passed to the finding method.

            const level = this.level;

            console.log("will return filtered elements for level %o", level);
            console.log("path is currently %o", this.selectedPath);

            // Slice to level-1, because index is 1-based and the slice should
            // be empty on the first level
            const pathSegment = this.selectedPath.slice(0, level - 1);

            return util.findValidChildren(this.taxonomies[this.taxonomyRef], pathSegment);
        }
    }
});
</script>

<style lang="less">
@import "../assets/variables.less";
</style>
