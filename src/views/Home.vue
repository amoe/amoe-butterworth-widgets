<template>
  <div class="home">
    <div class="widget-container">
      <div class="widget" v-for="widget in widgets">
        <input type="text" size="32" v-model="widget.value"></input>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default Vue.extend({
    name: 'home',
    components: {},
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

<style>


.widget-container {
    display: flex;
}

.widget {
    background-color: green;
    padding-top: 1em;
    padding-bottom: 1em;
    margin-left: 0.2em;
    margin-right: 0.2em;
}
</style>
