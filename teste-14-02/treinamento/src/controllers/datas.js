//console.log(marcoVariaveis);

import { db } from "../database/connection";
import { useVariavelStore, useFixaStore } from "../stores/counter";
import {
    calculoDespesasVariaveis,
    calculoDespesasFixas,
} from "../database/connection";
const useVariavel = useVariavelStore();
const useFixa = useFixaStore();
export async function calculoUnidadesVendidas() {
    const res = await db.get("/vendas");
    return res.data[1].marcounidades;
}
export async function getAllVendasMarco() {
    const res = await db.get("/vendas");
    return res.data[0].marco;
}
export async function custoVariavelUnidade() {
    await calculoDespesasVariaveis();
    const unidades = await calculoUnidadesVendidas();
    const custoVariavel = useVariavel.variaveis;
    const res = custoVariavel / unidades;
    return res.toFixed(2);
}
export async function custoFixoUnidade() {
    await calculoDespesasFixas();
    const unidades = await calculoUnidadesVendidas();
    const custoFixo = useFixa.fixas;
    const res = custoFixo / unidades;
    return res.toFixed(2);
}
export async function calculaLucroLiquido() {
    const vendas = await getAllVendasMarco();
    const fixo = await custoFixoUnidade();
    const variavel = await custoVariavelUnidade();
    const unidades = await calculoUnidadesVendidas();
    const custoTotal = (Number(fixo) + Number(variavel)) * unidades;
    const lucro = vendas - custoTotal;
    return lucro.toFixed(2);
}
calculaLucroLiquido();
