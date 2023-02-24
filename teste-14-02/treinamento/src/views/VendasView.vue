<script setup>
import HeaderMain from "../components/HeaderMain.vue";
import { ref } from "vue";
import {
    getProdutos,
    createNewVenda,
    calculoNewVendas,
} from "../database/connection";
const produtos = ref([]);
const quantidade = ref(1);
const produtoName = ref("");
const id = ref(0);
const newVendas = ref(0);
const newVendasBRL = ref(0);
const openQuantidade = ref(false);
(async () => {
    produtos.value = await getProdutos();
    newVendas.value = await calculoNewVendas();
    newVendasBRL.value = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(newVendas.value);
})();
function increment() {
    quantidade.value++;
}
function decrement() {
    quantidade.value--;
}
function showQuantidade(produto) {
    produtoName.value = produto.name;
    id.value = produto.id;
    openQuantidade.value = !openQuantidade.value;
}
async function newVenda() {
    const produtoValor = produtos.value.find((prod) => prod.id == id.value);
    console.log(produtoValor);
    const newVenda = {
        name: produtoName.value,
        valor: produtoValor.valor,
        quantidade: quantidade.value,
    };
    const res = await createNewVenda(newVenda);
    console.log(res);
}
</script>
<template>
    <HeaderMain></HeaderMain>
    <div class="wrapperVendas">
        <section>
            <div class="divProduto" v-for="prod in produtos" :key="prod.id">
                <p>{{ prod.name }}</p>
                <h3><small>R$</small>{{ prod.valor.toFixed(2) }}</h3>
                <button @click="showQuantidade(prod)">Vender</button>
            </div>
        </section>
        <div>
            <h3 class="titleVendas">Total de vendas no período</h3>
            <p class="valueVendas">{{ newVendasBRL }}</p>
        </div>
        <div v-if="openQuantidade" class="quantidadeVenda">
            <div class="divTotal">
                <h3>{{ produtoName }}</h3>
                <div class="grupoQuantidade">
                    <button @click="decrement">-</button>
                    <input type="number" v-model="quantidade" />
                    <button @click="increment">+</button>
                </div>
                <button class="btnClose" @click="showQuantidade(id)">X</button>
                <button class="btnNewVenda" @click="newVenda">Confirmar</button>
            </div>
        </div>
    </div>
</template>
<style>
.titleVendas {
    text-transform: uppercase;
    font-weight: 600;
    padding-left: 16px;
    margin-top: 24px;
}
.valueVendas {
    padding-left: 16px;
    color: #1d7004;
    font-size: 32px;
    font-weight: 800;
    background-color: rgba(40, 41, 41, 0.158);
}
.btnNewVenda {
    border-radius: 8px;
    border: none;
    background-color: rgb(136, 136, 202);
    color: #fff;
    padding: 6px;
    margin-top: 10px;
}
.wrapperVendas {
    margin-top: 100px;
    width: 100%;
    max-width: 600px;
    height: 400px;
    background-color: #fff;
}
.btnClose {
    position: absolute;
    top: 16px;
    right: 16px;
    border: none;
    border-radius: 8px;
    font-weight: 800;
}
.divProduto {
    border: 1px solid gray;
    height: max-content;
    padding: 10px;
    border-radius: 8px;
    width: 170px;
    background-color: aliceblue;
}
.divProduto p {
    font-weight: 800;
}
.divProduto small {
    font-size: 14px;
}
.divProduto button {
    border: none;
    background-color: #08ee68;
    padding: 6px;
    border-radius: 8px;
    color: #fff;
    font-weight: 800;
}
.divTotal {
    width: 200px;
    height: 250px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    gap: 16px;
    border-radius: 32px;
    border: 2px solid rgb(3, 3, 71);
}
.quantidadeVenda {
    position: absolute;
    z-index: 99;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
}
.grupoQuantidade {
    display: flex;
    flex-direction: row;
}
.grupoQuantidade input {
    width: 50px;
    border: none;
    padding-left: 10px;
    font-weight: 800;
    color: green;
}
.grupoQuantidade button:nth-child(3) {
    border: none;
    color: #fff;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    background-color: green;
}
.grupoQuantidade button:nth-child(1) {
    border: none;
    color: #fff;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    background-color: red;
}
section {
    width: 100%;
    height: 50%;
    display: flex;
    padding: 16px;
    gap: 16px;
    justify-content: center;
    overflow-x: auto;
}
</style>
