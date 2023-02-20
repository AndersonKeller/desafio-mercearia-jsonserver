//console.log(marcoVariaveis);

export const vendaMarco = 17632.89;
export const valueUnidade = 20;

export function calculoUnidadesVendidas() {
    const resultado = vendaMarco / valueUnidade;
    return parseInt(resultado);
}
