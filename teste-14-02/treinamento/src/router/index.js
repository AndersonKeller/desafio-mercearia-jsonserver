import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("../views/HomeView.vue"),
        },
        {
            path: "/despesas",
            name: "despesas",
            component: () => import("../views/DespesasView.vue"),
        },
        {
            path: "/planejamento",
            name: "planejamento",
            component: () => import("../views/PlanejamentoView.vue"),
        },
        {
            path: "/produtos",
            name: "produtos",
            component: () => import("../views/ProdutosView.vue"),
        },
    ],
});

export default router;
