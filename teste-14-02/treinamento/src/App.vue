<script setup>
import { RouterView } from "vue-router";
import { setName } from "./components/HeaderMain.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const validateUser = localStorage.getItem("@merceariaToken");
if (!validateUser) {
    setName("login");
    router.push({ name: "login" });
}
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
button {
    cursor: pointer;
}
@media (min-width: 1024px) {
    #app {
        display: flex !important;
    }
}
</style>
