//console.log(marcoVariaveis);

import { db } from "../database/connection";

export const vendaMarco = 17632.89;
export const valueUnidade = 20;

export function calculoUnidadesVendidas() {
    const resultado = vendaMarco / valueUnidade;
    return parseInt(resultado);
}
export async function getAllVendasMarco() {
    const res = await db.get("/vendas");
    return res.data[0].marco;
}
