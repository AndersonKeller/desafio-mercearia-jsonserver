<script setup>
import { ref } from "vue";
import { useFixaStore } from "../stores/counter";
import { fixasDes } from "../controllers/datas";
const fixasState = useFixaStore();
const selectType = ref("");
const selectVariavel = ref("");
const selectFixa = ref("");
const inputValue = ref(0);
function getValuesForm() {
    let newDespesa = {};
    newDespesa["tipo"] = selectType.value;
    newDespesa[
        selectType.value == "fixa" ? selectFixa.value : selectVariavel.value
    ] = inputValue.value;
    console.log(newDespesa);
    fixasDes[
        selectType.value == "fixa" ? selectFixa.value : selectVariavel.value
    ] += inputValue.value;
    console.log(fixasDes);
    const fixasTotal = Object.values(fixasDes);
    const reduceFixa = fixasTotal.reduce((acumulador, atual) => {
        return acumulador + atual;
    }, 0);
    fixasState.atualizaFixas(reduceFixa);
    return newDespesa;
}
</script>
<template>
    <form id="formDespesas" @submit.prevent="getValuesForm()">
        <p>Inserir nova despesa</p>
        <div class="input-group mb-3 w-100 d-flex flex-column">
            <select id="tipo" class="form-select w-100" v-model="selectType">
                <option value="">Escolha o tipo</option>
                <option value="fixa" selected>Fixa</option>
                <option value="variavel">Variavel</option>
            </select>
            <select
                v-if="selectType == 'variavel'"
                id="variavel"
                class="form-select w-100"
                aria-label="Default select example"
                v-model="selectVariavel"
            >
                <option value="" selected>Escolha despesa</option>
                <option value="mantimentos">Mantimentos</option>
                <option value="energia">Energia</option>
                <option value="agua">Agua</option>
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
                <option value="funcionario">Funcionario</option>
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
        </div>
        <button type="submit" class="btn btn-primary btn-lg mt-1">
            Inserir
        </button>
    </form>
</template>
