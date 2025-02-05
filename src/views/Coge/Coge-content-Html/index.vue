<template>
  <div class="whole">
    <div class="show--coge">
      <div class="show"></div>
      <div class="coge">
      </div>
    </div>
    <div class="css"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
</script>

<style scoped lang="scss">
  .whole{
    width: 100%;
    height: 100%;
    display: flex;
    .show--coge{
      width: 70%;
      height: 100%;
      .show{
        width: 100%;
        height: 50%;
        background-color: red;
      }
      .coge{
        width: 100%;
        height: 50%;
        padding: 5px;
        background-color: aquamarine;
      }
    }
    .css{
      width: 30%;
      height: 100%;
      background-color: aqua;
    }
  }
</style>