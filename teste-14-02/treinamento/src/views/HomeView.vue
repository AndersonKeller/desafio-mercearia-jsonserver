<script setup>
import HeaderMain from "../components/HeaderMain.vue";
import SectionMain from "../components/SectionMain.vue";
import { setName } from "../components/HeaderMain.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const validateUser = localStorage.getItem("@merceariaToken");
if (!validateUser) {
    setName("login");
    router.push({ name: "login" });
}
</script>
<template>
    <HeaderMain></HeaderMain>
    <SectionMain></SectionMain>
</template>
