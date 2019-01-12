<template>
  <div class="widget"
       :style="styleOverrides" 
       ref="widgets">
    <select class="taxon-select" v-on:change="onChanged" v-model="selectedTaxon">
      <option v-for="sibling in siblings"
              :value="sibling.uri">{{sibling.content}}</option>
    </select>

    <div class="level-container">
      <x-circle-icon class="widget-close-icon"
                     v-on:click="kill">
      </x-circle-icon>

      <span v-for="i in humanFriendlyTaxonLevel">
        <circle-icon v-on:click="hideTaxonSelector(i)"
                     :width="16" 
                     :height="16" :class="getCircleIconClasses(i)"></circle-icon>
      </span>

      <plus-circle-icon :class="plusCircleClasses"
                        :width="16" :height="16"
                        v-on:click="addTaxonSelector">
      </plus-circle-icon>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapGetters} from 'vuex';
import mc from '@/mutation-constants';
import * as log from 'loglevel';
import {
    TaxonomyNodeModel, PathSegment, NodeIdentifier, TaxonomiesCache,
} from '@/types';
import { HideTaxonSelectorParameters } from '@/requests';
import { XCircleIcon } from 'vue-feather-icons';
import CircleIcon from '@/components/CircleIcon.vue';
import PlusCircleIcon from '@/components/PlusCircleIcon.vue';
import util from '@/util';
import {ComputedClassesSpec} from '@/types';
import {getPlusCircleClasses} from '@/taxon-utilities';

export default Vue.extend({
    props: [
        'index', 'styleOverrides', 'taxon', 'selectedPath',
        'taxonomyRef', 'compoundWidgetIndex'
    ],
    components: { XCircleIcon, CircleIcon, PlusCircleIcon },
    data() {
        return {
            selectedTaxon: this.taxon.value as string
        };
    },
    created() {
        console.log("I consumed a REAL taxon.");
        console.log("The taxon is called %o", this.taxon);
    },
    methods: {
        onChanged(): void {
            const compoundWidgetIndex = this.compoundWidgetIndex;
            const selectedPathIndex = this.index;
            const nodeIdentifier: NodeIdentifier = this.selectedTaxon;
            const taxonContent = this.selectedTaxon;

            this.$store.commit(mc.REPLACE_PATH_SEGMENT, {
                compoundWidgetIndex,
                selectedPathIndex,
                nodeIdentifier,
                taxonContent
            });
        },
        kill(): void {
            // Need to pass the buck to the parent because we don't know which
            // compound element we are
            this.$emit('killed', this.index);
        },
        hideTaxonSelector(level: number): void {
            const index = level - 1;
            
            const parameters: HideTaxonSelectorParameters = {
                compoundWidgetIndex: this.compoundWidgetIndex,
                taxonSelectorIndex: index
            }

            this.$store.commit(mc.TOGGLE_TAXON_SELECTOR_VISIBILITY, parameters);
        },
        addTaxonSelector(): void {
            log.info("I would add a new taxon selector to this compound widget");

            if (!this.hasRemainingChildren) {
                throw new Error("no remaining children");
            }

            this.$store.commit(mc.MAKE_TENTATIVE_SELECTOR, this.index);
        },
        getNodesAtPathLevel(cutLevel: number): TaxonomyNodeModel[] {
            const thisPathSegment: PathSegment = this.selectedPath[this.index];
            
            const pathStem: PathSegment[] = this.selectedPath.slice(0, cutLevel);

            const siblings = util.findValidChildren(
                this.taxonomies[this.taxonomyRef],
                util.getFlatPath(pathStem)
            );

            const result = siblings.map(n => n.model);
            console.log("called from index %o, sibling result was %o, stem size is %o", this.index, result, pathStem.length);
            return result;
        },
        getCircleIconClasses(level: number): ComputedClassesSpec {
            const relevantIndex = level - 1;

            const isVisible = this.$store.getters.getTaxonSelectorVisibility(
                this.compoundWidgetIndex,
                relevantIndex
            );

            const classes: ComputedClassesSpec = {
                'circle-icon': true
            };

            if (isVisible) {
                classes['ob-enabled'] = true;
            } else {
                classes['ob-disabled'] = false;
            }
            
            return classes;
        }
    },
    computed: {
        canAddLevel(): boolean {
            const thisPathSegment: PathSegment = this.selectedPath[this.index];
            return thisPathSegment.hasDefiniteValue() && this.hasRemainingChildren;
        },
        plusCircleClasses(): ComputedClassesSpec {
            return getPlusCircleClasses(this.canAddLevel);
        },
        humanFriendlyTaxonLevel(): number {
            return this.taxon.level;
        },
        taxonomies(): TaxonomiesCache {
            return this.$store.getters.taxonomies;
        },
        // If you think about it, this method only applies for the taxonselector, not the tentativeone.
        // Because the tentative should show children of the level above it.
        // But the regular one should show 
        siblings(): TaxonomyNodeModel[] {
            return this.getNodesAtPathLevel(this.taxon.level - 1);
        },
        hasRemainingChildren(): boolean {
            const children = this.getNodesAtPathLevel(this.taxon.level);
            return children.length > 0;
        },
    }
});
</script>

<style lang="less">
@import "../assets/variables.less";


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

    width: 8em;
    overflow: hidden;
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
    color: @orange;
}

.widget-close-icon {
    width: 1em;
    height: 1em;
    cursor: pointer;
}

.taxon-select {
    min-width: 8em;
    background-color: @offwhite;
    margin: @space-small;
}
</style>
