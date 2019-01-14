<template>
  <div class="serif">
    <!-- LEFT RIGHT OPEN-HEADED ARROW -->
    <span class="toggle-control" v-on:click="toggleSerif">&hoarr;</span>

    <div class="serif-left">
    </div>

    <!-- NB: This transition is not currently working, it's something to do
             with the key values, but it's also debatable if it even
             makes sense because of the adaptive width of the distance
             indicator :/ -->
    <transition name="trans" mode="out-in">
      <serif-control-panel v-if="serifExpanded" key="serif-expanded"
                           :distance="distance"
                           :on-change-distance="onChangeDistance"/>

      <distance-indicator v-else 
                          :distance="distance" stroke="hsl(45, 100%, 50%)"
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
import {TransitionCallback} from '@/types';

export default Vue.extend({
    components: {SerifControlPanel, DistanceIndicator},
    data() {
        return {
            serifExpanded: true,
            distance: 4
        }
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('keydown', e => {
                if (e.key === " ") {
                    this.toggleSerif();
                }
            });
        });
    },
    methods: {
        onChangeDistance(e: Event) {
             if (e.currentTarget === null) throw new Error('bad');
             const target: EventTarget = e.currentTarget;

             const casted = target as HTMLInputElement;
             this.distance = parseInt(casted.value);
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
    height: 4em;
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

.toggle-control {
    cursor: pointer;
}

// Define the transition, these are very trial and error
.trans-enter {
    opacity: 0;
}
.trans-enter-active {
    transition: opacity 2s;
}

.trans-leave-to {
    width: 0px;
}

.trans-leave-active {
    transition: width 0.2s;
}
</style>
