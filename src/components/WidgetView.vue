<template>
  <div class="home" :key="renderCount">
    <p>Some text</p>
    <button v-on:click="shuffleTaxonSelectors">Shuffle taxon selectors</button>

    <div class="main-view-container" ref="mainViewContainer">
      <!-- We need a separate column class, because we don't want to drag the
           attached operator as well as the group itself. -->
      <div class="widget-group-column"
           v-for="(compoundWidgetDefinition, index) in compoundWidgets">
        <compound-widget v-bind="compoundWidgetDefinition"
                         :compound-widget-index="index"
                         :taxon-style-overrides="widgetStyle[compoundWidgetDefinition.taxonomyRef]"
                         ref="compoundWidgets"/>

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
import {VueConstructor} from 'vue';
import {mapGetters} from 'vuex';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import CompoundWidget from '@/components/CompoundWidget.vue';
import { Draggable, DraggableConstructor } from 'gsap/Draggable';
import typeGuards from '@/type-guards';
import SerifOperator from '@/components/SerifOperator.vue';
import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import mc from '@/mutation-constants';
import assert from '@/assert';
import util from '@/util';
import * as log from 'loglevel';

interface TaxonomyTypeIndex {
    [key: string]: TaxonomyTypeInfo;
};

interface ColorScaleCache {
    [key: string]: object;
};

interface TaxonomyTypeInfo {
};

interface ComponentData {
    taxonomyTypes: TaxonomyTypeIndex;
    floatingWidgets: any;
    renderCount: 0;
};

interface WidgetViewRefs {
    $refs: {
        compoundWidgets: Vue[]
    };
};

type AugmentedVue = VueConstructor<Vue & WidgetViewRefs>;

export default (Vue as AugmentedVue).extend({
    name: 'home',
    components: {SerifOperator, CompoundWidget},
    props: ['taxonomies'],
    data(): ComponentData {
        return {
            taxonomyTypes: {
                'Occupation': {},
                'Place': {},
            },
            floatingWidgets: [
                {}
            ],
            renderCount: 0
        };
    },
    created() {
        log.debug("using taxonomies: %o", this.taxonomies);
    },
    mounted() {
        this.reRender();
    },
    methods: {
        reRender() {
            this.renderCount++;
            this.$nextTick(() => {
                this.setupScrollbar();
                this.bindCompoundWidgets();
            });
        },
        bindCompoundWidgets(): void {
            log.debug("inside mounted callback");
            const widgetsToBind: Element[] = this.getCompoundWidgetElements();
            log.debug("widgets to bind = %o", widgetsToBind);

            // forEach will pass the index to the callback implicitly
            widgetsToBind.forEach(this.bindCompoundWidget);
        },
        bindCompoundWidget(compoundWidget: Element, index: number): void {
            const component = this;
            log.debug("value of compoundWidget is %o", compoundWidget);
            const handle = compoundWidget.querySelector('.move-handle');
            assert(handle !== null, "move handle must be found");

            log.debug("I  will try to bind the draggable to element %o", handle);

            const vars = {
                trigger: handle,
                type: 'x',
                onPress: () => this.$store.commit(mc.COMPOUND_WIDGET_DRAG_FLAG_ON, index),
                onRelease: () => this.$store.commit(mc.COMPOUND_WIDGET_DRAG_FLAG_OFF, index),
                // Need to pass the appropriate index which we know here.
                onDragEnd: function (e: PointerEvent) {
                    component.onDragEnd(this, e, index);
                }
            };
            
            Draggable.create(compoundWidget, vars);
        },
        onDragEnd(draggable: DraggableConstructor, e: PointerEvent, sourceIndex: number) {
            log.debug("drag ended");

            const validElements = this.getCompoundWidgetElements();

            const collisions = util.getCollidingElements(draggable, validElements);

            if (collisions.length === 0) {
                // Spring back to where you were before dragging
                this.reRender();
            } else if (collisions.length > 1) {
                throw new Error("Ambiguous drag");
            } else {
                const targetIndex = validElements.indexOf(collisions[0]);
                this.$store.commit(mc.SWAP_COMPOUND_WIDGETS, {sourceIndex, targetIndex});
                this.reRender();
            }
        },
        getCompoundWidgetElements(): Element[] {
            return this.$refs.compoundWidgets.map(v => v.$el);
        },
        setupScrollbar(): void {
            if (typeGuards.isHTMLElement(this.$refs.mainViewContainer)) {
                const mainViewContainer: HTMLElement = this.$refs.mainViewContainer;
                const options = {
                    suppressScrollY: true,
                    useBothWheelAxes: true    // make it wheel-scrollable
                };
                const ps = new PerfectScrollbar(mainViewContainer, options);
                ps.update();
                log.debug("set up scrollbar with %o", ps);
            }
        },
        addFloatingWidget(): void {
            log.debug("adding floating widget");
            this.floatingWidgets.push({});
        },
        shuffleTaxonSelectors(): void {
            this.$store.commit(mc.SHUFFLE_TAXON_SELECTORS);
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
        },
        ... mapGetters(['compoundWidgets'])
    },
    updated() {
    },
});
</script>

<style lang="less">
@import "../assets/variables.less";

.main-view-container {
    display: flex;
    border: thin solid @grey;
    width: 99vw;
    overflow: hidden;
    position: relative;
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
