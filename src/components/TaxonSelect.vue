<template>
  <input class="taxon-name" type="text" size="32" v-model="value"></input>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: ['value']
});
</script>
