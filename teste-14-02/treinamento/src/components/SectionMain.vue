<script setup>
import { ref } from "vue";
import {
    calculoUnidadesVendidas,
    getAllVendasMarco,
    custoVariavelUnidade,
    custoFixoUnidade,
    calculaLucroLiquido,
    calculoUnidadesPlanejamento,
    calculoRestanteEquipamentos,
    calculoNovasDespesasPlanejamento,
    calculoCustoTotalAbril,
    calculoCustoVariavelAbril,
    lucroLiquidoAbril,
} from "../controllers/datas";
import DespesasForm from "./DespesasForm.vue";
import {
    getNewVariaveis,
    calculoNewFixas,
    getProdutos,
    editProduto,
    createProduto,
    softDeleteProduto,
    calculoNewVendas,
    quantidadesNewVendas,
} from "../database/connection";
const variaveis = ref(0);
const valueVariavelBRL = ref(0);
const fixas = ref(0);
const valueFixasBRL = ref(0);
const userAdmin = ref(false);
const produto = ref([]);
const openEdit = ref(false);
const openAdicionar = ref(false);
const prodName = ref("");
const prodValor = ref(0);
const prodId = ref(1);
const newObj = ref({});
const unidadesPlanejamento = ref(0);
const restantePlanejamento = ref(0);
const valueRestanteBRL = ref(0);
const novasFixasPlanejamento = ref(0);
const novasFixasPlanejamentoBRL = ref(0);
const mesVigente = ref("marco");
const vendasAbril = ref(0);
const vendaasAbrilBRL = ref(0);
const quantidadeAbril = ref(0);
const custoTotalAbril = ref(0);
const custoTotalAbrilBRL = ref(0);
const custoVariavelAbril = ref(0);
const custoVariavelAbrilBRL = ref(0);
const liquidoAbril = ref(0);
const liquidoAbrilBRL = ref(0);
function getName() {
    const name = localStorage.getItem("name");
    return name;
}
async function getUserLocal() {
    const userAdmin = localStorage.getItem("@isAdmin");
    if (userAdmin) {
        return true;
    }
    return false;
}
(async () => {
    variaveis.value = await getNewVariaveis();
    valueVariavelBRL.value = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(variaveis.value);
    fixas.value = await calculoNewFixas();
    valueFixasBRL.value = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(fixas.value);
    produto.value = await getProdutos();
    userAdmin.value = await getUserLocal();
    unidadesPlanejamento.value = await calculoUnidadesPlanejamento(5000);
    restantePlanejamento.value = await calculoRestanteEquipamentos();
    valueRestanteBRL.value = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(restantePlanejamento.value);
    novasFixasPlanejamento.value = await calculoNovasDespesasPlanejamento();
    novasFixasPlanejamentoBRL.value = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(novasFixasPlanejamento.value);
    vendasAbril.value = await calculoNewVendas();
    vendaasAbrilBRL.value = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(vendasAbril.value);
    quantidadeAbril.value = await quantidadesNewVendas();
    custoTotalAbril.value = await calculoCustoTotalAbril();
    custoTotalAbrilBRL.value = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(custoTotalAbril.value);
    custoVariavelAbril.value = await calculoCustoVariavelAbril();
    custoVariavelAbrilBRL.value = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(custoVariavelAbril.value);
    liquidoAbril.value = await lucroLiquidoAbril();
    liquidoAbrilBRL.value = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(liquidoAbril.value);
})();
const name = getName();

async function showEditProduto(id, produto) {
    openEdit.value = !openEdit.value;
    prodName.value = produto.name;
    prodValor.value = produto.valor;
    prodId.value = id;
}
async function atualizaProduto() {
    newObj.value = {
        name: prodName.value,
        valor: prodValor.value,
    };
    const res = await editProduto(prodId.value, newObj.value);
    return res;
}
async function adicionaProduto() {
    const newProduto = {
        name: prodName.value,
        valor: prodValor.value,
    };
    const res = await createProduto(newProduto);
    return res;
}
function closeEdit() {
    openEdit.value = false;
    openAdicionar.value = false;
}
function showAdicionarProduto() {
    openAdicionar.value = !openAdicionar.value;
}
</script>
<script>
const variavelUnidadeBRL = ref(0);
const despesaTotalBRL = ref(0);
const unidades = ref(0);
const vendaMarcoBRL = ref(0);
const liquidoBRL = ref(0);
(async () => {
    const variavelUnidade = await custoVariavelUnidade();
    variavelUnidadeBRL.value = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(variavelUnidade);
    despesaTotalBRL.value = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(despesaTotal);
    const despesaTotal = Number(custoFixo) + Number(variavelUnidade);
    const vendaMarco = await getAllVendasMarco();
    unidades.value = await calculoUnidadesVendidas();
    const custoFixo = await custoFixoUnidade();
    vendaMarcoBRL.value = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(vendaMarco);
    const liquido = await calculaLucroLiquido();
    liquidoBRL.value = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(liquido);
})();
</script>
<template>
    <section class="section-main">
        <div
            class="section-header p-3 d-flex align-items-center justify-content-between w-100"
        >
            <h2>Del??cias da Vov??</h2>
            <a v-if="userAdmin" href="/painel-controle">Painel de controle</a>
            <a v-if="name == 'Despesas'" href="/listas-despesas"
                >Listar despesas</a
            >
        </div>
        <div
            class="section-body p-3 d-flex align-items-center justify-content-between w-100"
        >
            <h4>{{ name }}</h4>
            <select
                v-model="mesVigente"
                v-if="name == 'Dashboard'"
                name="mes"
                id="mes"
            >
                <option value="marco">Mar??o</option>
                <option value="abril">Abril</option>
            </select>
        </div>
        <div
            v-if="name == 'Dashboard'"
            class="section-content d-flex flex-wrap justify-content-evenly w-100"
        >
            <div v-if="userAdmin" class="card p-3 mb-3">
                <p>Lucro L??quido</p>
                <h3 v-if="mesVigente == 'marco'">{{ liquidoBRL }}</h3>
                <h3 v-if="mesVigente == 'abril'">{{ liquidoAbrilBRL }}</h3>
            </div>
            <div class="card p-3 mb-3">
                <p>Unidades vendidas</p>
                <h3 v-if="mesVigente == 'marco'">{{ unidades }}</h3>
                <h3 v-if="mesVigente == 'abril'">{{ quantidadeAbril }}</h3>
            </div>
            <div class="card p-3 mb-3">
                <p>Total de vendas</p>
                <h3 v-if="mesVigente == 'marco'">{{ vendaMarcoBRL }}</h3>
                <h3 v-if="mesVigente == 'abril'">{{ vendaasAbrilBRL }}</h3>
            </div>
            <div v-if="userAdmin" class="card p-3 mb-3">
                <p>Custo vari??vel por unidade</p>
                <h3 v-if="mesVigente == 'marco'">{{ variavelUnidadeBRL }}</h3>
                <h3 v-if="mesVigente == 'abril'">
                    {{ custoVariavelAbrilBRL }}
                </h3>
            </div>
            <div v-if="userAdmin" class="card p-3 mb-3">
                <p>Custo total por unidade</p>
                <h3 v-if="mesVigente == 'marco'">{{ despesaTotalBRL }}</h3>
                <h3 v-if="mesVigente == 'abril'">{{ custoTotalAbrilBRL }}</h3>
            </div>
        </div>
        <div
            v-if="name == 'Despesas'"
            class="section-content d-flex flex-wrap justify-content-evenly w-100"
        >
            <div class="card p-3 mb-3">
                <p>Total de despesas fixas</p>
                <h3>{{ valueFixasBRL }}</h3>
            </div>
            <div class="card p-3 mb-3">
                <p>Total de despesas variaveis</p>
                <h3>{{ valueVariavelBRL }}</h3>
            </div>
            <DespesasForm></DespesasForm>
        </div>
        <div
            v-if="name == 'Planejamento'"
            class="section-content d-flex flex-wrap w-100"
        >
            <div class="divPlanejamento">
                <div class="card p-3 mb-3">
                    <p>Unidades de bolos para atingir a meta de lucro do m??s</p>
                    <h3>{{ unidadesPlanejamento }} <small>unid.</small></h3>
                </div>
                <div class="card p-3 mb-3">
                    <p>Valor faltante para os equipamentos</p>
                    <h3>{{ valueRestanteBRL }}</h3>
                </div>
                <div class="card p-3 mb-3">
                    <p>Suas novas despesas fixas ser??o:</p>
                    <h3>{{ novasFixasPlanejamentoBRL }}</h3>
                </div>
            </div>
            <div class="divPlanejamento rigth">
                <p>Levando em conta as seguintes informa????es:</p>
                <span>- 3 novos funcion??rios</span>
                <span>- Novo aluguel de R$ 8.000,00</span>
                <span>- Equipamentos no valor de R$ 30.000,00</span>
            </div>
        </div>
        <div
            v-if="name == 'Produtos'"
            class="section-content d-flex flex-wrap justify-content-evenly w-100"
        >
            <div v-for="prod in produto" :key="prod.name" class="card p-3 mb-3">
                <p class="prodNameText">{{ prod.name }}</p>
                <h3>R$ {{ prod.valor }}</h3>
                <span class="spanPrice">Valor de venda</span>
                <div class="divBtns">
                    <button
                        class="btnEdit"
                        @click="showEditProduto(prod.id, prod)"
                    >
                        Editar
                    </button>
                    <button @click="softDeleteProduto(prod)" class="btnTrash">
                        Excluir
                    </button>
                </div>
            </div>
            <button @click="showAdicionarProduto" class="btnAdicionarproduto">
                Adicionar produto +
            </button>
        </div>
        <div class="wrapperEdit" v-if="openEdit">
            <div class="editModal">
                <h4>Editar o produto</h4>
                <label for="">Nome</label>
                <input type="text" placeholder="Nome" v-model="prodName" />
                <label for="">Valor</label>
                <button class="btnClose" @click="closeEdit">X</button>
                <input type="number" v-model="prodValor" />
                <button
                    class="btn btn-primary btn-lg mt-1"
                    @click="atualizaProduto"
                >
                    Alterar
                </button>
            </div>
        </div>
        <div class="wrapperEdit" v-if="openAdicionar">
            <div class="editModal">
                <h4>Adicionar produto</h4>
                <label for="">Nome</label>
                <input type="text" placeholder="Nome" v-model="prodName" />
                <label for="">Valor</label>
                <button class="btnClose" @click="closeEdit">X</button>
                <input type="number" v-model="prodValor" />
                <button
                    :disabled="prodValor == 0 || prodName == ''"
                    class="btn btn-primary btn-lg mt-1"
                    @click="adicionaProduto"
                >
                    Adicionar
                </button>
            </div>
        </div>
    </section>
</template>
<style>
#mes {
    border-radius: 16px;
    padding: 6px 12px;
    background-color: #428a97;
    color: #fff;
    font-weight: 800;
}
.divBtns {
    display: flex;
    width: 100%;
    justify-content: space-between;
}
.btnTrash {
    border: none;
    border-radius: 8px;
    color: rgb(216, 64, 64);
    font-weight: 700;
}
.btnAdicionarproduto {
    position: absolute;
    top: -44px;
    right: 16px;
    border: none;
    border-radius: 16px;
    padding: 0 22px;
    background-color: #91cecb96;
}
.prodNameText {
    font-size: 1.25rem;
    font-weight: 600;
}
.btnEdit {
    border: none;
    color: #fff;
    background-color: rgb(37, 150, 37);
    font-weight: 700;
    padding: 6px;
    border-radius: 8px;
    width: 50%;
}
.divPlanejamento {
    margin-left: 32px;
    width: 100%;
    max-width: 250px;
}
.divPlanejamento p {
    color: rgb(62, 62, 233);
    font-weight: 700;
    font-size: 1rem;
}
.divPlanejamento span {
    display: block;
    margin-top: 16px;
    border-bottom: 1px solid green;
    text-transform: uppercase;
}
.divPlanejamento div {
    border: 2px solid rgba(110, 190, 110, 0.521);
    background-color: #7800ac28;
    height: 150px;
    display: flex;
    justify-content: space-between;
}
.rigth {
    width: 90%;
    margin: 10px auto;
    max-width: 250px;
}
.btnClose {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    border-radius: 16px;
    font-weight: 800;
}
.wrapperEdit {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}
.editModal {
    background-color: #fff;
    width: 95%;
    max-width: 300px;
    height: 300px;
    padding: 16px 22px;
    border: 1px solid black;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}
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
.section-header a {
    font-weight: 500;
    color: #fff;
    text-decoration: underline;
}
.section-body {
    height: 100px;
    background-color: #fff;
}
.section-content {
    background-color: #fff;
}
.card {
    width: 90%;
    height: max-content;
}
.spanPrice {
    color: rgb(189, 87, 87);
    font-weight: 800;
}
@media (min-width: 700px) {
    .card {
        max-width: 300px;
    }
}
</style>
