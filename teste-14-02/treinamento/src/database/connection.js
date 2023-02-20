import axios from "axios";
import { useFixaStore, useVariavelStore } from "../stores/counter";
const useVariaveis = useVariavelStore();
const useFixa = useFixaStore();
export const db = axios.create({
    baseURL: "http://localhost:3001",
    timeout: 6000,
});

export async function connectDb() {
    const res = await db.get("/users");
    if (res.status == 200) {
        console.log("server is running");
    } else {
        console.log("server not connected");
    }
    return res.data;
}

export async function registerDb() {
    const data = { email: "email@email.com", password: "12345" };
    const res = await db.post("/users", data);
    return res;
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
