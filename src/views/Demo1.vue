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


</section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: '',
    components: {},
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

