<template>
  <div class="distance-indicator">
    <div v-for="n in distance" class="single-distance-line"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import typeGuards from '@/type-guards';

export default Vue.extend({
    props: ['distance', 'stroke'],
    components: {},
    data() {
        return {
        };
    },
    mounted() {
    },
    methods: {
    }
});
</script>

<style lang="less">

// not used at present
.distance-indicator {
    margin-left: 1em;
    margin-right: 1em;
    display: flex;
    flex-direction: row;
}

.single-distance-line {
    border-left: 1px solid black;
    height: 100%;
    margin-right: 0.2em;
}


.single-distance-line:last-child {
    margin-right: 0;
}
</style>
