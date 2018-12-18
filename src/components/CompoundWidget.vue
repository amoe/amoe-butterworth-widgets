<template>
  <div class="compound-widget-container" :style="dynamicStyles" ref="compoundWidgetElement">
    <move-icon class="move-handle"></move-icon>

     <p>Type: <code>{{taxonomyRef}}</code></p>

    <transition-group name="taxon-slide" tag="div">
      <!-- Vue numeric loop is 1-based.  Subtract 1 from n to get the index.
           But also, we want to iterate one past the end of the array to create
           a fresh unfilled TS.  -->
      <taxon-selector v-for="n in (taxons.length + 1)"
                      v-on:killed="killTaxonSelector"
                      :taxon="taxons[n - 1]"
                      :key="getTaxonSelectorKey(n - 1)"
                      :index="n - 1"
                      :selected-path="selectedPath"
                      :taxonomy-ref="taxonomyRef"
                      :style-overrides="taxonStyleOverrides">
      </taxon-selector>
    </transition-group>
  </div>
</template>

<script lang="ts">
import Vue, {VueConstructor} from 'vue';
import {mapGetters} from 'vuex';
import { Draggable } from 'gsap/Draggable';
import MoveIcon from '@/components/MoveIcon.vue';
import typeGuards from '@/type-guards';
import {TaxonInfo} from '@/types';
import assert from '@/assert';
import mc from '@/mutation-constants';
import TaxonSelector from '@/components/TaxonSelector.vue';

import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as log from 'loglevel';

interface ColorScaleCache {
    [key: string]: object;
};

interface CompoundWidgetRefs {
    $refs: {
        compoundWidgetElement: Element
    }
};

type AugmentedVue = VueConstructor<Vue & CompoundWidgetRefs>;

export default (Vue as AugmentedVue).extend({
    props: ['compoundWidgetIndex', 'taxonomyRef', 'taxonStyleOverrides'],
    data() {
        return {
        };
    },
    components: {MoveIcon,TaxonSelector},
    mounted() { 
        // nothing happens here because all the draggable binding is handled in
        // the parent widgetview
    },
    created() {
        log.debug("Compound widget has taxons %o", this.taxons);
    },
    computed: {
        // styles for the compound widget itself -- styleOverrides only used
        // for styling the taxons
        dynamicStyles(): object {
            if (this.currentlyBeingDragged) {
                return { 
                    'border-width': 'medium',
                    'border-style': 'dashed',
                    'border-color': 'black',
                    'background-color': 'hsla(0, 0%, 63%, 0.9)'   // transparenty grey
                };
            } else {
                return {};
            }
        },
        // go through method-style getters to get specific compound widget properties
        currentlyBeingDragged(this: any): boolean {
            return this.isSpecificCompoundWidgetBeingDragged(this.compoundWidgetIndex);
        },
        taxons(this: any): TaxonInfo[] {
            return this.getTaxonsByCompoundWidgetIndex(this.compoundWidgetIndex);
        },
        selectedPath(this: any): number[] {
            return this.getSelectedPath(this.compoundWidgetIndex);
        }, ...mapGetters([
            'isSpecificCompoundWidgetBeingDragged',
            'getSelectedPath',
            'getTaxonsByCompoundWidgetIndex'
        ])
    },
    methods: {
        getTaxonSelectorKey(index: number): number {
            // This is very tricky code here
            if (index === this.taxons.length) {
                return index + 1;
            } else {
                return this.taxons[index].level;
            }
        },
        killTaxonSelector(taxonSelectorIndex: number) {
            log.info("Would kill taxon selector with index", taxonSelectorIndex);

            const params = {
                compoundWidgetIndex: this.compoundWidgetIndex,
                taxonSelectorIndex: taxonSelectorIndex
            };

            this.$store.commit(mc.KILL_TAXON_SELECTOR, params);
        }
    }
});
</script>

<style lang="less">
@import "../assets/variables.less";

.compound-widget-container {
    display: flex;
    flex-direction: row;
    padding: @space-medium;
    min-width: 0;

    // Initial border is invisible.  This prevents the adjacent compound widgets
    // from shuffling rightwards when a border is shown later
    border-width: medium;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0);
}

// Do a leave transition over 2 seconds, whatever it may be
.taxon-slide-leave-active {
    transition: all 2s;
}

// The actual transform to execute
.taxon-slide-leave-to {
    transform: translateX(10px);
    opacity: 0;
}


// Because vue transition creates a wrapper div around the transition'ed elements,
// we need to style that div to layout the elements correctly.
.compound-widget-container > div {
    display: flex;
    flex-direction: row;
}

</style>
