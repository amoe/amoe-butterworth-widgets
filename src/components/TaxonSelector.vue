<template>
  <div class="widget"
       :style="styleOverrides" 
       ref="widgets">
    <select class="taxon-select">
      <option selected>{{taxonOrFresh.value}}</option>
    </select>

    <div class="level-container">
      <x-circle-icon class="widget-close-icon"
                     v-on:click="killTaxonSelector">
      </x-circle-icon>

      <span v-for="n in taxonOrFresh.level">
        <circle-icon :width="16" :height="16" class="circle-icon"></circle-icon>
      </span>

      <plus-circle-icon class="widget-add-icon"
                        :width="16" :height="16"
                        v-on:click="addTaxonSelector">
      </plus-circle-icon>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import mc from '@/mutation-constants';
import * as log from 'loglevel';
import { XCircleIcon } from 'vue-feather-icons';
import CircleIcon from '@/components/CircleIcon.vue';
import PlusCircleIcon from '@/components/PlusCircleIcon.vue';

export default Vue.extend({
    props: ['index', 'styleOverrides', 'taxon'],
    components: { XCircleIcon, CircleIcon, PlusCircleIcon },
    methods: {
        killTaxonSelector(): void {
            // Need to pass the buck to the parent because we don't know which
            // compound element we are
            this.$emit('killed', this.index);
        },
        addTaxonSelector(): void {
            console.log("I would add a new taxon selector to this compound widget");
        }
    },
    computed: {
        // This is a hack to deal with the fact that n+1 widgets is always
        // rendered.  It doesn't matter too much because the changes are
        // decoupled from the data itself.
        taxonOrFresh(): object {
            if (this.taxon === undefined) {
                return {
                    value: "",
                    level: this.index + 1
                };
            } else {
                return this.taxon;
            }
        }
    }
});
</script>

<style lang="less">
@import "../assets/variables.less";
</style>
