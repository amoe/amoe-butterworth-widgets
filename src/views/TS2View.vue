<template>
  <div class="home">
    <div class="taxon-container">
      <!-- Add 1, because a loop over a number is 1 indexed.  So when no path is
           defined, the loop will still generate one iteration with n=1 -->
      <taxon-selector v-for="n in definedWidgetCount + 1"
                      :key="n" :level="n"></taxon-selector>
    </div>

    Widget count: {{widgetCount}}
    Path selected: <code>{{selectedPath}}</code>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapGetters} from 'vuex';
import TaxonSelector from '@/components/TaxonSelector.vue';

export default Vue.extend({
    name: 'home',
    components: {TaxonSelector},
    computed: mapGetters(['definedWidgetCount', 'taxonomyTree', 'selectedPath'])
});
</script>

<style lang="less">
.taxon-container {
    display: flex;
    flex-direction: row;
    border: 1px solid black;
}

</style>
