<script setup>
import { setName } from "../components/HeaderMain.vue";
</script>
<template>
    <div class="wrapperRegister">
        <div class="d-flex modalRegister">
            <h3>Registro feito com sucesso!</h3>
            <a href="/" @click="setName('Dashboard')">Ok</a>
        </div>
    </div>
</template>
<style>
.wrapperRegister {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9;
}
.modalRegister {
    width: 95%;
    max-width: 400px;
    height: 200px;
    background-color: white;
    z-index: 10;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 20px;
}
.modalRegister a {
    border-radius: 16px;
    color: white;
    background-color: green;
    width: 80%;
    padding: 8px;
    font-size: 1rem;
    font-weight: 600;
}
</style>
