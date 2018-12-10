<template>
<div class="container">
  <button v-on:click="shuffleBoxes">Shuffle boxes</button>
  <transition-group name="flip-list" tag="div">
    <div class="box" v-for="(box, index) in boxes" :key="box.name" v-if="box.visible">
      Box {{index}} -- {{box.name}}
      <button v-on:click="hide(index)">Hide</button>
    </div>
  </transition-group>
</div>
</template>

<script lang="ts">
import Vue, {VueConstructor} from 'vue';
import {TransitionCallback} from '@/types';
import _ from 'lodash';

interface BoxInfo {
    name: string;
    visible: boolean;
};

export default Vue.extend({
    data() {
        return {
            boxes: [
                {
                    name: 'Fry',
                    visible: true
                },
                {
                    name: 'Bender',
                    visible: true
                },
                {
                    name: 'Leela',
                    visible: true
                }
            ] as BoxInfo[],
            items: [1,2,3,4,5,6,7,8,9]
        };
    },
    methods: {
        hide(index: number): void {
            this.boxes.splice(index, 1);
        },
        onEnter(el: Element, done: TransitionCallback) {
            console.log("inside onenter");
            done();
        },
        onLeave(el: Element, done: TransitionCallback) {
            console.log("inside onleave");
            done();
        },
        shuffleBoxes() {
            // do nothing
            this.boxes = _.shuffle(this.boxes)
        }
    }
});
</script>

<style lang="less">
// Note the child selector here, used because Vue shoves in an unclassed
// div to wrap everything
.container > div {
    display: flex;
    flex-direction: row;
    background-color: cyan;
}


// some styles
.box {
    width: 100px;
    height: 200px;
    background-color: green;
    margin: 1em;

    transition: all 1s;
    margin-right: 10px;
}

.flip-list-move {
    transition: transform 2s;
}

.flip-list-enter, .flip-list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.flip-list-leave-active {
    position: absolute;
}
</style>
