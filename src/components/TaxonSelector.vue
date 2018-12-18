<template>
  <div class="widget"
       :style="styleOverrides" 
       ref="widgets">
    Levels below this one?  {{hasLevelsBelowThis}}
    Visibility?  {{taxonOrFresh.isVisible}}
    
    <select class="taxon-select">
      <option selected>{{taxonOrFresh.value}}</option>
    </select>

    <div class="level-container">
      <x-circle-icon class="widget-close-icon"
                     v-on:click="kill">
      </x-circle-icon>

      <span v-for="n in taxonOrFresh.level">
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
import {TaxonomyNode, PathSegment, VisibleTaxon} from '@/types';
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
        kill(): void {
            // Need to pass the buck to the parent because we don't know which
            // compound element we are
            this.$emit('killed', this.index);
        },
        hide(): void {
            this.$emit('hidden', this.index);
        },
        addTaxonSelector(): void {
            log.debug("I would add a new taxon selector to this compound widget");
        }
    },
    computed: {
        // This is a hack to deal with the fact that n+1 widgets is always
        // rendered.  It doesn't matter too much because the changes are
        // decoupled from the data itself.
        taxonOrFresh(): VisibleTaxon {
            if (this.taxon === undefined) {
                return {
                    value: "",
                    level: this.level,
                    isVisible: true
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

            log.debug("will return filtered elements for level %o", level);
            log.debug("path is currently %o", this.selectedPath);

            // Slice to level-1, because index is 1-based and the slice should
            // be empty on the first level
            const pathStem: PathSegment[] = this.selectedPath.slice(0, level - 1);

            // Strip the path to the node ID only
            return util.findValidChildren(
                this.taxonomies[this.taxonomyRef],
                pathStem.map(s => s.nodeId)
            );
        },
        hasLevelsBelowThis() {
            return this.filteredChildren.length > 0;
        }
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
