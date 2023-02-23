<script setup>
import { ref } from "vue";
import {
    connectDb,
    softDeleteUser,
    updateUsuario,
} from "../database/connection";
const users = ref([]);
const id = ref(0);
const open = ref(false);
const openEdit = ref(false);
const userName = ref("");
(async () => {
    users.value = await connectDb();
})();
function openDeleteUser(userId) {
    id.value = userId;
    open.value = true;
}
function openEditUser(userId, name) {
    userName.value = name;
    id.value = userId;
    openEdit.value = true;
    console.log(userName.value);
}
function removeUsuario() {
    softDeleteUser(id);
    open.value = false;
}
function updateUsuarioDefine() {
    updateUsuario(id.value, userName.value);
}
</script>
<template>
    <div class="wrapperControle">
        <div class="modalControle">
            <section>
                <div class="sectionHeader">
                    <h4>Usuários</h4>
                    <a href="/">Voltar</a>
                </div>
                <div class="d-flex justify-content-around mt-1">
                    <p>E-mail</p>
                    <p>Nome</p>
                </div>
                <div v-if="users" class="sectionBody">
                    <div
                        v-for="user in users"
                        :key="user.id"
                        class="sectionUser"
                    >
                        <p>{{ user.email }}</p>
                        <span v-if="user.isAdmin">Admin <small>V</small> </span>
                        <div
                            class="d-flex align-items-center justify-content-center"
                        >
                            <p>{{ user.name }}</p>
                            <button
                                class="btnEdit"
                                @click="openEditUser(user.id, user.name)"
                            >
                                Editar
                            </button>
                            <button
                                @click="openDeleteUser(user.id)"
                                v-if="!user.isAdmin"
                            >
                                X
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <div v-if="open" class="wrapperDelete">
            <div class="modalDelete">
                <h3>Remover usuário</h3>
                <p>Tem certeza que quer remover este usuário?</p>
                <button @click="open = false" class="btnClose">X</button>
                <button class="btnVoltar" @click="open = false">Voltar</button>
                <button @click="removeUsuario(id)">Remover</button>
            </div>
        </div>
        <div v-if="openEdit" class="wrapperDelete">
            <div class="modalEdit">
                <h3>Editar usuário</h3>
                <input class="editInput" type="text" v-model="userName" />
                <button @click="openEdit = false" class="btnCloseModal">
                    X
                </button>
                <button class="btnEditModal" @click="updateUsuarioDefine">
                    Editar
                </button>
            </div>
        </div>
    </div>
</template>
<style>
.editInput {
    margin: 16px 0;
    border: none;
    background-color: rgba(70, 90, 90, 0.26);
    padding-left: 12px;
    height: 45px;
}
.btnEdit {
    background-color: green;
}
.btnCloseModal {
    position: absolute;
    right: 16px;
    top: 16px;
    height: 32px;
}
.modalEdit {
    width: 95%;
    max-width: 400px;
    height: 250px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    border: 3px solid rgb(238, 236, 236);
    border-radius: 16px;
    padding: 32px;
}
.btnEditModal {
    background-color: green;
    border-radius: 16px;
    height: max-content;
    padding: 6px;
    margin-top: 12px;
    font-weight: 800;
}
.wrapperControle {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
}
.modalControle {
    background-color: white;
    width: 95%;
    max-width: 800px;
    height: max-content;
    min-height: 200px;
    display: flex;
    margin: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.modalControle section {
    width: 100%;
    height: 100%;
}
.wrapperDelete {
    width: 100%;
    height: 100vh;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.7);
}
.modalDelete {
    width: 95%;
    max-width: 400px;
    height: 200px;
    background-color: rgb(238, 5, 5);
    position: absolute;
    display: flex;
    flex-direction: column;
    border: 3px solid rgb(238, 236, 236);
    border-radius: 16px;
    padding: 16px;
    color: white;
}
.modalDelete button {
    border: none;
    font-weight: 800;
    color: rgb(243, 7, 7);
    background-color: rgb(241, 237, 237);
    height: 36px;
    padding: 6px;
    cursor: pointer;
    border-radius: 8px;
}
.modalDelete .btnVoltar {
    margin-bottom: 16px;
    background-color: #08cf08ce;
    color: #fff;
}
.btnClose {
    position: absolute;
    right: 10px;
    top: 10px;
    height: 16px;
}
.sectionHeader {
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: 0 auto;
    padding: 12px 0;
    border-bottom: 1px solid black;
}
.sectionBody {
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}
.sectionUser {
    display: flex;
    width: 95%;
    margin: 0 auto;
    flex-wrap: wrap;
    justify-content: space-between;
    border-bottom: 1px solid black;
}
.sectionUser p {
    width: 100%;
}
.sectionUser span {
    display: block;
}
.sectionUser div {
    display: flex;
    justify-content: space-between;
    gap: 10px;
}
button {
    border: none;
    font-weight: 800;
    color: rgb(230, 222, 222);
    background-color: rgb(243, 6, 6);
    height: 26px;
    cursor: pointer;
}
small {
    color: white;
    font-weight: 800;
    background-color: green;
    padding: 0 2px;
}
@media (min-width: 700px) {
    .sectionUser {
        width: 80%;
    }
    .sectionUser p {
        width: max-content;
    }
}
</style>
