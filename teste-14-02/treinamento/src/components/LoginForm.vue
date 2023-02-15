<template>
    <form class="d-flex w-50 p-2 align-items-center justify-content-center">
        <div class="input-group mb-3 w-50 d-flex flex-column">
            <span class="input-group-text" id="basic-addon1">Usuário</span>
            <input
                type="text"
                class="form-control w-100"
                placeholder="Digite seu usuário"
                aria-label="Username"
                aria-describedby="basic-addon1"
            />
            <span class="input-group-text" id="basic-addon2">Senha</span>
            <input
                type="text"
                class="form-control w-100"
                placeholder="Digite sua senha"
                aria-label="Username"
                aria-describedby="basic-addon2"
            />
        </div>
    </form>
</template>
<style>
form {
    height: 100vh;
}
</style>
