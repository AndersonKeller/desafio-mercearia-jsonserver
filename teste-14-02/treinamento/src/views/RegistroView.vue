<script setup>
import HeaderMain from "../components/HeaderMain.vue";
import RegisterForm from "../components/RegisterForm.vue";
</script>
<template>
    <div class="wrapper w-100 start-0 top-0">
        <HeaderMain></HeaderMain>
        <RegisterForm></RegisterForm>
    </div>
</template>
<style>
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 22;
    height: 100vh;
    position: absolute;
}
</style>
