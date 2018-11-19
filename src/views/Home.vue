<template>
  <div class="home">

    <p>Some text</p>

    <div class="widget-container">
      <div class="widget-taxonomy-type-group"> 
        <div class="widget" v-for="widget in widgets">
          <input class="taxon-name" type="text" size="32" v-model="widget.value"></input>
          <div class="level-container">
            <span v-for="n in widget.level">
              <circle-icon :width="16" :height="16"></circle-icon>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import CircleIcon from '@/components/CircleIcon.vue';

export default Vue.extend({
    name: 'home',
    components: { CircleIcon },
    data() {
        return {
            widgets: [{
                level: 2,
                value: "Agriculture/Fishing"
            },
            {
                level: 3,
                value: "Farming/Land Service"
            }]
        };
    }
});
</script>

<style lang="less">
@offwhite: hsl(0, 0%, 99%);
@offblack: hsl(6, 24%, 8%);
@lightgreen: hsl(105, 100%, 40%);
@lightgreenmod: hsl(105, 100%, 30%);
@red: hsl(0, 100%, 41%);

.widget-container {
    display: flex;
}

.widget {
    background-color: @lightgreen;
    padding-top: 1em;
    padding-bottom: 1em;
    margin-left: 0.2em;
    margin-right: 0.2em;
    display: flex;
    flex-direction: column;
    border: thin solid @offblack;
}

.level-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 1em;
    color: @red;
}

.taxon-name {
    margin-left: 1em;
    margin-right: 1em;
    background-color: @offwhite;
}

.widget-taxonomy-type-group {
    display: flex;
    flex-direction: row;
    border-right: medium solid @offblack;
}
</style>
