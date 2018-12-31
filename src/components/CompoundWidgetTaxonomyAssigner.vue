<template>
  <div class="widget compound-widget-taxonomy-assigner" ref="widgets">
    <select class="taxon-select">
      <option v-for="taxonomy in availableTaxonomies">{{taxonomy}}</option>
    </select>

    <div class="level-container">
      <x-circle-icon class="widget-close-icon"
                     v-on:click="spewDebugInfo">
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

export default Vue.extend({
    components: { XCircleIcon, CircleIcon, PlusCircleIcon },
    methods: {
        addTaxonSelector() {

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
