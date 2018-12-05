<template>
  <div class="serif">
    <div class="serif-left">
    </div>

    <!-- NB: This transition is not currently working, it's something to do
             with the key values, but it's also debatable if it even
             makes sense because of the adaptive width of the distance
             indicator :/ -->
    <transition name="fade"
                v-on:enter="serifOpen"
                v-on:leave="serifClose">
      <serif-control-panel v-if="serifExpanded" key="serif-expanded"/>

      <distance-indicator v-else 
                          :distance="4" stroke="hsl(45, 100%, 50%)"
                          key="serif-collapsed">
      </distance-indicator>
    </transition>
    <div class="serif-right">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {TweenMax} from 'gsap';
import DistanceIndicator from '@/components/DistanceIndicator.vue';
import SerifControlPanel from '@/components/SerifControlPanel.vue';

type TransitionCallback = () => void;

const ANIMATION_TIME_SECONDS = 2.0;

export default Vue.extend({
    components: {SerifControlPanel, DistanceIndicator},
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
        serifOpen(el: Element, done: TransitionCallback) {
            console.log("serifopen");
            // This is a little trick found on the GSAP forums, since we can't
            // tween to 'auto' easily.

            console.log("distance indicator is %o", this.$refs.distanceIndicator);

            done();
            /*
            TweenMax.set(el, {width: 'auto'});
            TweenMax.from(el, ANIMATION_TIME_SECONDS, {
                width: 0,
                onComplete: done
            });
            */

        },
        serifClose(el: Element, done: TransitionCallback) {
            console.log("serifclose");

            done();
            /*
            TweenMax.to(el, ANIMATION_TIME_SECONDS, {
                width: 0,   
                onComplete: done
            });
            */
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



</style>
