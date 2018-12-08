<template>
  <div class="taxon-selector">
    <p>Level: {{level}}</p>
    <p>Taxonomy elements:</p>

    <ul>
      <li v-for="item in filteredChildren">{{item.model.content}}</li>
    </ul>


    <select v-on:change="onSelect">
      <option v-for="item in filteredChildren"
              :value="item.model.id">{{item.model.content}}</option>
    </select>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapGetters} from 'vuex';
import util from '@/util';

export default Vue.extend({
    props: ['level'],
    name: 'home',
    components: {},
    methods: {
        onSelect(e: Event) {
            // const element: Element = e.target;
            // console.log("Selection was called, args are %o", e.target);
            if (e.currentTarget === null) throw new Error("bad");
            const target: EventTarget = e.currentTarget;

            const casted = target as HTMLInputElement;
            console.log("target value is %o", casted.value);

            this.selectedPath.splice(this.level - 1, 1, parseInt(casted.value));
        }
    },
    computed: {
        filteredChildren(this: any) {
            // We have the taxonomy tree.  We have a selected path.
            // Selected path should be cut off to the value of this.level,
            // Then passed to the finding method.

            const level = this.level;

            console.log("will return filtered elements for level %o", level);
            console.log("path is currently %o", this.selectedPath);

            // Slice to level-1, because index is 1-based and the slice should
            // be empty on the first level
            const pathSegment = this.selectedPath.slice(0, level - 1);

            return util.findValidChildren(this.taxonomyTree, pathSegment);

        },
        taxonomyTree(this: any) {
            return this.$store.getters.taxonomyTree;
        },
        selectedPath(this: any) {
            return this.$store.getters.selectedPath;
        }
    }
});

</script>

<style lang="less">
.taxon-selector {
    background-color: green;
    width: 100px;
    height: 200px;
    margin: 1em;
    border: 1px solid black;
}
</style>
