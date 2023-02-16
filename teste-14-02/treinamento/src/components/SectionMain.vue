<script setup>
import { useFixaStore, useVariavelStore } from "../stores/counter";

import {
    calculoUnidadesVendidas,
    vendaMarco,
    custoVariavelPorUnidade,
    custoTotalUnidade,
    lucroLiquido,
} from "../controllers/datas";
import DespesasForm from "./DespesasForm.vue";
function getName() {
    const name = localStorage.getItem("name");
    return name;
}
const name = getName();
const unidades = calculoUnidadesVendidas();
const custoVariavelUnidade = custoVariavelPorUnidade();
const despesaTotalUnidade = custoTotalUnidade();
const liquido = lucroLiquido();
const despesasFixas = useFixaStore();
const despesasVariaveis = useVariavelStore();
const valueFixas = despesasFixas.fixas;
const valueVariavel = despesasVariaveis.variaveis;
</script>
<template>
    <section class="section-main">
        <div
            class="section-header p-3 d-flex align-items-center justify-content-between w-100"
        >
            <h2>Delícias da Vovó</h2>
            <p>Painel de controle</p>
        </div>
        <div
            class="section-body p-3 d-flex align-items-center justify-content-between w-100"
        >
            <h4>{{ name }}</h4>
            <select v-if="name == 'Dashboard'" name="mes" id="mes">
                <option value="março">Março</option>
            </select>
        </div>
        <div
            v-if="name == 'Dashboard'"
            class="section-content d-flex flex-wrap justify-content-evenly w-100"
        >
            <div class="card p-3 mb-3">
                <p>Lucro Líquido</p>
                <h3><span class="fs-6">R$</span>{{ liquido }}</h3>
            </div>
            <div class="card p-3 mb-3">
                <p>Unidades vendidas</p>
                <h3>{{ unidades }}</h3>
            </div>
            <div class="card p-3 mb-3">
                <p>Total de vendas</p>
                <h3><span class="fs-6">R$</span>{{ vendaMarco }}</h3>
            </div>
            <div class="card p-3 mb-3">
                <p>Custo variavel por unidade</p>
                <h3><span class="fs-6">R$</span>{{ custoVariavelUnidade }}</h3>
            </div>
            <div class="card p-3 mb-3">
                <p>Custo total por unidade</p>
                <h3><span class="fs-6">R$</span>{{ despesaTotalUnidade }}</h3>
            </div>
        </div>
        <div
            v-if="name == 'Despesas'"
            class="section-content d-flex flex-wrap justify-content-evenly w-100"
        >
            <div>
                <div class="card p-3 mb-3 w-100">
                    <p>Total de despesas fixas</p>
                    <h3><span class="fs-6">R$</span>{{ valueFixas }}</h3>
                </div>
                <div class="card p-3 mb-3 w-100">
                    <p>Total de despesas variaveis</p>
                    <h3>
                        <span class="fs-6">R$</span
                        >{{ despesasVariaveis.normalizaMoney(valueVariavel) }}
                    </h3>
                </div>
            </div>
            <DespesasForm></DespesasForm>
        </div>
    </section>
</template>
<style>
.section-main {
    width: 100%;
    max-width: 700px;
    margin-top: 100px;
}

.section-header {
    background-color: #7900ac;
    color: #fff;
    border-radius: 16px 16px 0 0;
}
.section-body {
    height: 100px;
    background-color: #fff;
}
.section-content {
    background-color: #fff;
}
.card {
    width: 45%;
    height: max-content;
}
</style>
