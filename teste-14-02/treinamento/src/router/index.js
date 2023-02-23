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
        {
            path: "/login",
            name: "login",
            component: () => import("../views/LoginView.vue"),
        },
        {
            path: "/register",
            name: "register",
            component: () => import("../views/RegistroView.vue"),
        },
        {
            path: "/painel-controle",
            name: "painel-controle",
            component: () => import("../views/PainelControleView.vue"),
        },
        {
            path: "/listas-despesas",
            name: "listas-despesas",
            component: () => import("../views/ListasDespesasView.vue"),
        },
        {
            path: "/*",
            name: "error",
            component: () => import("../views/ErrorView.vue"),
        },
    ],
});

export default router;
