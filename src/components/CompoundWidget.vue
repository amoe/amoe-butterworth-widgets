<template>
  <div class="compound-widget-container" :style="dynamicStyles" ref="compoundWidgetElement">
    <move-icon class="move-handle"></move-icon>

    <transition-group name="taxon" tag="div">
      <compound-widget-taxonomy-assigner key="taxonomyAssigner"
                                         :index="compoundWidgetIndex"
                                         :selected-path="selectedPath">
      </compound-widget-taxonomy-assigner>
      
      <taxon-selector v-for="(taxon, index) in taxons"
                      v-if="taxon.isVisible"
                      v-on:killed="killTaxonSelector"
                      :taxon="taxon"
                      :key="taxon.level"
                      :index="index"
                      :selected-path="selectedPath"
                      :taxonomy-ref="taxonomyRef"
                      :compound-widget-index="compoundWidgetIndex"
                      :style-overrides="taxonStyleOverrides"/>
    </transition-group>

  </div>
</template>

<script lang="ts">
import Vue, {VueConstructor} from 'vue';
import {mapGetters} from 'vuex';
import { Draggable } from 'gsap/Draggable';
import MoveIcon from '@/components/MoveIcon.vue';
import CompoundWidgetTaxonomyAssigner from '@/components/CompoundWidgetTaxonomyAssigner.vue';
import typeGuards from '@/type-guards';
import {TaxonDisplayInfo, PathSegment} from '@/types';
import assert from '@/assert';
import mc from '@/mutation-constants';
import TaxonSelector from '@/components/TaxonSelector.vue';

import _ from 'lodash'
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
    components: {MoveIcon,TaxonSelector, CompoundWidgetTaxonomyAssigner},
    mounted() { 
        // nothing happens here because all the draggable binding is handled in
        // the parent widgetview
    },
    created() {
        log.debug("Compound widget has taxons %o", this.taxons);
        log.debug("value of selectedpath in cw is %o", this.selectedPath);
    },
    computed: {
        // Why does this exist?  Because v-for over an integer creates a 1-based
        // loop which is not what we want.
        taxonIndices(): number[] {
            // const BLANK_PATH_SEGMENTS = 0;
            // return _.range(this.taxons.length + BLANK_PATH_SEGMENTS);
            return _.range(this.taxons.length);
        },
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
        taxons(this: any): TaxonDisplayInfo[] {
            return this.getTaxonsByCompoundWidgetIndex(this.compoundWidgetIndex);
        },
        thisCompoundWidgetHasTentativeTaxonSelector(this: any): boolean {
            return this.hasTentativeTaxonSelector(this.compoundWidgetIndex);
        },
        selectedPath(this: any): PathSegment[] {
            return this.getSelectedPath(this.compoundWidgetIndex);
        }, ...mapGetters([
            'isSpecificCompoundWidgetBeingDragged',
            'getSelectedPath',
            'getTaxonsByCompoundWidgetIndex',
            'hasTentativeTaxonSelector'
        ])
    },
    methods: {
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
    border-radius: 4px;
}

// Do a leave transition over 2 seconds, whatever it may be
.taxon-leave-active:not(.tentative-taxon-selector) {
    transition: width 0.5s ease-in;

    /* You can do opacity overrides here, but you can't do background-color
       overrides, because 'taxonStyleOverrides' will determine that and it
       has higher specificity */
    opacity: 0.3;
}

// The actual transform to execute
.taxon-leave-to {
    width: 0px;
}


// Because vue transition creates a wrapper div around the transition'ed elements,
// we need to style that div to layout the elements correctly.
.compound-widget-container > div {
    display: flex;
    flex-direction: row;
}


.widget-add-icon {
    // nothing here yet
}

.widget-add-icon.ob-enabled {
    stroke: @offblack;
    cursor: pointer;
}
.widget-add-icon.ob-disabled {
    stroke: @grey;
    cursor: pointer;
}

.circle-icon {
    // nothing here yet
}

.circle-icon.ob-enabled {
    fill: hsl(22.4,100%,40%);
    stroke: hsl(22.4,100%,85%);
}

.circle-icon.ob-disabled {
    fill: none;
}

</style>
