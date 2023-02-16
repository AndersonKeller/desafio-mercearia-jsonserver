<script setup>
import HeaderMain from "../components/HeaderMain.vue";
import LoginForm from "../components/LoginForm.vue";
</script>
<script>
import { newDb } from "../database/database";

console.log(newDb);
</script>
<template>
    <HeaderMain></HeaderMain>
    <LoginForm></LoginForm>
</template>
