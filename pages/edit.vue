<template>
    <Navigation />

    <div class="edit-blurb">
        <h1>Edit</h1>
        <p>Click on an food to edit</p>
    </div>

    <input @input="filterFood()" v-model="searchQuery" class="search-bar" type="text" placeholder="Search">

    <div class="all-foods-container">
        <div v-for="food in filteredFoods" class="food-card">
            <img :src="`/images/${food.name}.png`" alt="">
            <div class="food-card-text">
                <h2>{{ food.name }}</h2>
                <p>{{ food.type }} / <span>{{ food.temperature }}</span></p>
            </div>
        </div>
    </div>

    <!-- Add Edit Module Overlay -->

</template>

<script lang="ts" setup>
import axios from 'axios'

const allFoods = ref([])
const searchQuery = ref('')
const filteredFoods = ref(null)

function filterFood() {
    const re = new RegExp(searchQuery.value, "gi")
    const filtered = [...allFoods.value].filter(food => re.test(food.name))
    console.log('filtered foods:', filtered)
    filteredFoods.value = filtered
}

const errorMessage = ref('')

function searchFood() {
    const result = allFoods.value.find(food => food.name === searchTerm.value)
    if (!result) {
        errorMessage.value = "Food not found, check spelling!"
        searchResult.value = null
    } else {
        searchResult.value = result
        errorMessage.value = ''
    }
    console.log(result)
}

onMounted(async () => {
    try {
        const result = await axios.get("http://localhost:3000/all")
        allFoods.value = result.data
        filteredFoods.value = result.data
    } catch (error) {
        console.log('error loading foods:', error)
    }
})
</script>

<style scoped>
.edit-blurb {
    text-align: center;
    margin-top: 1.5rem;
    margin-bottom: 2rem;
}
.search-bar {
    margin: 1rem auto;
    display: block;
    width: 240px;
    text-align: center;
}
.all-foods-container {
    flex-wrap: wrap;
    display: flex;
    justify-content: space-around;
}
.food-card {
    width: 300px;
    height: 100px;
    display: flex;
    padding: 8px;
    margin-bottom: 1rem;
    background-color: rgb(247, 244, 236);
    border-radius: 8px;
    cursor: pointer;
}
.food-card-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.food-card img {
    width: 100px;
    object-fit: cover;
    margin-right: 1rem;
}
</style>
