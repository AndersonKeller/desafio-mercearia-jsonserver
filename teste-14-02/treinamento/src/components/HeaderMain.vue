<script setup>
import { Icon } from "@iconify/vue";
// eslint-disable-next-line vue/no-export-in-script-setup
</script>
<script>
function setName(name) {
    localStorage.setItem("name", name);
}
export default { setName };
</script>
<template>
    <header
        class="position-fixed top-0 start-0 w-100 d-flex align-center justify-content-center"
    >
        <div class="d-flex align-center w-75 m-auto">
            <Icon icon="mdi:cake" color="red" width="60px" />
            <nav
                class="m-auto w-75 d-flex align-center justify-content-between"
            >
                <a href="/" @click="setName('Dashboard')">Dashboard</a>
                <a href="/despesas" @click="setName('Despesas')">Despesas</a>
                <a href="/planejamento" @click="setName('Planejamento')"
                    >Planejamento</a
                >
                <a href="/produtos" @click="setName('Produtos')">Produtos</a>
                <a href="/login">Login</a>
            </nav>
        </div>
    </header>
</template>
<style>
header {
    height: 70px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.5);
    background-color: #fff;
}
</style>
