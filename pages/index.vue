<template>
    <Navigation />

    <form @submit.prevent="submit" class="search-bar">
        <input @input="searchFood()" v-model="searchQuery" type="text" name="search-term" placeholder="Search">
        <input @click="searchFood()" type="submit" class="button" value="Search">
    </form>

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
        <div class="cold-foods food-section">
            <h1>Cold</h1>
            <div class="food-card-container">
                <FoodCard v-for="food in coldFoods" :key="food.id" :food="food" background="transparent" />
            </div>
        </div>

        <div class="cool-foods food-section">
            <h1>Cool</h1>
            <div class="food-card-container">
                <FoodCard v-for="food in coolFoods" :key="food.id" :food="food" background="transparent" />
            </div>
        </div>

        <div class="neutral-foods food-section">
            <h1>Neutral</h1>
            <div class="food-card-container">
                <FoodCard v-for="food in neutralFoods" :key="food.id" :food="food" background="transparent" />
            </div>
        </div>

        <div class="warm-foods food-section">
            <h1>Warm</h1>
            <div class="food-card-container">
                <FoodCard v-for="food in warmFoods" :key="food.id" :food="food" background="transparent" />

            </div>
        </div>

        <div class="hot-foods food-section">
            <h1>Hot</h1>
            <div class="food-card-container">
                <FoodCard v-for="food in hotFoods" :key="food.id" :food="food" background="transparent" />
            </div>
        </div>
    </div>


</template>

<script lang="ts" setup>

// Pre Load Data
const { data: fetchedAllFoods } = await useFetch('/api/get-all')

interface Food {
  id: number;
  name: string;
  type: string;
  temperature: string;
}

const allFoods = ref(fetchedAllFoods.value)
// Search Variables
const searchQuery = ref("")
const searchedFood = ref(null)
const searchError = ref(null)
// Filter Variables
const filteredFoods: Ref<Food[]> = ref(allFoods.value)
const filterType = ref(null)
const filterTemperature = ref(null)
const coldFoods = computed(() => {
    return filteredFoods.value.filter((food: { name: string, type: string, temperature: string }) => food.temperature === "cold")
})
const coolFoods = computed(() => {
    return filteredFoods.value.filter((food: { name: string, type: string, temperature: string }) => food.temperature === "cool")
})
const neutralFoods = computed(() => {
    return filteredFoods.value.filter((food: { name: string, type: string, temperature: string }) => food.temperature === "neutral")
})
const warmFoods = computed(() => {
    return filteredFoods.value.filter((food: { name: string, type: string, temperature: string }) => food.temperature === "warm")
})
const hotFoods = computed(() => {
    return filteredFoods.value.filter((food: { name: string, type: string, temperature: string }) => food.temperature === "hot")
})

function searchFood() {
    const re = new RegExp(searchQuery.value, "gi")
    const filtered = [...allFoods.value].filter(food => re.test(food.name))
    console.log('filtered foods:', filtered)
    filteredFoods.value = filtered
}

function filterFoods() {
    const all = allFoods.value 
    if (!filterTemperature.value && !filterType.value) {
        filteredFoods.value = all
    } else if (!filterTemperature.value) {
        filteredFoods.value = all!.filter(food => food.type === filterType.value)
    } else if (!filterType.value) {
        filteredFoods.value = all!.filter(food => food.temperature === filterTemperature.value)
    } else {
        filteredFoods.value = all!.filter(food => {
            if (food.temperature === filterTemperature.value && food.type === filterType.value) {
                return food
            }
        })
    }
}

</script>

<style scoped>
.search-bar {
    padding: 20px;
}
/* .search-results-container {
    padding: 20px;
} */
.filter-bar {
    padding: 20px;
}
.all-foods-container {
    margin: 20px;
    border-radius: 1rem;
    overflow: hidden;

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
.food-section {
    padding: 1rem;
}
.food-section > h1 {
    text-align: center;
    margin-bottom: 1rem;
}
.food-card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>
