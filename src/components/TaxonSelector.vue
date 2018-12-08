<template>
  <div class="taxon-selector" v-if="widgetVisibility[thisWidgetIndex]">
    <p>Level: {{level}}</p>
    <p>Index: {{thisWidgetIndex}}</p>

    <p>Taxonomy elements:</p>

    <ul>
      <li v-for="item in filteredChildren">{{item.model.content}}</li>
    </ul>

    <select v-on:change="onSelect">
      <option value="" selected disabled></option>
      <option v-for="item in filteredChildren"
              :value="item.model.id"
              :key="item.model.id">{{item.model.content}}</option>
    </select>

    <button v-on:click="hide">Hide</button>

    <p>Levels below this?  {{hasLevelsBelowThis}}</p>
    
    <p>Path length: {{visibleWidgetCount}}</p>

    <div v-if="hasLevelsBelowThis">
      <button v-on:click="addNext"
              :disabled="selectedTaxonId === null">Add</button>
    </div>

    <ul>
      <li v-for="n in visibleWidgetCount">Widget {{n}} -- is visible? {{widgetVisibility[n - 1]}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapGetters} from 'vuex';
import util from '@/util';
import mc from '@/mutation-constants';

export default Vue.extend({
    props: ['level'],
    name: 'home',
    data() {
        return {
            // contains currently selected taxonomy ID
            selectedTaxonId: null as number | null
        };
    },
    components: {},
    methods: {
        onSelect(e: Event) {
            // const element: Element = e.target;
            // console.log("Selection was called, args are %o", e.target);
            if (e.currentTarget === null) throw new Error("bad");
            const target: EventTarget = e.currentTarget;

            const casted = target as HTMLInputElement;
            console.log("target value is %o", casted.value);

            this.selectedTaxonId =  parseInt(casted.value);
        },
        addNext() {
            this.selectedPath.splice(this.thisWidgetIndex, 1, this.selectedTaxonId);
            this.$store.commit(mc.ADD_NEW_WIDGET);
        },
        hide() {
            this.$store.commit(mc.HIDE_WIDGET, this.thisWidgetIndex);
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
        },
        widgetVisibility(this: any) {
            return this.$store.getters.widgetVisibility;
        },
        hasLevelsBelowThis(this: any) {
            return this.filteredChildren.length > 0;
        },
        visibleWidgetCount(this: any) {
            return this.selectedPath.length + 1;
        },
        thisWidgetIndex(this: any) {
            return this.level - 1;
        },
    }
});

</script>

<style lang="less">
.taxon-selector {
    background-color: green;
    width: 100px;
    height: 80vh;
    margin: 1em;
    border: 1px solid black;
}
</style>
