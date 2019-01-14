<template>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
     stroke-linejoin="round"
     v-on="inputListeners"
     class="add-compound-widget-button">
  <line x1="12" y1="5" x2="12" y2="19" />
  <line x1="5" y1="12" x2="19" y2="12" />
  <title>{{title}}</title>
</svg>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: ['title'],
    computed: {
        inputListeners(): object {
            const customListeners = {};
            return Object.assign({}, this.$listeners, customListeners);
        }
    }
});
</script>

<style lang="less">
.add-compound-widget-button {
    border: 1px solid black;
    display: flex;
    cursor: pointer;
}
</style>

