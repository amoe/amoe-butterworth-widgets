<template>
  <div class="rearrangement-view" :key="renderCount">
    <div class="box" v-for="(box, index) in boxes" ref="boxes" :key="name">
      {{index}}: {{box.name}}
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

function getIntersectingBoxes(source: Draggable, validTargets: Element[]) {
    return validTargets.filter(e => source.hitTest(e, '50%'));
}


export default (Vue as AugmentedVue).extend({
    data() {
        return {
            boxes: [
                {
                    name: 'Larry'
                }, 
                {
                    name: 'Curly'
                },
                {
                    name: 'Moe'
                }
            ],
            draggables: [] as Draggable[],
            renderCount: 0
        };
    },
    mounted() {
        this.$nextTick(this.setupDraggables);
    },
    watch: {
        boxes: function() {
            console.log("watch arguments were %o", arguments);

            this.$nextTick(this.setupDraggables);
        }
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
            const result = Draggable.create(elements, vars);
            
            console.log("result of creating draggables was %o", result);

            this.draggables = result;
        },
        onDragEnd(draggable: Draggable, e: PointerEvent) {
            console.log("dragend");
            console.log("this is %o", this);
            console.log("draggable is %o", draggable);

            // Draggable 'target' is actually the source element, i.e. the one
            // that's being dragged.
            const sourceElement: Element = draggable.target;

            const result = getIntersectingBoxes(draggable, this.$refs.boxes);
            console.log("intersecting result was %o", result);

            // Find index of result element
            if (result.length === 0) {
                return;
            } 

            if (result.length !== 1) {
                throw new Error("ambiguous drop");
            }

            const sourceElementIndex = this.$refs.boxes.indexOf(sourceElement);
            const targetElement = result[0];
            const targetElementIndex = this.$refs.boxes.indexOf(targetElement);

            console.log("Source element is %o", sourceElement);
            console.log("Would swap %o => %o", sourceElementIndex, targetElementIndex);

            const cutItems = this.boxes.splice(sourceElementIndex, 1);

            console.log("cut items were %o", cutItems);

            const theItem = cutItems[0];

            this.boxes.splice(
                targetElementIndex, 0, theItem
            );

            // Force the entire view to re-render, the watch will pick up
            // and re-set the draggables.
            this.renderCount++;
            console.log("new value is %o", this.boxes);
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
