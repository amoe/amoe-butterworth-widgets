<template>
  <div class="widget-taxonomy-type-group" ref="widgetGroups">
    <move-icon class="move-handle"></move-icon>

    <p>Type: <code>{{taxonomyRef}}</code></p>

    <div class="widget" v-for="taxon in taxons" 
         v-bind:style="widgetStyle[taxonomyType]"
         ref="widgets">
      <x-circle-icon class="widget-close"></x-circle-icon>

      <taxon-select :value="taxon.value">
      </taxon-select>

      <div class="level-container">
        <span v-for="n in taxon.level">
          <circle-icon :width="16" :height="16" class="circle-icon"></circle-icon>
        </span>
        <span>
          <plus-circle-icon :width="16" :height="16"></plus-circle-icon>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import CircleIcon from '@/components/CircleIcon.vue';
import PlusCircleIcon from '@/components/PlusCircleIcon.vue';
import TaxonSelect from '@/components/TaxonSelect.vue';
import { XCircleIcon, MoveIcon } from 'vue-feather-icons';

import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';

interface ColorScaleCache {
    [key: string]: object;
}

export default Vue.extend({
    props: ['taxonomyRef', 'taxons'],
    components: {MoveIcon, XCircleIcon, TaxonSelect, CircleIcon, PlusCircleIcon},
    computed: {
    }
});
</script>

<style lang="less">
@import "../assets/variables.less";

.widget-taxonomy-type-group {
    display: flex;
    flex-direction: row;
    padding: @space-medium;
    min-width: 0;
    //background-color: red;
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
</style>
