<template>
  <div class="compound-widget-container" :style="dynamicStyles" ref="compoundWidgetElement">
    <move-icon class="move-handle"></move-icon>

     <p>Type: <code>{{taxonomyRef}}</code></p>

    <div class="widget" v-for="taxon in taxons" :style="styleOverrides" ref="widgets">
      <taxon-select :value="taxon.value">
      </taxon-select>

      <div class="level-container">
        <x-circle-icon class="widget-close-icon"></x-circle-icon>

        <span v-for="n in taxon.level">
          <circle-icon :width="16" :height="16" class="circle-icon"></circle-icon>
        </span>

        <plus-circle-icon class="widget-add-icon"
                          :width="16" :height="16"></plus-circle-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, {VueConstructor} from 'vue';
import {mapGetters} from 'vuex';
import { Draggable } from 'gsap/Draggable';
import CircleIcon from '@/components/CircleIcon.vue';
import PlusCircleIcon from '@/components/PlusCircleIcon.vue';
import MoveIcon from '@/components/MoveIcon.vue';
import TaxonSelect from '@/components/TaxonSelect.vue';
import { XCircleIcon } from 'vue-feather-icons';
import typeGuards from '@/type-guards';
import assert from '@/assert';

import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';

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
    components: {MoveIcon, XCircleIcon, TaxonSelect, CircleIcon, PlusCircleIcon},
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
            console.log("foo");
        },
        onRelease(): void {
            console.log("bar");
        },
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
}

.widget-add-icon {
    margin-left: @space-small;
    stroke: @grey;
}
</style>
