<template>
  <div class="widget-bar">
    <div class="widget0" v-for="widget in widgets" ref="widgets">
    </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
import { TweenMax } from 'gsap';
import _ from 'lodash';
import dom from '@/dom'
import * as log from 'loglevel';

interface Foo {
    widgets: number[];
};


function isElementArray(arg: any): arg is Element[] {
    return arg.length !== undefined;
}

export default Vue.extend({
    data(): Foo {
        return  {
            widgets: []
        };
    },
    created() {
        this.widgets = [1, 2, 3];
    },
    mounted() {
        window.setTimeout(this.mergeWidgets, 400);
    },
    methods: {
        mergeWidgets() {
            log.debug("dom ready");
            // Pick the third widget.
            
            log.debug("widgets = %o", this.$refs.widgets);
            
            // Need to type guard this because it's variant type
            if (isElementArray(this.$refs.widgets)) {
                log.debug("It was an element array, which is good");
                const widgetsList: Element[] = this.$refs.widgets;
                
                const elementToMove = widgetsList[2];
                log.debug("I will move %o", elementToMove);

                const targetElement = widgetsList[1];
                
                dom.warp(elementToMove, targetElement);
            }

        }
    }
    
});
</script>

<style>
.widget0 {
    width: 8em;
    height: 16ex;
    background-color: green;
    border: 0.2em solid black;
    margin-left: 0.2em;
    margin-right: 0.2em;
}

.widget-bar {
    display: flex;
}
</style>
