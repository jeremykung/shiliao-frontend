<template>
    <Navigation />

    <div class="edit-blurb">
        <h1>Edit</h1>
        <p>Click on an food to edit</p>
    </div>

    <input @input="filterFood()" v-model="searchQuery" class="search-bar" type="text" placeholder="Search">

    <div class="all-foods-container">
        <FoodCard v-for="food in filteredFoods" :key="food.id" :food="food" background="temperature" @click="editFood(food)"></FoodCard>
    </div>

    <!-- Add Edit Module Overlay -->
    <Modal v-if="foodToEdit">
        <form @submit.prevent="onSubmit" class="edit-food-modal">
            <h2>Edit Food</h2>
            <img :src="`/images/${foodToEdit.name}.png`">
            <input v-model="foodToEdit.name" type="text">
            <div class="edit-food-selects">
                <select v-model="foodToEdit.type" name="type" id="type">
                    <option value="plant">Plant</option>
                    <option value="animal">Animal</option>
                </select>
                <select v-model="foodToEdit.temperature" name="temperature" id="temperature">
                    <option value="cold">Cold</option>
                    <option value="cool">Cool</option>
                    <option value="neutral">Neutral</option>
                    <option value="warm">Warm</option>
                    <option value="hot">Hot</option>
                </select>
            </div>
            <input @click="saveEdit()" type="submit" value="Save" class="button">
            <input @click="deleteFood()" type="submit" value="Delete" class="button-danger">
        </form>
    </Modal>

</template>

<script lang="ts" setup>
const { data: fetchedAllFoods } = await useFetch('/api/get-all')

interface Food {
    id: number,
    name: string,
    type: string,
    temperature: string,
}

let allFoods = fetchedAllFoods.value
const searchQuery = ref('')
const filteredFoods = ref(allFoods)
const foodToEdit = ref(null)

function filterFood() {
    console.log('filtering from all foods:', allFoods)
    const re = new RegExp(searchQuery.value, "gi")
    const filtered = [...allFoods!].filter(food => re.test(food.name))
    console.log('filtered foods:', filtered)
    filteredFoods.value = filtered
}

function editFood(food: Food) {
    foodToEdit.value = food
}

async function saveEdit() {
    console.log('saving edits:', foodToEdit.value)
    try {
        console.log('updating food to:', foodToEdit.value)
        const result = await $fetch('/api/update-food', {
            method: 'POST',
            body: foodToEdit.value
        })
        console.log('update result:', result)
        foodToEdit.value = null
    } catch (error) {
        console.log('error updating:', error)
    }

}

async function deleteFood() {
    console.log('deleting:', foodToEdit.value.name)
    try {
        const foodId = foodToEdit.value.id
        const result = await $fetch('/api/delete-food', {
            method: 'POST',
            body: foodId,
        })
        console.log('delete result:', result)
        foodToEdit.value = null
        allFoods = allFoods.filter(food => food.id !== foodId)
        filteredFoods.value = null
    } catch (error) {
        console.log('error deleting:', error)
    }
}
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
.edit-food-modal {
    text-align: center;
}
.edit-food-modal > img {
    height: 120px;
    display: block;
    margin: auto;
}
.edit-food-modal > input {
    display: block;
    margin: auto;
    margin-top: 12px;
    width: 200px;
    margin-bottom: 12px;
    box-sizing: border-box;
}
.edit-food-selects {
    display: flex;
    justify-content: space-between;
    width: 200px;
}
</style>
