<template>
  <div class="home">

    <p>Some text</p>

    <div class="widget-container">
      <div class="widget-taxonomy-type-group"
           v-for="taxonomyType in sortedTaxonomyTypeKeys"
           ref="widgetGroups">
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


    <div class="floating-widget-container">
      <div class="floating-widget" v-for="floatingWidget in floatingWidgets">
        <p>Foo</p>
      </div>
    </div>

    <button v-on:click="addFloatingWidget">Add new floating widget</button>
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
    floatingWidgets: object[];
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
            },
            floatingWidgets: [
                {}
            ]
        };
    },
    mounted() {
        if (typeGuards.isElementArray(this.$refs.widgets)) {
            const target: Element[] = this.$refs.widgets;
            // Lock to the x-axis
            const vars = {
                type: 'x'
            };

            Draggable.create(target, vars);
        }

        // if (typeGuards.isElementArray(this.$refs.widgetGroups)) {
        //     const target: Element[] = this.$refs.widgetGroups;
        //     console
        //     const vars = {};

        //     Draggable.create(target, vars);
        // }
    },
    methods: {
        add(taxonomyType: string): void {
            const blankWidget: WidgetInstance = {
                level: 4,
                value: "Blank"
            };

            this.widgets[taxonomyType].push(blankWidget);
        },
        addFloatingWidget(): void {
            console.log("adding floating widget");
            this.floatingWidgets.push({});
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
            scale.range(d3ScaleChromatic.schemePastel1);

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
    background-color: red;
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

.taxon-name {
    margin-left: 1em;
    margin-right: 1em;
    background-color: @offwhite;
}

.floating-widget-container {
    border: 1px solid green;
    padding: @space-medium;
    width: 512px;
    height: 512px;
}

.floating-widget {
    border: 2px dashed black;
    margin: @space-medium;
}

</style>
