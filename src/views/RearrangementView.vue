<template>
<div class="rearrangement-view">
  <div class="box" v-for="(box, index) in boxes" ref="boxes">
    {{index}}: {{box}}
  </div>
</div>
</template>

<script lang="ts">
import Vue, {VueConstructor} from 'vue';
import { Draggable } from 'gsap/Draggable';

interface RearrangementViewRefs {
    $refs: {
        boxes: Element[]
    }
};

type AugmentedVue = VueConstructor<Vue & RearrangementViewRefs>;

export default (Vue as AugmentedVue).extend({
    data() {
        return {
            boxes: ['Larry', 'Curly', 'Moe']
        };
    },
    mounted() {
        this.$nextTick(this.setupDraggables);
    },
    methods: {
        setupDraggables() {
            const elements: Element[] = this.$refs.boxes;
            const vars = {
                onDragEnd: this.onDragEnd
            };
            Draggable.create(elements, vars);
        },
        onDragEnd() {
            console.log("dragend");
        }
    }
});
</script>

<style lang="less">
.rearrangement-view {
    display: flex;
    flex-direction: row;
}

.box {
    height: 200px;
    width: 100px;
    background-color: orange;
    margin: 1em;
}
</style>
