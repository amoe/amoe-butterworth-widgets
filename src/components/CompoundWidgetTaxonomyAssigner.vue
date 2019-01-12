<template>
  <div class="widget compound-widget-taxonomy-assigner" ref="widgets">
    <select class="taxon-select" v-model="chosenTaxonomy">
      <option v-for="taxonomy in availableTaxonomies">{{taxonomy}}</option>
    </select>

    <div class="level-container">
      <x-circle-icon class="widget-close-icon"
                     v-on:click="killCompoundWidget">
      </x-circle-icon>

      <span v-for="n in 1">
        <circle-icon :width="16" :height="16" class="circle-icon"></circle-icon>
      </span>

      <plus-circle-icon class="widget-add-icon"
                        :width="16" :height="16"
                        v-on:click="addTaxonSelector">
      </plus-circle-icon>
    </div>

    <button v-on:click="spewDebugInfo">Hide</button>
  </div>
</template>

<script lang="ts">
import { XCircleIcon } from 'vue-feather-icons';
import CircleIcon from '@/components/CircleIcon.vue';
import PlusCircleIcon from '@/components/PlusCircleIcon.vue';
import Vue from 'vue';
import {mapGetters} from 'vuex';
import mc from '@/mutation-constants';

export default Vue.extend({
    data() {
        return {
            chosenTaxonomy: "Music" as string | null   // for debugging
        };
    },
    props: {
        index: {type: Number, required: true}
    },
    components: { XCircleIcon, CircleIcon, PlusCircleIcon },
    methods: {
        addTaxonSelector() {
            console.log("About to add taxon selector");
            if (this.chosenTaxonomy === null) {
                throw new Error("Must select a taxonomy");
            }

            this.$store.commit(mc.SET_TAXONOMY_REF, 
                               {compoundWidgetIndex: this.index, taxonomyRef: this.chosenTaxonomy});
            this.$store.commit(mc.MAKE_TENTATIVE_SELECTOR, this.index);
        },
        killCompoundWidget() {
            // Hitting the kill button for the taxonomy selector should
            // kill the entire compound widget.
            this.$store.commit(mc.KILL_COMPOUND_WIDGET, this.index);
        },
        spewDebugInfo() {
            console.log("called with arguments %o", arguments);
        }
    },
    computed: { 
       availableTaxonomies(this: any): string[] {
           return Object.keys(this.taxonomies);
       },
       ...mapGetters(["taxonomies"])
    }
});
</script>

<style lang="less">
</style>
