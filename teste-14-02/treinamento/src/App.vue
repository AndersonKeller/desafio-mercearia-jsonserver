<script setup>
import { RouterView } from "vue-router";
</script>

<template>
    <RouterView />
</template>

<style>
#app {
    display: flex;
    justify-content: center;
    min-width: 100vw;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
@media (min-width: 1024px) {
    #app {
        display: flex !important;
    }
}
</style>
