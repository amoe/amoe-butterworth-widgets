<template>
  <svg xmlns="http://www.w3.org/2000/svg"
       :width="dynamicWidth" class="distance-indicator" ref="distanceIndicator">
    <line v-for="n in distance"
          :x1="getXPos(n - 1)" y1="0" :x2="getXPos(n - 1)" y2="100" :stroke="stroke"
          :stroke-width="strokeWidth"/>
  </svg>
</template>

<script lang="ts">
import Vue from 'vue';
import typeGuards from '@/type-guards';

export default Vue.extend({
    props: ['distance', 'stroke'],
    components: {},
    data() {
        return {
            offset: 12,
            dynamicWidth: 150,
            strokeWidth: 4
        };
    },
    mounted() {
        // Once mounted, we need to dynamically resize to the 'real' size
        if (typeGuards.isSvgGraphicsElement(this.$refs.distanceIndicator)) {
            const svg: SVGGraphicsElement = this.$refs.distanceIndicator;
            const bbox = svg.getBBox();
            this.dynamicWidth = bbox.width + this.strokeWidth + 1;
        }
    },
    methods: {
        getXPos(n: number) {
            // svg offsets are 1-based, hence the 1; stroke width causes the
            // line to expand equally in each direction so we need to take
            // it into account otherwise the view frame will cut it off.
            return (n * this.offset) + (this.strokeWidth / 2) + 1;
        }
    }
});
</script>

<style lang="less">

// not used at present
.distance-indicator {
    margin-left: 1em;
    margin-right: 1em;
}
</style>
