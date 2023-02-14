<script setup>
import { Icon } from "@iconify/vue";
// eslint-disable-next-line vue/no-export-in-script-setup
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
                <a href="/">Dashboard</a>
                <a href="/despesas">Despesas</a>
                <a href="/planejamento">Planejamento</a>
                <a href="/produtos">Produtos</a>
            </nav>
        </div>
    </header>
</template>
<style>
header {
    height: 70px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.5);
}
</style>
