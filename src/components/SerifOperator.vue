<template>
  <div class="serif">
    <div class="serif-left">
    </div>
    <transition name="fade"
                v-on:enter="serifEnter"
                v-on:leave="serifLeave">
      <div class="serif-content" v-if="serifExpanded">
        <label for="distanceType">Distance type</label>
        <select name="distanceType">
          <option value="sentences">Sentences</option>
        </select>

        <label for="distanceValue">Distance value</label>
        <input type="number">

      </div>
    </transition>
    <div class="serif-right">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {TweenMax} from 'gsap';

type TransitionCallback = () => void;

const ANIMATION_TIME_SECONDS = 1.0;

export default Vue.extend({
    data() {
        return {
            widgets: [1, 2, 3, 4],
            serifExpanded: true
        }
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('keydown', e => {
                if (e.key === " ") {
                    console.log("event was %o", e);
                    this.toggleSerif();
                    e.preventDefault();
                }
            });
        });
    },
    methods: {
        serifEnter(el: Element, done: TransitionCallback) {
            console.log("serifenter");
            
            // This is a little trick found on the GSAP forums, since we can't
            // tween to 'auto' easily.
            TweenMax.set(el, {width: 'auto'});
            TweenMax.from(el, ANIMATION_TIME_SECONDS, {
                width: 0,
                onComplete: done
            });
        },
        serifLeave(el: Element, done: TransitionCallback) {
            console.log("serifleave");
            TweenMax.to(el, ANIMATION_TIME_SECONDS, {
                width: 0,   
                onComplete: done
            });
        },
        toggleSerif() {
            this.serifExpanded = !this.serifExpanded;
        },
    }
});
</script>

<style lang="less">
@import "../assets/variables.less";

@serif-width: 2px;

.serif {
    display: flex;
    flex-direction: row;

    /* Just to set off from main */
    height: 8em;
    margin: 1em;

    background-color: hsl(0, 0, 98%);
}

.serif-left {
    border-right: @serif-width solid black;
    border-top: @serif-width solid black;
    border-bottom: @serif-width solid black;
    width: 25%;
    height: 100%;
    margin-right: 1px;
}

.serif-right {
    border-left: @serif-width solid black;
    border-top: @serif-width solid black;
    border-bottom: @serif-width solid black;

    margin-left: 1px;
    width: 25%;
    height: 100%;
}

.serif-content {
    overflow-x: hidden;
    overflow-y: hidden;
    width: auto;
    display: flex;
    flex-direction: column;
    font-size: smaller;
}

.serif-content * {
    margin-left: @space-medium;
    margin-right: @space-medium;
    margin-bottom: @space-xx-small;
    margin-top: @space-xx-small;
}

</style>
