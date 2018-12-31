<template>
  <div class="widget tentative-taxon-selector" ref="widgets">
    <select class="taxon-select">
      <option selected>foo</option>
    </select>

    <div class="level-container">
      <x-circle-icon class="widget-close-icon"
                     v-on:click="spewDebugInfo">
      </x-circle-icon>

      <span v-for="n in largestCurrentPath">
        <circle-icon :width="16" :height="16" class="circle-icon"></circle-icon>
      </span>

      <plus-circle-icon class="widget-add-icon"
                        :width="16" :height="16"
                        v-on:click="spewDebugInfo">
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

export default Vue.extend({
    methods: {
        spewDebugInfo() {
            console.log("spew debug info %o", arguments);
        }
    },
    components: { XCircleIcon, CircleIcon, PlusCircleIcon },
    data() {
        return {
            largestCurrentPath: 2
        };
    }
});
</script>

<style lang="less">
</style>
