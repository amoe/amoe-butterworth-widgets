<template>
  <div class="home">

    <p>Some text</p>

    <div class="widget-container">
      <div class="widget-taxonomy-type-group"
           v-for="taxonomyType in sortedTaxonomyTypeKeys">
        <p>Type: <code>{{taxonomyType}}</code></p>

        <div class="widget" v-for="widget in widgets[taxonomyType]">
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
            widgets: {
               'Occupation': [
                   {
                       level: 1,
                       value: "Manufacturing"
                   },
                   {
                       level: 2,
                       value: "Wood workers"
                   },
                   {
                       level: 3,
                       value: "Bandbox-maker"
                   },

               ],
               'Place': [
                   {
                       level: 1,
                       value: "Country"
                   },
                   {
                       level: 2,
                       value: "France"
                   }

               ]

            }
        };
    },
    computed: {
        sortedTaxonomyTypeKeys(): string[] {
            const keys = Object.keys(this.widgets);
            keys.sort();
            return keys;
        }
    }
});
</script>

<style lang="less">
@offwhite: hsl(0, 0%, 99%);
@offblack: hsl(6, 24%, 8%);
@lightgreen: hsl(105, 100%, 40%);
@lightgreenmod: hsl(105, 100%, 30%);
@red: hsl(0, 100%, 41%);
@grey: hsl(0, 0%, 63%);

@space-small: 0.8em;
@space-large: 1.6em;
@roundedness: 0.2em;

.widget-container {
    display: flex;
    border: thin solid @grey;
}

.widget-taxonomy-type-group {
    display: flex;
    flex-direction: row;
    border-right: medium solid @offblack;
    padding: @space-small;
}



.widget {
    background-color: @lightgreen;
    padding-top: @space-large;
    padding-bottom: @space-large;
    margin-left: @space-small;
    margin-right: @space-small;
    display: flex;
    flex-direction: column;
    border-width: 0.2em;
    border-style: outset;
    border-color: hsl(0, 0%, 90%);
    border-radius: @roundedness;
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

</style>
