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
body {
    min-height: max-content !important;
    background-color: #dee2e6 !important;
}
@media (min-width: 1024px) {
    #app {
        display: flex !important;
    }
}
</style>
