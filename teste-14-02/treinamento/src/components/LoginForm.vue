<script setup>
import { ref } from "vue";
import { defineStore } from "pinia";
import { loginDb } from "../database/connection";
import { setName } from "../components/HeaderMain.vue";
import { useRouter } from "vue-router";
const route = useRouter();
async function handleSubmit() {
    const setUser = useUserStore();
    setUser.atualizaUser({
        user: userInput.value,
        password: passwordInput.value,
    });
    console.log(setUser.user);
    const data = { email: userInput.value, password: passwordInput.value };
    try {
        const res = await loginDb(data);
        console.log(res);
        localStorage.setItem("@merceariaToken", res.data.accessToken);
        setName("Dashboard");
        setTimeout(() => {
            route.push({ name: "home" });
        }, 1000);
    } catch (error) {
        console.log(error.response.data);
    }
}
//email: "email@email.com", password: "12345"
const useUserStore = defineStore("user", () => {
    const user = ref("");
    function atualizaUser(value) {
        user.value = value;
    }
    return { user, atualizaUser };
});
const userInput = ref("");
const passwordInput = ref("");
</script>
<template>
    <form
        @submit.prevent="handleSubmit()"
        class="d-flex w-50 p-2 align-items-center justify-content-center"
    >
        <div class="input-group mb-3 w-50 d-flex flex-column">
            <span class="input-group-text" id="basic-addon1">Usuário</span>
            <input
                type="text"
                class="form-control w-100"
                placeholder="Digite seu usuário"
                aria-label="Username"
                aria-describedby="basic-addon1"
                v-model="userInput"
            />
            <span class="input-group-text" id="basic-addon2">Senha</span>
            <input
                type="password"
                class="form-control w-100"
                placeholder="Digite sua senha"
                aria-label="Password"
                aria-describedby="basic-addon2"
                v-model="passwordInput"
            />
            <button
                :disabled="passwordInput == '' || userInput == ''"
                type="submit"
                class="btn btn-primary btn-lg mt-1"
            >
                Logar
            </button>
        </div>
    </form>
</template>
<style>
form {
    height: 100vh;
}
</style>
