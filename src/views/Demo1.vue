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
import TreeModel from 'tree-model';

const TAXONOMY_DATA = {
    'children': [{'content': 'Rock', 'id': 1, 'label': 'Taxon'},
                 {'content': 'Classical', 'id': 2, 'label': 'Taxon'}],
    'content': 'Music',
    'id': 0,
    'label': 'Taxon'
}

const config = {};
const t = new TreeModel(config)
const root = t.parse(TAXONOMY_DATA);

export default Vue.extend({
    name: '',
    data() {
        return {
            someArray: [1, 2, 3],
            anotherArray: [4, 5, 6]
        }
    },
    mounted() {
        console.log("root is %o", root);
    }
});
</script>

