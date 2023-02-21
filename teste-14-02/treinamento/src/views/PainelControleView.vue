<template>
    <div class="modalControle">
        <div class="modal">
            <section></section>
        </div>
    </div>
</template>
<style>
.modalControle {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
}
.modalControle .modal {
    background-color: white;
    width: 100%;
    max-width: 800px;
    height: 200px;
    max-height: max-content;
    display: flex;
    margin: auto;
}
.modal section {
    width: 100%;
    height: 100%;
}
</style>
