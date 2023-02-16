import { ref, computed } from "vue";
import { defineStore } from "pinia";
import {
    calculoDespesasFixas,
    calculoDespesaVariavel,
} from "../controllers/datas";

export const useCounterStore = defineStore("counter", () => {
    const count = ref(0);
    const doubleCount = computed(() => count.value * 2);
    function increment() {
        count.value++;
    }

    return { count, doubleCount, increment };
});
const resFixas = calculoDespesasFixas();
const resVariaveis = calculoDespesaVariavel();

export const useFixaStore = defineStore("fixas", () => {
    const fixas = ref(resFixas);
    function atualizaFixas(value) {
        fixas.value = Number(value);
    }
    function normalizaMoney(value) {
        const newValue = new Intl.NumberFormat("pt-BR", {
            maximumSignificantDigits: 3,
        }).format(value);
        return newValue;
    }
    return { fixas, atualizaFixas, normalizaMoney };
});
export const useVariavelStore = defineStore("variaveis", () => {
    const variaveis = ref(resVariaveis);
    function atualizaVariavel(value) {
        variaveis.value = Number(value);
    }
    function normalizaMoney(value) {
        const newValue = new Intl.NumberFormat("pt-BR", {
            maximumSignificantDigits: 3,
        }).format(value);
        return newValue;
    }
    return { variaveis, atualizaVariavel, normalizaMoney };
});
