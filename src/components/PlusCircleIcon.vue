<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" 
       viewBox="0 0 24 24" fill="none" :stroke="stroke" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round" 
       v-on="inputListeners">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="16"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
  </svg>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        'width': {type: Number, required: true},
        'height': {type: Number, required: true},
        'stroke': {type: String, required: true}
    },
    computed: {
        inputListeners(): object {
            const customListeners = {};
            return Object.assign({}, this.$listeners, customListeners);
        }
    }
});
</script>
