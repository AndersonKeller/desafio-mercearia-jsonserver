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
    console.log(res.data);
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
export const fixasDes = await getDespesasFixas();

export async function calculoDespesasFixas() {
    const values = Object.values(fixasDes.fixas);
    const fixas = values.reduce((acumulador, atual) => {
        return (acumulador += atual);
    }, 0);
    return useFixa.atualizaFixas(fixas);
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
    console.log(idDate);
    data.id = idDate;
    console.log(data);
    const res = await db.post("/novadespesa", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(res.data);
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
