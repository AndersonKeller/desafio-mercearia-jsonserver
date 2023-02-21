<script setup>
import HeaderMain from "../components/HeaderMain.vue";
import LoginForm from "../components/LoginForm.vue";
</script>

<template>
    <div class="wrapper w-100 position-fixed start-0 top-0">
        <HeaderMain></HeaderMain>
        <LoginForm></LoginForm>
    </div>
</template>
<style>
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
}
</style>
