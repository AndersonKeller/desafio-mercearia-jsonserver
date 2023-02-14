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
export const useNameStore = defineStore("name", (name) => {
    const nameAtual = ref("");
    function atualizaName() {
        nameAtual.value = name;
    }
    return { atualizaName, nameAtual, name };
});
/*export function nameDash(name) {
    const thisName = ref("");
    console.log(thisName.value);
    function setName() {
        thisName.value = name;
    }

    return { thisName, setName };
}*/
