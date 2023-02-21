<script setup>
import { ref } from "vue";
import { connectDb, softDeleteUser } from "../database/connection";
const users = ref([]);
const id = ref(0);
const open = ref(false);
(async () => {
    users.value = await connectDb();
})();
function openDeleteUser(userId) {
    id.value = userId;
    open.value = true;
}
function removeUsuario() {
    softDeleteUser(id);
    open.value = false;
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
                <button @click="removeUsuario(id)">Remover</button>
            </div>
        </div>
    </div>
</template>
<style>
.wrapperControle {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
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
    position: absolute;
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
