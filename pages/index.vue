<template>
    <Navigation />

    <div class="all-foods-container">
        <h1>Cold</h1>
        <div class="food-card-container">
            <div v-for="food in coldFoods" class="food-card">
                <img :src="`/images/${food.name}.png`" :alt="`/images/${food.name}.png`">
                <div class="food-card-text">
                    <h2>{{ food.name }}</h2>
                    <p>{{ food.type }}</p>
                </div>
            </div>
        </div>
        <h1>Cool</h1>
        <div class="food-card-container">
            <div v-for="food in coolFoods" class="food-card">
                <!-- <img src="../assets/images/banana.png" alt=""> -->
                <img :src="`/images/${food.name}.png`" :alt="`/images/${food.name}.png`">
                <div class="food-card-text">
                    <h2>{{ food.name }}</h2>
                    <p>{{ food.type }}</p>
                </div>
            </div>
        </div>
        <h1>Neutral</h1>
        <div class="food-card-container">
            <div v-for="food in neutralFoods" class="food-card">
                <img :src="`/images/${food.name}.png`" :alt="`/images/${food.name}.png`">
                <div class="food-card-text">
                    <h2>{{ food.name }}</h2>
                    <p>{{ food.type }}</p>
                </div>
            </div>
        </div>
        <h1>Warm</h1>
        <div class="food-card-container">
            <div v-for="food in warmFoods" class="food-card">
                <img :src="`/images/${food.name}.png`" :alt="`/images/${food.name}.png`">
                <div class="food-card-text">
                    <h2>{{ food.name }}</h2>
                    <p>{{ food.type }}</p>
                </div>
            </div>
        </div>
        <h1>Hot</h1>
        <div class="food-card-container">
            <div v-for="food in hotFoods" class="food-card">
                <img :src="`/images/${food.name}.png`" :alt="`/images/${food.name}.png`">
                <div class="food-card-text">
                    <h2>{{ food.name }}</h2>
                    <p>{{ food.type }}</p>
                </div>
            </div>
        </div>
    </div>


</template>

<script lang="ts" setup>
import axios from 'axios'
const allFoods = ref([])
const coldFoods = computed(() => {
    return allFoods.value.filter(food => food.property === "cold")
})
const coolFoods = computed(() => {
    return allFoods.value.filter(food => food.property === "cool")
})
const neutralFoods = computed(() => {
    return allFoods.value.filter(food => food.property === "neutral")
})
const warmFoods = computed(() => {
    return allFoods.value.filter(food => food.property === "warm")
})
const hotFoods = computed(() => {
    return allFoods.value.filter(food => food.property === "hot")
})

onMounted(async () => {
    try {
        const res = await axios.get('http://localhost:3000/all')
        allFoods.value = res.data
        console.log('all foods:', allFoods.value)
    } catch (error) {
        console.log("error getting foods:", error)
    }
})
</script>

<style scoped>
.all-foods-container {
    padding: 20px;
}
.food-card-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1rem;
    margin-bottom: 2rem;
}
.food-card {
    display: flex;
    width: 300px;
    /* border: 2px solid; */
}
.food-card-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 20px;
}
.food-card-text > h2 {
    font-size: 1.2rem;
}
.food-card > img {
    height: 100px;
    width: 100px;
    object-fit: cover;
    /* border: 2px solid; */
}
</style>
