<script setup>
import { ref } from "vue";
import { postNewDespesa } from "../database/connection";

const selectType = ref("");
const selectVariavel = ref("");
const selectFixa = ref("");
const inputValue = ref(0);
const errorNewDespesa = ref("");

function atualizaErro(value) {
    errorNewDespesa.value = value;
    return errorNewDespesa;
}
// PEGA OS VALORES DO FORM E ATUALIZA O OBJETO E O STATE COM TOTAL DE DESPESAS
async function getValuesForm() {
    if (inputValue.value === 0) {
        atualizaErro("Valor deve ser maior que zero");
    }
    const newDespesa = {};
    newDespesa["tipo"] = selectType.value;
    newDespesa["valor"] = inputValue.value;
    if (selectFixa.value) {
        newDespesa["nome"] = selectFixa.value;
        selectFixa.value = "";
    }
    if (selectVariavel.value) {
        newDespesa["nome"] = selectVariavel.value;
        selectVariavel.value = "";
    }

    try {
        const res = await postNewDespesa(newDespesa);
        console.log(res.data);
        inputValue.value = 0;
        selectType.value = "";
    } catch (error) {
        console.log(error);
    }
}
</script>
<template>
    <form id="formDespesas" @submit.prevent="getValuesForm()">
        <p>Inserir nova despesa</p>
        <div class="input-group mb-3 w-100 d-flex flex-column">
            <select id="tipo" class="form-select w-100" v-model="selectType">
                <option value="">Escolha o tipo</option>
                <option value="fixa" selected>Fixa</option>
                <option value="variavel">Variável</option>
            </select>
            <select
                v-if="selectType == 'variavel'"
                id="variavel"
                class="form-select w-100"
                aria-label="Default select example"
                v-model="selectVariavel"
            >
                <option value="" selected>Escolha a despesa</option>
                <option value="mantimentos">Mantimentos</option>
                <option value="energia">Energia</option>
                <option value="agua">Água</option>
                <option value="gasolina">Gasolina</option>
            </select>
            <select
                v-if="selectType == 'fixa'"
                id="fixa"
                class="form-select w-100"
                aria-label="Default select example"
                v-model="selectFixa"
            >
                >
                <option value="" selected>Escolha despesa</option>
                <option value="internet">Internet</option>
                <option value="funcionario">Funcionário</option>
                <option value="contabilidade">Contabilidade</option>
                <option value="imposto">Imposto</option>
                <option value="aluguel">Aluguel</option>
            </select>
            <span class="input-group-text" id="basic-addon2">Valor</span>
            <input
                id="valor"
                type="number"
                class="form-control w-100"
                placeholder="Insira o valor"
                aria-label="Username"
                aria-describedby="basic-addon2"
                v-model="inputValue"
            />
            <span class="error" v-if="errorNewDespesa">{{
                errorNewDespesa
            }}</span>
        </div>
        <button
            :disabled="
                inputValue === 0 ||
                selectType === '' ||
                (selectFixa === '' && selectVariavel === '')
            "
            type="submit"
            class="btn btn-primary btn-lg mt-1"
        >
            Inserir
        </button>
    </form>
</template>
<style>
.error {
    color: red;
    font-weight: 700;
}
.input-group {
    gap: 16px;
    width: 100%;
    padding: 0 !important;
}
.input-group-text {
    color: rgb(70, 65, 65);
    border: none;
}
#formDespesas {
    width: 90%;
    max-width: 400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: 16px;
    border: 1px solid rgba(128, 128, 128, 0.466);
    border-radius: 8px;
}
.form-select {
    width: 100%;
}
</style>
