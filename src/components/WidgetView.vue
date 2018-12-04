<template>
  <div class="home">
    <p>Some text</p>

    <div class="main-view-container">
      <!-- We need a separate column class, because we don't want to drag the
           attached operator as well as the group itself. -->
      <div class="widget-group-column"
           v-for="(compoundWidgetDefinition, index) in compoundWidgets">
        <compound-widget v-bind="compoundWidgetDefinition"
                         :widget-style="widgetStyle"/>

        <!-- add serif if we are not the last -->
        <serif-operator v-if="index < (compoundWidgets.length - 1)"></serif-operator>
      </div>
    </div>


    <div class="floating-widget-container">
      <div class="floating-widget" v-for="floatingWidget in floatingWidgets"
           ref="floatingWidgets">
        <p>Some floating widget</p>
      </div>
    </div>

    <button v-on:click="addFloatingWidget">Add new floating widget</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import CompoundWidget from '@/components/CompoundWidget.vue';
import { Draggable } from 'gsap/Draggable';
import typeGuards from '@/type-guards';
import SerifOperator from '@/components/SerifOperator.vue';
import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';


interface TaxonomyTypeIndex {
    [key: string]: TaxonomyTypeInfo;
};

interface ColorScaleCache {
    [key: string]: object;
};

interface TaxonomyTypeInfo {
};

interface CompoundWidget {
    taxonomyRef: string;
    taxons: TaxonInfo[];
};

interface TaxonInfo {
    level: number;
    value: string;
};

interface ComponentData {
    taxonomyTypes: TaxonomyTypeIndex;
    compoundWidgets: CompoundWidget[];
    floatingWidgets: any;
};


export default Vue.extend({
    name: 'home',
    components: {SerifOperator, CompoundWidget},
    props: ['taxonomies'],
    data(): ComponentData {
        return {
            taxonomyTypes: {
                'Occupation': {},
                'Place': {},
            },
            compoundWidgets: [
                {
                    taxonomyRef: 'Occupation',
                    taxons: [
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
                    ]
                },
                {
                    taxonomyRef: 'Place',
                    taxons: [
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
            ],
            floatingWidgets: [
                {}
            ],
        };
    },
    created() {
        console.log("using taxonomies: %o", this.taxonomies);
    },
    mounted() {
/*
        if (typeGuards.isElementArray(this.$refs.widgets)) {
            const target: Element[] = this.$refs.widgets;
            // Lock to the x-axis
            const vars = {
                type: 'x'
            };

            Draggable.create(target, vars);
        }
*/
/*
        if (typeGuards.isElementArray(this.$refs.widgetGroups)) {
            // We can't use the same approach here, because trigger element
            // is taken to be relative to the document rather than the
            // draggable element.
            this.$refs.widgetGroups.forEach(this.setupWidgetGroupDraggable);
        }

        this.$nextTick(this.bindFloatingDraggables);
        */
    },
    methods: {
        setupWidgetGroupDraggable(group: Element): void {
            const handle = group.querySelector('.move-handle');
            // fixme check null
            
            const vars = {
                trigger: handle
            };

            Draggable.create(group, vars);
        },
        /*
        add(taxonomyType: string): void {
            const blankWidget: WidgetInstance = {
                level: 4,
                value: "Blank"
            };

            this.compoundWidgets[taxonomyType].push(blankWidget);
        },
        */
        addFloatingWidget(): void {
            console.log("adding floating widget");
            this.floatingWidgets.push({});
        },
        bindFloatingDraggables(): void {
            if (typeGuards.isElementArray(this.$refs.floatingWidgets)) {
                const widgets: Element[] = this.$refs.floatingWidgets;


                const newWidgets = widgets.filter(
                    w => Draggable.get(w) === undefined
                );

                Draggable.create(newWidgets, {});
            }
        }
    },
    computed: {
        sortedTaxonomyTypeKeys(): string[] {
            const keys = Object.keys(this.taxonomyTypes);
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
    },
    updated() {
    },
    watch: {
        floatingWidgets: function (newValue, oldValue) {
            console.log("watch called on floating widgets");
            console.log("floating widgets are %o", this.$refs.floatingWidgets);

            // Next tick is essential here otherwise we miss the one that's
            // just about to be rendered
            this.$nextTick(this.bindFloatingDraggables);
        }
    }
});
</script>

<style lang="less">
@import "../assets/variables.less";

.main-view-container {
    display: flex;
    border: thin solid @grey;
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

// Contains both a widget-group and a possible serif operator
.widget-group-column {
    display: flex;
    flex-direction: row;
}
</style>
