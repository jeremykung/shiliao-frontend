<template>
    <Navigation />

    <div class="search-filter-container">

        <form @submit.prevent="submit" class="search-bar">
            <input @input="searchFood()" v-model="searchQuery" id="search-input" type="text" name="search-term" placeholder="Type to search...">
            <!-- <input @click="searchFood()" type="submit" class="button" value="Search"> -->
        </form>
    
        <form @submit.prevent="submit" class="filter-bar">
            <select v-model="filterType" id="filter-type" name="type">
                <option :value="null" disabled selected>Type</option>
                <option :value="null">All</option>
                <option value="plant">Plant</option>
                <option value="animal">Animal</option>
            </select>
            <select v-model="filterTemperature" id="filter-temperature" name="temperature">Temperature
                <option :value="null" disabled selected>Temperature</option>
                <option :value="null">All</option>
                <option value="cold">Cold</option>
                <option value="cool">Cool</option>
                <option value="neutral">Neutral</option>
                <option value="warm">Warm</option>
                <option value="hot">Hot</option>
            </select>
            <!-- <input @click="filterFoods()" type="submit" class="button" value="Filter"> -->
        </form>

    </div>

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

const allFoods = fetchedAllFoods.value
// Search Variables
const searchQuery = ref("")
const searchedFood = ref(null)
const searchError = ref(null)
// Filter Variables
const filteredFoods = ref(allFoods)
const filterType = ref(null)
const filterTemperature = ref(null)
const coldFoods = computed(() => {
    const allColdFoods = filteredFoods.value?.filter(food => food.temperature === 'cold')
    return allColdFoods?.filter((food: { name: string, type: string, temperature: string }) => {
        if (filterTemperature.value && filterType.value) {
            return food.temperature === filterTemperature.value && food.type === filterType.value
        } else if (filterTemperature.value) {
            return food.temperature === filterTemperature.value
        } else if (filterType.value) {
            return food.type === filterType.value
        } else {
            return allColdFoods
        }
    })
})
const coolFoods = computed(() => {
    const allCoolFoods = filteredFoods.value?.filter(food => food.temperature === 'cool')
    return allCoolFoods?.filter((food: { name: string, type: string, temperature: string }) => {
        if (filterTemperature.value && filterType.value) {
            return food.temperature === filterTemperature.value && food.type === filterType.value
        } else if (filterTemperature.value) {
            return food.temperature === filterTemperature.value
        } else if (filterType.value) {
            return food.type === filterType.value
        } else {
            return allCoolFoods
        }
    })
})
const neutralFoods = computed(() => {
    const allNeutralFoods = filteredFoods.value?.filter(food => food.temperature === 'neutral')
    return allNeutralFoods?.filter((food: { name: string, type: string, temperature: string }) => {
        if (filterTemperature.value && filterType.value) {
            return food.temperature === filterTemperature.value && food.type === filterType.value
        } else if (filterTemperature.value) {
            return food.temperature === filterTemperature.value
        } else if (filterType.value) {
            return food.type === filterType.value
        } else {
            return allNeutralFoods
        }
    })
})
const warmFoods = computed(() => {
    const allWarmFoods = filteredFoods.value?.filter(food => food.temperature === 'warm')
    return allWarmFoods?.filter((food: { name: string, type: string, temperature: string }) => {
        if (filterTemperature.value && filterType.value) {
            return food.temperature === filterTemperature.value && food.type === filterType.value
        } else if (filterTemperature.value) {
            return food.temperature === filterTemperature.value
        } else if (filterType.value) {
            return food.type === filterType.value
        } else {
            return allWarmFoods
        }
    })
})
const hotFoods = computed(() => {
    const allHotFoods = filteredFoods.value?.filter(food => food.temperature === 'hot')
    return allHotFoods?.filter((food: { name: string, type: string, temperature: string }) => {
        if (filterTemperature.value && filterType.value) {
            return food.temperature === filterTemperature.value && food.type === filterType.value
        } else if (filterTemperature.value) {
            return food.temperature === filterTemperature.value
        } else if (filterType.value) {
            return food.type === filterType.value
        } else {
            return allHotFoods
        }
    })
})

function searchFood() {
    const re = new RegExp(searchQuery.value, "gi")
    const filtered = [...allFoods].filter(food => re.test(food.name))
    console.log('filtered foods:', filtered)
    filteredFoods.value = filtered
}

</script>

<style scoped>
.search-filter-container {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}
.search-bar {
    margin: 1rem 20px;
    width: 100%;
    display: flex;
    justify-content: center;
}
.filter-bar {
    margin: 1rem 20px;
    display: flex;
    justify-content: center;
}
.all-foods-container {
    margin: 20px;
    border-radius: 4px;
    overflow: hidden;
}
#search-input {
    width: 100%;
    /* margin-right: 8px; */
}
#filter-type {
    margin-right: 8px;
}
.cold-foods { background-color: rgb(173, 195, 230); }
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

@media only screen and (max-width: 700px) {
  .search-filter-container {
    flex-direction: column;
  }
  .search-bar {
    margin: 1rem;
    width: auto;
  }
  #search-input {
    /* width: 100%; */
    text-align: center;
  }
  .filter-bar {
    margin: 0 1rem;
    margin-bottom: 1rem;
  }
  #filter-type {
    width: 40%;
  }
  #filter-temperature {
    width: 60%;
  }
}
</style>
