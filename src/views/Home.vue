<template>
  <div class="home">

    <p>Some text</p>

    <x-circle-icon></x-circle-icon>

    <div class="widget-container">
      <div class="widget-taxonomy-type-group"
           v-for="taxonomyType in sortedTaxonomyTypeKeys">
        <p>Type: <code>{{taxonomyType}}</code></p>

        <div class="widget" v-for="widget in widgets[taxonomyType]" ref="widgets"
             v-bind:style="widgetStyle[taxonomyType]">
          <x-circle-icon class="widget-close"></x-circle-icon>

          <taxon-select :value="widget.value">
          </taxon-select>

          <div class="level-container">
            <span v-for="n in widget.level">
              <circle-icon :width="16" :height="16" class="circle-icon"></circle-icon>
            </span>
            <span>
              <plus-circle-icon :width="16" :height="16"></plus-circle-icon>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

import CircleIcon from '@/components/CircleIcon.vue';
import PlusCircleIcon from '@/components/PlusCircleIcon.vue';

import TaxonSelect from '@/components/TaxonSelect.vue';
import { XCircleIcon } from 'vue-feather-icons';
import { Draggable } from 'gsap/Draggable';
import typeGuards from '@/type-guards';


import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';

interface WidgetInstance {
    level: number;
    value: string;
};

interface TaxonomyTypes {
    [key: string]: WidgetInstance[];
};

interface ComponentData {
    widgets: TaxonomyTypes;
};

interface ColorScaleCache {
    [key: string]: object;
}

export default Vue.extend({
    name: 'home',
    components: { CircleIcon, PlusCircleIcon, TaxonSelect, XCircleIcon },
    data(): ComponentData {
        return {
            widgets: {
               'Occupation': [
                   {
                       level: 1,
                       value: "Manufacturing"
                   },
                   {
                       level: 2,
                       value: "Wood workers"
                   },
                   {
                       level: 3,
                       value: "Bandbox-maker"
                   },

               ],
               'Place': [
                   {
                       level: 1,
                       value: "Country"
                   },
                   {
                       level: 2,
                       value: "France"
                   }

               ]

            }
        };
    },
    mounted() {
        if (typeGuards.isElementArray(this.$refs.widgets)) {
            const target: Element[] = this.$refs.widgets;
            const vars = {};

            Draggable.create(target, vars);
        }
    },
    methods: {
        add(taxonomyType: string): void {
            const blankWidget: WidgetInstance = {
                level: 4,
                value: "Blank"
            };

            this.widgets[taxonomyType].push(blankWidget);
        }
    },
    computed: {
        sortedTaxonomyTypeKeys(): string[] {
            const keys = Object.keys(this.widgets);
            keys.sort();
            return keys;
        },
        widgetStyle(): object {
            // Render widget styles upfront, this might enable vue to cache
            // these calls
            const scale = d3Scale.scaleOrdinal();
            scale.domain(this.sortedTaxonomyTypeKeys);
            scale.range(d3ScaleChromatic.schemeAccent);

            const result: ColorScaleCache = {};
            this.sortedTaxonomyTypeKeys.forEach(taxonomyType => {
                result[taxonomyType] = {
                    'background-color': scale(taxonomyType)
                };
            });

            return result;
        }
    }
});
</script>

<style lang="less">
@import "../assets/variables.less";

.widget-container {
    display: flex;
    border: thin solid @grey;
}

.widget-taxonomy-type-group {
    display: flex;
    flex-direction: row;
    border-right: medium solid @offblack;
    padding: @space-medium;
    min-width: 0;
}



.widget {
    display: flex;
    flex-direction: column;

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
    margin-left: @space-medium;
    margin-right: @space-medium;


    // Outset border gives it the raised quality.
    border-width: 0.2em;
    border-style: outset;
    border-color: hsl(0, 0%, 90%);
    border-radius: @roundedness;

    min-width: 0;
}

.level-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 1em;
    color: @orange;
}

.taxon-name {
    margin-left: 1em;
    margin-right: 1em;
    background-color: @offwhite;
}
</style>
