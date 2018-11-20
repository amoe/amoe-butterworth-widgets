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
/*
.taxon-select {
    min-width: @somevar;
}
*/
</style>
