import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { calculoDespesasFixas } from "../controllers/datas";

export const useCounterStore = defineStore("counter", () => {
    const count = ref(0);
    const doubleCount = computed(() => count.value * 2);
    function increment() {
        count.value++;
    }

    return { count, doubleCount, increment };
});
const res = calculoDespesasFixas();
export const useFixaStore = defineStore("fixas", () => {
    const fixas = ref(res);
    function atualizaFixas(value) {
        fixas.value = Number(value);
    }
    return { fixas, atualizaFixas };
});
