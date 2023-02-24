import axios from "axios";
import { toRaw } from "vue";
import { useFixaStore, useVariavelStore, usersStore } from "../stores/counter";
const useVariaveis = useVariavelStore();
const useFixa = useFixaStore();
const users = usersStore();
export const db = axios.create({
    baseURL: "http://localhost:3001",
    timeout: 6000,
});

export async function connectDb() {
    const res = await db.get("/users");
    if (res.status == 200) {
        console.log("server is running");
        users.atualizaUsers(res.data);
    } else {
        console.log("server not connected");
    }
    return res.data;
}

export async function registerDb(data) {
    //const data = { email: "email@email.com", password: "12345" };
    const res = await db.post("/users", data);
    return res.data;
}
export async function loginDb(data) {
    //const data = { email: "email@email.com", password: "12345" };
    const res = await db.post("/login", data);
    return res;
}
export async function getDespesasFixas() {
    const res = await db.get("/despesas");
    const despesas = res.data[0].marco;
    const marcoFixas = despesas[0];
    return marcoFixas;
}
//export 
export async function calculoDespesasFixas() {
    const fixasDes = await getDespesasFixas();
    const values = Object.values(fixasDes.fixas);
    const fixas = values.reduce((acumulador, atual) => {
        return (acumulador += atual);
    }, 0);
    useFixa.atualizaFixas(fixas);
    return fixas;
}
export async function getDespesasVariaveis() {
    const res = await db.get("/despesas");
    const despesas = res.data[0].marco;
    const marcoVariaveis = despesas[1];
    return marcoVariaveis;
}

export async function calculoDespesasVariaveis() {
    const marcoVariaveis = await getDespesasVariaveis();
    const values = Object.values(marcoVariaveis.variaveis);
    const variaveis = values.reduce((acumulador, atual) => {
        return (acumulador += atual);
    }, 0);
    useVariaveis.atualizaVariavel(variaveis);
    return variaveis;
}
export async function postNewDespesa(data) {
    const token = localStorage.getItem("@merceariaToken");
    const idDate = new Date().getTime().toPrecision();
    data.id = idDate;
    const res = await db.post("/novadespesa", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    window.location.reload();
    return res;
}
export async function softDeleteUser(id) {
    const token = localStorage.getItem("@merceariaToken");
    const usersListRaw = users.users[0];
    const usersList = toRaw(usersListRaw);
    const findUser = usersList.find((user) => user.id == id.value);
    const res = await db.delete(`/users/${findUser.id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    window.location.reload();
    return res.data;
}
export async function getNewDespesas() {
    const res = await db.get("/novadespesa");
    return res.data;
}
export async function getNewFixas() {
    const allNewDespesas = await getNewDespesas();
    const allNewFixas = allNewDespesas.filter((desp) => desp.tipo == "fixa");
    return allNewFixas;
}
export async function getNewVariaveis() {
    const allNewDespesas = await db.get("/novadespesa");
    const allNewVariaveis = allNewDespesas.data.filter(
        (desp) => desp.tipo == "variavel"
    );
    const res = allNewVariaveis.reduce((acumulador, atual) => {
        return acumulador + atual.valor;
    }, 0);
    return res;
}
export async function calculoNewFixas() {
    const fixasList = await getNewFixas();
    const res = fixasList.reduce((acumulador, atual) => {
        return (acumulador += atual.valor);
    }, 0);
    return res;
}
export async function getProdutos() {
    const produtos = await db.get("/produto");
    const filterActive = produtos.data.filter((prod) => prod.active == true);
    return filterActive;
}
export async function editProduto(id, produto) {
    const token = localStorage.getItem("@merceariaToken");
    const newProd = toRaw(produto);
    console.log(newProd.valor);
    const res = await db.patch(
        `/produto/${id}`,
        { name: newProd.name, valor: newProd.valor },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    console.log(res);
    window.location.reload();
    return res.data;
}
export async function createProduto(produto) {
    const token = localStorage.getItem("@merceariaToken");
    const newProd = toRaw(produto);
    const id = new Date().getTime().toPrecision();
    newProd.id = id;
    newProd.active = true;
    console.log(newProd);
    try {
        const res = await db.post("/produto", newProd, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        window.location.reload();
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
export async function softDeleteProduto(produto) {
    const token = localStorage.getItem("@merceariaToken");
    const id = produto.id;
    produto.active = false;
    console.log(produto);
    const res = await db.patch(`/produto/${id}`, produto, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    window.location.reload();
    return res.data;
}
export async function getAllNewDespesas() {
    const res = await db.get("/novadespesa");
    return res.data;
}
export async function removeDespesa(id) {
    const token = localStorage.getItem("@merceariaToken");
    const res = await db.delete(`/novadespesa/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    window.location.reload();
    console.log(res);
}
export async function updateDespesa(despesaId, valor) {
    const all = await getAllNewDespesas();
    const despesa = all.find((desp) => desp.id == despesaId);
    console.log(despesa);
    despesa.valor = valor;
    const token = localStorage.getItem("@merceariaToken");
    const res = await db.patch(`/novadespesa/${despesa.id}`, despesa, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(res.data);
    window.location.reload();
    return res.data;
}
export async function updateUsuario(usuarioId, nome) {
    const all = await connectDb();
    const token = localStorage.getItem("@merceariaToken");
    const user = all.find((user) => user.id == usuarioId);
    console.log(user);
    const res = await db.patch(
        `/users/${usuarioId}`,
        { name: nome },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    window.location.reload();
    return res.data;
}
export async function createNewVenda(venda) {
    const token = localStorage.getItem("@merceariaToken");
    const res = await db.post("/novavenda", venda, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    window.location.reload();
    return res.data;
}
export async function getNewVendas() {
    const res = await db.get("/novavenda");
    return res.data;
}
export async function calculoNewVendas() {
    const vendas = await getNewVendas();
    const res = vendas.reduce((acumulador, atual) => {
        return (acumulador += atual.valor * atual.quantidade);
    }, 0);
    return res;
}
export async function quantidadesNewVendas() {
    const vendas = await getNewVendas();
    const res = vendas.reduce((acumulador, atual) => {
        return (acumulador += atual.quantidade);
    }, 0);
    return res;
}
