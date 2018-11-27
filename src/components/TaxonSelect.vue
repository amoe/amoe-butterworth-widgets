<template>
  <select class="taxon-select">
    <option selected>{{value}}</option>
</select>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: ['value']
});
</script>

<style lang="less">
@import "../assets/variables.less";

.taxon-select {
    min-width: 8em;
    background-color: @offwhite;
    margin: @space-small;
}
</style>
