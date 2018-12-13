<template>
  <div class="compound-widget-container" :style="dynamicStyles" ref="compoundWidgetElement">
    <move-icon class="move-handle"></move-icon>

     <p>Type: <code>{{taxonomyRef}}</code></p>

    <transition-group name="taxon-slide" tag="div">
      <taxon-selector v-for="(taxon, index) in taxons"
                      :key="taxon.level">
      </taxon-selector>
    </transition-group>
  </div>
</template>

<script lang="ts">
import Vue, {VueConstructor} from 'vue';
import {mapGetters} from 'vuex';
import { Draggable } from 'gsap/Draggable';
import CircleIcon from '@/components/CircleIcon.vue';
import PlusCircleIcon from '@/components/PlusCircleIcon.vue';
import MoveIcon from '@/components/MoveIcon.vue';
import { XCircleIcon } from 'vue-feather-icons';
import typeGuards from '@/type-guards';
import assert from '@/assert';
import mc from '@/mutation-constants';

import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as log from 'loglevel';

interface ColorScaleCache {
    [key: string]: object;
};

interface CompoundWidgetRefs {
    $refs: {
        compoundWidgetElement: Element,
        widgets: Element[]
    }
};

type AugmentedVue = VueConstructor<Vue & CompoundWidgetRefs>;

export default (Vue as AugmentedVue).extend({
    props: ['compoundWidgetIndex', 'taxonomyRef', 'taxons', 'styleOverrides'],
    data() {
        return {
        };
    },
    components: {MoveIcon, XCircleIcon, CircleIcon, PlusCircleIcon},
    mounted() { 
        // nothing happens here because all the draggable binding is handled in
        // the parent widgetview
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
        currentlyBeingDragged(this: any): boolean {
            return this.isSpecificCompoundWidgetBeingDragged(this.compoundWidgetIndex);
        },
        ... mapGetters(['isSpecificCompoundWidgetBeingDragged'])
    },
    methods: {
        setupCompoundWidgetDraggable(group: Element): void {
        },
        onPress(): void {
            log.debug("foo");
        },
        onRelease(): void {
            log.debug("bar");
        },
        killTaxonSelector(taxonSelectorIndex: number): void {
            log.info("Would kill taxon selector with index", taxonSelectorIndex);

            const params = {
                compoundWidgetIndex: this.compoundWidgetIndex,
                taxonSelectorIndex: taxonSelectorIndex
            };

            this.$store.commit(mc.KILL_TAXON_SELECTOR, params);
        },
        addTaxonSelector(): void {
            console.log("I would add a new taxon selector to this compound widget");
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
    margin: 1em;
    color: @orange;
}

.widget-close-icon {
    width: 1em;
    height: 1em;
    margin-right: @space-small;
    cursor: pointer;
}

.widget-add-icon {
    margin-left: @space-small;
    stroke: @grey;
    cursor: pointer;
}

.taxon-select {
    min-width: 8em;
    background-color: @offwhite;
    margin: @space-small;
}

</style>
