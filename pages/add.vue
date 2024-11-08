<template>
    <Navigation />

    <form @submit.prevent="onSubmit">
        <h1>Add Food</h1>
        <input v-model="foodName" type="text" id="name" name="name" placeholder="Name">
        <div class="food-select-inputs">
            <select v-model="foodType" name="type" id="type">
                <option :value="null" disabled selected>Type</option>
                <option value="plant">Plant</option>
                <option value="animal">Animal</option>
            </select>
            <select v-model="foodProperty" name="property" id="property">
                <option :value="null" disabled selected>Property</option>
                <option value="cold">Cold</option>
                <option value="cool">Cool</option>
                <option value="neutral">Neutral</option>
                <option value="warm">Warm</option>
                <option value="hot">Hot</option>
            </select>
        </div>
        <input type="submit" value="Add" @click="addFruit()" class="button">
        <p class="error-message">{{ errorMessage }}</p>
        <p class="success-message">{{ successMessage }}</p>
    </form>

</template>

<script lang="ts" setup>
import axios from "axios"

const foodName = ref(null)
const foodType = ref(null)
const foodProperty = ref(null)

const foodList = ref([])

const errorMessage = ref('')
const successMessage = ref('')

async function addFruit() {
    console.log("adding " + foodName.value)
    if (!foodName.value || !foodType.value || !foodProperty.value) {
        errorMessage.value = "Please fill in all fields"
    }
    try {
        const data = {
            name: foodName.value.toLowerCase(),
            type: foodType.value.toLowerCase(),
            property: foodProperty.value.toLowerCase(),
        }
        console.log('req data:', data)
        const res = await axios.post('http://localhost:3000/add', data)
        console.log("post result:", res)
        successMessage.value = `Successfully Added`
    } catch (error) {
        console.log('error making request:', error)
        errorMessage.value = error.response.data
    }
}


</script>

<style scoped>

form {
    width: 200px;
    margin: auto;
    margin-top: 2rem;
}

form > h1 {
    text-align: center;
    margin-bottom: 1rem;
}

input {
    width: 100%;
    box-sizing: border-box;
}

.food-select-inputs {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
}

.error-message, .success-message {
    margin-top: 1rem;
    text-align: center;
}
</style>