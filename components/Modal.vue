<template>
    <div class="background">
        <div class="modal">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>

</script>

<style>
.background {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgb(0, 0, 0, 0.7);
}

.modal {
    margin: auto;
    margin-top: 10%;
    width: 300px;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    box-sizing: border-box;
    border-radius: 8px;
    background-color: rgb(245, 237, 223);
    ;
}
</style>