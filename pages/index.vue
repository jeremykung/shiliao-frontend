<template>
    <Navigation />

    <form @submit.prevent="submit" class="search-bar">
        <input v-model="searchTerm" type="text" name="search-term" placeholder="find food">
        <input @click="searchFood" type="submit" class="button" value="Search">
    </form>

    <div v-if="searchedFood" class="search-results-container">
        
        <h1>Search Results</h1>
        <p v-if="searchError" class="error-message">{{ searchError }}</p>
        <div v-if="searchedFood.id" class="food-card">
            <img :src="`/images/${searchedFood.name}.png`" :alt="`/images/${searchedFood.name}.png`">
            <div class="food-card-text">
                <h2>{{ searchedFood.name }}</h2>
                <p>{{ searchedFood.type }} | <span>{{ searchedFood.temperature }}</span></p>
            </div>
        </div>
    </div>

    <form @submit.prevent="submit" class="filter-bar">
        <select v-model="filterType" name="type">
            <option :value="null" disabled selected>Type</option>
            <option :value="null">All</option>
            <option value="plant">Plant</option>
            <option value="animal">Animal</option>
        </select>
        <select v-model="filterTemperature" name="temperature">Temperature
            <option :value="null" disabled selected>Temperature</option>
            <option :value="null">All</option>
            <option value="cold">Cold</option>
            <option value="cool">Cool</option>
            <option value="neutral">Neutral</option>
            <option value="warm">Warm</option>
            <option value="hot">Hot</option>
        </select>
        <input @click="filterFoods()" type="submit" class="button" value="Filter">
    </form>

    <div class="all-foods-container">
        <h1>💙 Cold</h1>
        <div class="food-card-container cold-foods">
            <div v-for="food in coldFoods" class="food-card">
                <img :src="`/images/${food.name}.png`" :alt="`/images/${food.name}.png`">
                <div class="food-card-text">
                    <h2>{{ food.name }}</h2>
                    <p>{{ food.type }}</p>
                </div>
            </div>
        </div>
        <h1>🩵 Cool</h1>
        <div class="food-card-container cool-foods">
            <div v-for="food in coolFoods" class="food-card">
                <!-- <img src="../assets/images/banana.png" alt=""> -->
                <img :src="`/images/${food.name}.png`" :alt="`/images/${food.name}.png`">
                <div class="food-card-text">
                    <h2>{{ food.name }}</h2>
                    <p>{{ food.type }}</p>
                </div>
            </div>
        </div>
        <h1>💚 Neutral</h1>
        <div class="food-card-container neutral-foods">
            <div v-for="food in neutralFoods" class="food-card">
                <img :src="`/images/${food.name}.png`" :alt="`/images/${food.name}.png`">
                <div class="food-card-text">
                    <h2>{{ food.name }}</h2>
                    <p>{{ food.type }}</p>
                </div>
            </div>
        </div>
        <h1>🧡 Warm</h1>
        <div class="food-card-container warm-foods">
            <div v-for="food in warmFoods" class="food-card">
                <img :src="`/images/${food.name}.png`" :alt="`/images/${food.name}.png`">
                <div class="food-card-text">
                    <h2>{{ food.name }}</h2>
                    <p>{{ food.type }}</p>
                </div>
            </div>
        </div>
        <h1>❤️ Hot</h1>
        <div class="food-card-container hot-foods">
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
// Search Variables
const searchTerm = ref("")
const searchedFood = ref(null)
const searchError = ref(null)
// Filter Variables
const filteredFoods = ref([])
const filterType = ref(null)
const filterTemperature = ref(null)
const coldFoods = computed(() => {
    return filteredFoods.value.filter(food => food.temperature === "cold")
})
const coolFoods = computed(() => {
    return filteredFoods.value.filter(food => food.temperature === "cool")
})
const neutralFoods = computed(() => {
    return filteredFoods.value.filter(food => food.temperature === "neutral")
})
const warmFoods = computed(() => {
    return filteredFoods.value.filter(food => food.temperature === "warm")
})
const hotFoods = computed(() => {
    return filteredFoods.value.filter(food => food.temperature === "hot")
})

function searchFood() {
    console.log('finding:', searchTerm.value.toLowerCase())
    let foodFound = false
    const searchResult = allFoods.value.forEach(item => {
        if (item.name === searchTerm.value.trim().toLowerCase()) {
            searchedFood.value = item
            searchError.value = null
            foodFound = true
        }
    })
    console.log('foodFound after loop:', foodFound)
    if (foodFound === false) {
        searchedFood.value = "not found"
        searchError.value = "Couldn't find it, check spelling!"
    }

}

function filterFoods() {
    const all = allFoods.value 
    if (!filterTemperature.value && !filterType.value) {
        filteredFoods.value = all
    } else if (!filterTemperature.value) {
        filteredFoods.value = all.filter(food => food.type === filterType.value)
    } else if (!filterType.value) {
        filteredFoods.value = all.filter(food => food.temperature === filterTemperature.value)
    } else {
        filteredFoods.value = all.filter(food => {
            if (food.temperature === filterTemperature.value && food.type === filterType.value) {
                return food
            }
        })
    }
}

onMounted(async () => {
    try {
        const res = await axios.get('http://localhost:3000/all')
        allFoods.value = res.data
        filteredFoods.value = allFoods.value
        console.log('all foods:', allFoods.value)
    } catch (error) {
        console.log("error getting foods:", error)
    }
})
</script>

<style scoped>
.search-bar {
    padding: 20px;
}
.search-results-container {
    padding: 20px;
}
.filter-bar {
    padding: 20px;
}
.all-foods-container {
    padding: 20px;
}
.search-bar > input {
    margin-right: 8px;
}
.filter-bar > select {
    margin-right: 8px;
}
.cold-foods { background-color: rgb(173, 179, 230); }
.cool-foods { background-color: lightblue; }
.neutral-foods { background-color: rgb(187, 230, 173); }
.warm-foods { background-color: rgb(230, 216, 173); }
.hot-foods { background-color: rgb(230, 183, 173); }
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
.food-card-text > p > span {
    font-style: italic;
}
.food-card > img {
    height: 100px;
    width: 100px;
    object-fit: cover;
    /* border: 2px solid; */
}
</style>
