<template>
    <div class="food-card" :class="determineBackground()">
            <img :src="`/images/${food.name}.png`" alt="">
            <div class="food-card-text">
                <h2>{{ food.name }}</h2>
                <h3>{{ food.chinese }}</h3>
                <p>{{ food.type }} / <span>{{ food.temperature }}</span></p>
            </div>
        </div>
</template>

<script lang="ts" setup>
const props = defineProps(['food', 'background'])

function determineBackground() {
    console.log('background:', props.background)
    if (props.background === "temperature") {
        return props.food.temperature
    } else if (props.background === "transparent") {
        return "transparent"
    } else {
        return null
    }
}

</script>

<style lang="css" scoped>
.food-card {
    width: 340px;
    height: 120px;
    display: flex;
    padding: 8px;
    margin-bottom: 1rem;
    background-color: rgb(247, 244, 236);
    border-radius: 4px;
    cursor: pointer;
}
.food-card-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.food-card img {
    width: 100px;
    object-fit: contain;
    padding: 4px;
    margin-right: 8px;
}
.cold { background-color: rgb(173, 179, 230); }
.cool { background-color: rgb(169, 213, 228); }
.neutral { background-color: rgb(187, 230, 173); }
.warm { background-color: rgb(230, 216, 173); }
.hot { background-color: rgb(230, 183, 173); }
.transparent { background-color: rgba(255, 255, 255, 0.5); }
</style>
