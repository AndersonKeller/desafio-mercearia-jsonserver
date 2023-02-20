<script setup>
import { ref } from "vue";
import { registerDb } from "../database/connection";
import modalRegister from "../components/modalRegister.vue";
const openModal = ref(false);
function setOpenModal() {
    openModal.value = !openModal.value;
    return openModal;
}
async function handleSubmit() {
    const newUser = {
        name: userInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    };

    try {
        const res = await registerDb(newUser);
        console.log(res);
        localStorage.setItem("@merceariaToken", res.accessToken);
        setOpenModal();
        return res;
    } catch (error) {
        console.log(error.response.data);
        if (error.response.data == "Email already exists") {
            atualizaError("e-mail já cadastrado");
        } else {
            atualizaError("verifique seus dados");
        }
    }
}
function atualizaError(value) {
    errorRegister.value = value;
    return errorRegister;
}
const userInput = ref("");
const emailInput = ref("");
const passwordInput = ref("");
const errorRegister = ref("");
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
                placeholder="Digite seu nome de usuário"
                aria-label="Username"
                aria-describedby="basic-addon1"
                v-model="userInput"
            />
            <span class="input-group-text" id="basic-addon1">E-mail</span>
            <input
                type="email"
                class="form-control w-100"
                placeholder="Digite seu e-mail"
                aria-label="Email"
                aria-describedby="basic-addon2"
                v-model="emailInput"
            />
            <span class="input-group-text" id="basic-addon2">Senha</span>
            <input
                type="password"
                class="form-control w-100"
                placeholder="Digite sua senha"
                aria-label="Password"
                aria-describedby="basic-addon3"
                v-model="passwordInput"
            />
            <span class="spanError p-1" v-if="errorRegister">{{
                errorRegister
            }}</span>
            <button
                :disabled="
                    passwordInput == '' || userInput == '' || emailInput == ''
                "
                type="submit"
                class="btn btn-primary btn-lg mt-1"
            >
                Logar
            </button>
        </div>
    </form>
    <modalRegister v-if="openModal"></modalRegister>
</template>
<style>
form {
    height: max-content;
    margin-top: 100px;
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
