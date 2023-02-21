import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
    const count = ref(0);
    const doubleCount = computed(() => count.value * 2);
    function increment() {
        count.value++;
    }

    return { count, doubleCount, increment };
});
export const useFixaStore = defineStore("fixas", () => {
    const fixas = ref(0);
    function atualizaFixas(value) {
        fixas.value = Number(value);
    }
    return { fixas, atualizaFixas };
});
export const useVariavelStore = defineStore("variaveis", () => {
    const variaveis = ref(0);
    function atualizaVariavel(value) {
        variaveis.value = Number(value);
    }
    return { variaveis, atualizaVariavel };
});
