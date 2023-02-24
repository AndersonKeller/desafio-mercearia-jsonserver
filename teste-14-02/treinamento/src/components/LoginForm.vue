<script setup>
import { ref } from "vue";
import { defineStore } from "pinia";
import { loginDb } from "../database/connection";
import { setName } from "../components/HeaderMain.vue";
import { useRouter } from "vue-router";
const route = useRouter();
const errorLogin = ref("");
function atualizaError(value) {
    errorLogin.value = value;
    return errorLogin;
}

async function handleSubmit() {
    const setUser = useUserStore();
    const data = { email: userInput.value, password: passwordInput.value };
    try {
        const res = await loginDb(data);
        setUser.atualizaUser(res.data.user);
        localStorage.setItem("@merceariaToken", res.data.accessToken);
        localStorage.setItem("@merceariaUser", JSON.stringify(res.data.user));
        if (res.data.user.isAdmin) {
            localStorage.setItem("@isAdmin", true);
        }
        if (!res.data.user.isAdmin) {
            localStorage.removeItem("@isAdmin");
        }
        setName("Dashboard");
        setTimeout(() => {
            route.push({ name: "home" });
        }, 1000);
    } catch (errorCatch) {
        console.log(errorCatch.response.data);
        atualizaError("Email ou senha incorretos");
    }
}
//email: "email@email.com", password: "12345"

const userInput = ref("");
const passwordInput = ref("");
</script>
<script>
export const useUserStore = defineStore("user", () => {
    const user = ref("");
    const localUser = localStorage.getItem("@merceariaUser");
    if (localUser) {
        user.value = localUser;
    }
    function atualizaUser(value) {
        user.value = value;
    }
    return { user, atualizaUser };
});
export async function defineUser() {
    const res = useUserStore();
    return res.user;
}
</script>
<template>
    <form
        @submit.prevent="handleSubmit()"
        class="d-flex p-2 align-items-center justify-content-center"
    >
        <div class="input-group mb-3 w-100 d-flex flex-column">
            <span class="input-group-text" id="basic-addon1">E-mail</span>
            <input
                type="email"
                class="form-control w-100"
                placeholder="Digite seu e-mail"
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
            <span class="spanError p-1" v-if="errorLogin">{{
                errorLogin
            }}</span>
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
    height: max-content;
    margin-top: 100px;
    width: 100%;
    max-width: 400px;
}
.spanError {
    color: red;
    font-weight: 700;
}
.input-group {
    gap: 16px;
    background-color: white;
    padding: 16px;
    border-radius: 16px;
}
.input-group-text {
    color: rgb(70, 65, 65);
    border: none;
}
</style>
