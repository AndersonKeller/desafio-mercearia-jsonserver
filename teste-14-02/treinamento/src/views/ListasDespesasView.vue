<script setup>
import { ref } from "vue";
import {
    getAllNewDespesas,
    removeDespesa,
    updateDespesa,
} from "../database/connection";
const despesasList = ref([]);
const openDelete = ref(false);
const openEdit = ref(false);
const id = ref("");
const despesaValor = ref(0);

(async () => {
    despesasList.value = await getAllNewDespesas();
})();
function openDeleteDespesas(despesaId) {
    id.value = despesaId;
    console.log(id.value);
    openDelete.value = true;
}
function openEditDespesa(despesa) {
    console.log(despesa);
    openEdit.value = true;
    id.value = despesa.id;
    despesaValor.value = despesa.valor;
}
function updateDespesaDefine() {
    updateDespesa(id.value, despesaValor.value);
}
</script>
<template>
    <div class="wrapperDespesas">
        <div class="modalDespesas">
            <section>
                <div class="sectionHeader">
                    <h4>Despesas</h4>
                    <a href="/despesas">Voltar</a>
                </div>
                <div class="d-flex justify-content-around mt-1">
                    <p>Tipo</p>
                    <p>Nome</p>
                    <p>Valor</p>
                </div>
                <div v-if="despesasList" class="sectionBody">
                    <div
                        v-for="despesas in despesasList"
                        :key="despesas.id"
                        class="sectionUser"
                    >
                        <p>{{ despesas.tipo }}</p>
                        <p>{{ despesas.nome }}</p>
                        <div class="d-flex align-items-center">
                            <p>R$ {{ despesas.valor }}</p>
                            <button
                                class="btnEdit"
                                @click="openEditDespesa(despesas)"
                            >
                                Editar
                            </button>
                            <button @click="openDeleteDespesas(despesas.id)">
                                X
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <div v-if="openDelete" class="wrapperDelete">
            <div class="modalDelete">
                <h3>Remover despesa</h3>
                <p>Tem certeza que quer remover esta despesa?</p>
                <button @click="openDelete = false" class="btnClose">X</button>
                <button @click="removeDespesa(id)">Remover</button>
            </div>
        </div>
        <div v-if="openEdit" class="wrapperDelete">
            <div class="modalEdit">
                <h3>Editar despesa</h3>
                <input class="editInput" type="number" v-model="despesaValor" />
                <button @click="openEdit = false" class="btnClose">X</button>
                <button class="btnEditModal" @click="updateDespesaDefine">
                    Editar
                </button>
            </div>
        </div>
    </div>
</template>
<style>
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
.btnEdit {
    background-color: green;
}
.btnEditModal {
    background-color: green;
    border-radius: 16px;
    height: max-content;
    padding: 6px;
    margin-top: 12px;
    font-weight: 800;
}
.wrapperDespesas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    height: 100vh;
    overflow-y: auto;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
}
.modalDespesas {
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
.modalDespesas section {
    width: 100%;
    height: 100%;
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
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    border-bottom: 1px solid black;
}
.sectionUser p {
    width: 100px;
}
.sectionUser span {
    display: block;
}
.sectionUser div {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
}
.sectionUser div p {
    text-align: right;
}
button {
    border: none;
    font-weight: 800;
    color: rgb(230, 222, 222);
    background-color: rgb(243, 6, 6);
    height: 26px;
    cursor: pointer;
}
.wrapperDelete {
    width: 100%;
    position: fixed;
    height: 100%;
    top: 0;
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
    right: 16px;
    top: 16px;
    height: 32px;
}
.editInput {
    margin: 16px 0;
    border: none;
    background-color: rgba(70, 90, 90, 0.26);
    padding-left: 12px;
    height: 45px;
}
@media (min-width: 700px) {
    .sectionUser div {
        width: max-content;
    }
}
</style>
