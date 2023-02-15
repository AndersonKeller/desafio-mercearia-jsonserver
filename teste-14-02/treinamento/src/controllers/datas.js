export const marcoVariaveis = {
    mantimentos: 4356,
    energia: 2879,
    agua: 150,
    gasolina: 659.54,
};
export const fixasDes = {
    internet: 99,
    funcionario: 2500,
    contabilidade: 600,
    imposto: 900,
    aluguel: 4561,
};
export const vendaMarco = 17632.89;
export const valueUnidade = 20;

export function calculoUnidadesVendidas() {
    const resultado = vendaMarco / valueUnidade;
    return parseInt(resultado);
}

export function calculoDespesaVariavel() {
    const valuesVariaveis = Object.values(marcoVariaveis);
    const variaveis = valuesVariaveis.reduce((acumulador, atual) => {
        return (acumulador += atual);
    }, 0);
    return variaveis;
}
export function calculoDespesasFixas() {
    const valuesFixos = Object.values(fixasDes);
    const fixas = valuesFixos.reduce((acumulador, atual) => {
        return (acumulador += atual);
    }, 0);
    return fixas;
}
export function custoVariavelPorUnidade() {
    const variavelTotal = calculoDespesaVariavel();
    const unidades = calculoUnidadesVendidas();
    const resultado = variavelTotal / unidades;
    return resultado.toFixed(2);
}

export function custoTotalUnidade() {
    const variavelUnidade = custoVariavelPorUnidade();
    const totalFixas = calculoDespesasFixas();
    const unidades = calculoUnidadesVendidas();
    const custoFixoUnidade = totalFixas / unidades;
    return (custoFixoUnidade + Number(variavelUnidade)).toFixed(2);
}
export function lucroLiquido() {
    const custoTotal = custoTotalUnidade();
    const unidades = calculoUnidadesVendidas();
    const res = vendaMarco - custoTotal * unidades;
    return res.toFixed(2);
}
