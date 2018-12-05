<template>
<section>
  <p>Some other test</p>

  <ol class="outer">
    <li v-for="i in someArray">
      <ol class="inner" >
        <li v-for="j in anotherArray" ref="foo">{{i}}, {{j}}</li>
      </ol>
    </li>
  </ol>
  

  <distance-indicator :distance="4" stroke="hsl(45, 100%, 50%)">
  </distance-indicator>

</section>
</template>

<script lang="ts">
import Vue from 'vue';
import DistanceIndicator from '@/components/DistanceIndicator.vue';

export default Vue.extend({
    name: '',
    components: {DistanceIndicator},
    data() {
        return {
            someArray: [1, 2, 3],
            anotherArray: [4, 5, 6],
        }
    },
    mounted() {
    }
});
</script>

