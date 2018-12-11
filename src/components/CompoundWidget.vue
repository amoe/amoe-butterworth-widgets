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
import Vue from 'vue';
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
}

export default Vue.extend({
    props: ['taxonomyRef', 'taxons', 'styleOverrides'],
    data() {
        return {
            currentlyBeingDragged: false
        };
    },
    components: {MoveIcon, XCircleIcon, TaxonSelect, CircleIcon, PlusCircleIcon},
    mounted() { 
        console.log("inside mounted callback");
        if (typeGuards.isElement(this.$refs.compoundWidgetElement)) {
            const compoundWidget: Element = this.$refs.compoundWidgetElement;

            const handle = compoundWidget.querySelector('.move-handle');
            assert(handle !== null, "move handle must be found");

            console.log("I  will try to bind the draggable to element %o", handle);
            
            const vars = {
                trigger: handle,
                type: 'x',
                onPress: () => this.currentlyBeingDragged = true,
                onRelease: () => this.currentlyBeingDragged = false,
                onDragEnd: this.onDragEnd
            };

            Draggable.create(compoundWidget, vars);
        }
    },
    computed: {
        // styles for the compound widget itself -- styleOverrides only used
        // for styling the taxons
        dynamicStyles(): object {
            if (this.currentlyBeingDragged) {
                return { 
                    'border-width': 'medium',
                    'border-style': 'dashed',
                    'border-color': 'black'
                };
            } else {
                return {};
            }
        }
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
        onDragEnd(): void {
            console.log("dragend");
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

.widget {
    display: flex;
    flex-direction: column;

    // A widget has a fixed height of 8em.

/*    background-color: @lightgreen;*/

    /*
    background-image: linear-gradient(
        to right,
        rgba(26, 198, 204, 0.5),
        rgba(26, 198, 204, 1.0) 50%,
        rgba(26, 198, 204, 0.5)
    );
    */

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
