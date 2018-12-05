<template>
  <div class="serif-content">
    <select name="distanceConditionType">
      <option value="distanceConditionType">Within</option>
    </select>

    <input class="distance-value" type="number" placeholder="4">

    <select name="distanceUnit">
      <option value="sentences">Sentences</option>
    </select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
});
</script>

<style lang="less">
@import "../assets/variables.less";

.serif-content {
    overflow-x: hidden;
    overflow-y: hidden;
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: smaller;
    min-width: 8em;
}


.serif-content * {
    margin-left: @space-medium;
    margin-right: @space-medium;
    margin-bottom: @space-xx-small;
    margin-top: @space-xx-small;
}


input.distance-value {
    width: 3em;
}
</style>
