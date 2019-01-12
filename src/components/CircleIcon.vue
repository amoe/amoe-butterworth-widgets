<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" 
       viewBox="0 0 24 24" fill="none" stroke="currentColor" 
       stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
       class="circle-icon" v-on="inputListeners">
    <circle cx="12" cy="12" r="10">
    </circle>
  </svg>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        'width': {type: Number, required: true},
        'height': {type: Number, required: true}
    },
    computed: {
        inputListeners(): object {
            const customListeners = {};
            return Object.assign({}, this.$listeners, customListeners);
        }
    }
});
</script>
