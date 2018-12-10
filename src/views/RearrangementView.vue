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

// no type for Draggable in @types/gsap :(
type Draggable = any;


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
            const component = this;
            const elements: Element[] = this.$refs.boxes;

            const vars = {
                onDragEnd: function(e: PointerEvent) {
                    component.onDragEnd(this, e);
                }
            };
            Draggable.create(elements, vars);
        },
        onDragEnd(draggable: Draggable, e: PointerEvent) {
            console.log("dragend");
            console.log("this is %o", this);
            console.log("draggable is %o", draggable);
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
