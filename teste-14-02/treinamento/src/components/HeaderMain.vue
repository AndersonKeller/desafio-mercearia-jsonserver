<script setup>
import { Icon } from "@iconify/vue";
// eslint-disable-next-line vue/no-export-in-script-setup
import { ref } from "vue";
import { useRouter } from "vue-router";
const route = useRouter();
const openHamburguer = ref(false);
const btnHamburguerText = ref("|||");
function logout() {
    localStorage.removeItem("@merceariaToken");
    localStorage.removeItem("@merceariaUser");
    route.push({ name: "login" });
}
function togleHamburguer() {
    openHamburguer.value = !openHamburguer.value;
    const nav = document.querySelector(".nav");
    nav.classList.toggle("displayNone");
    if (openHamburguer.value) {
        btnHamburguerText.value = "X";
    } else {
        btnHamburguerText.value = "|||";
    }
}
</script>
<script>
export function setName(name) {
    localStorage.setItem("name", name);
}
</script>
<template>
    <header
        class="position-absolute top-0 start-0 w-100 d-flex align-center justify-content-between"
    >
        <div class="d-flex justify-content-between w-75 m-auto">
            <Icon icon="mdi:cake" color="red" width="60px" />

            <nav
                class="nav m-auto align-center displayNone justify-content-between"
            >
                <a href="/" @click="setName('Dashboard')">Dashboard</a>
                <a href="/despesas" @click="setName('Despesas')">Despesas</a>
                <a href="/planejamento" @click="setName('Planejamento')"
                    >Planejamento</a
                >
                <a href="/produtos" @click="setName('Produtos')">Produtos</a>
                <a href="/login" @click="setName('Login')">Login</a>
                <a href="/register" @click="setName('register')">Cadastrar</a>
                <button @click="logout" class="btn btn-secondary">Sair</button>
            </nav>
        </div>
        <button class="btnHamburguer" @click="togleHamburguer">
            {{ btnHamburguerText }}
        </button>
    </header>
</template>
<style>
header {
    height: 80px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.5);
    background-color: #fff;
    z-index: 999;
}
header > button {
    height: 30px;
    margin-top: 20px;
    border: none;
    position: absolute;
    right: 22px;
}
nav {
    display: flex;
    flex-direction: column;
    width: 50%;
    text-align: right;
    align-items: flex-end;
    background-color: white;
    position: absolute;
    top: 50px;
    right: -22px;
    padding: 0 12px;
    gap: 8px;
}
.displayNone {
    display: none;
}
nav a {
    width: max-content;
}
.btn-secondary {
    padding: 0 12px;
}
.btnHamburguer {
    padding: 0 12px;
    font-weight: 700;
    border-radius: 8px;
    width: 35px;
}
@media (min-width: 700px) {
    nav {
        display: flex;
        position: relative;
        flex-direction: row;
        width: 100%;
        top: 0;
    }
    .btnHamburguer {
        display: none;
    }
    .displayNone {
        display: flex;
    }
}
</style>
