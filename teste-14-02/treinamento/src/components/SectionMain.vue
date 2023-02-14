<script setup>
function getName() {
    const name = localStorage.getItem("name");
    return name;
}
</script>
<template>
    <section class="section-main">
        <div
            class="section-header p-3 d-flex align-items-center justify-content-between w-100"
        >
            <h2>Delícias da Vovó</h2>
            <p>Painel de controle</p>
        </div>
        <div
            class="section-body p-2 d-flex align-items-center justify-content-between w-100"
        >
            <h4>{{ getName() }}</h4>
            <select name="mes" id="mes">
                <option value="março">Março</option>
            </select>
        </div>
        <div class="section-content d-flex justify-content-evenly w-100">
            <div class="card p-3 mb-3">
                <p>Lucro Bruto</p>
                <h3><span class="fs-6">R$</span>1789,00</h3>
            </div>
            <div class="card p-3 mb-3">
                <p>Lucro Bruto</p>
                <h3><span class="fs-6">R$</span>1789,00</h3>
            </div>
        </div>
    </section>
</template>
<style>
.section-main {
    width: 100%;
    max-width: 700px;
    margin-top: 100px;
}

.section-header {
    background-color: #7900ac;
    color: #fff;
    border-radius: 16px 16px 0 0;
}
.section-body {
    height: 100px;
    background-color: #fff;
}
.section-content {
    background-color: #fff;
}
.card {
    width: 45%;
}
</style>
