<template>
  <div class="home">

    <p>Foo <circle-icon/> Bar</p>

    <div class="widget-container">
      <div class="widget" v-for="widget in widgets">
        <input class="taxon-name" type="text" size="32" v-model="widget.value"></input>
        <div class="level-container">
          <circle-icon v-for="n in widget.level"
                       :key="n"></circle-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { CircleIcon } from 'vue-feather-icons'

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
.widget-container {
    display: flex;
}

.widget {
    background-color: hsl(105, 100%, 40%);
    padding-top: 1em;
    padding-bottom: 1em;
    margin-left: 0.2em;
    margin-right: 0.2em;
    display: flex;
    flex-direction: column;
}

.level-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 1em;
}

.taxon-name {
    margin-left: 1em;
    margin-right: 1em;
}
</style>
