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
            <select v-model="foodTemperature" name="temperature" id="temperature">
                <option :value="null" disabled selected>Temperature</option>
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

const foodName: Ref<string> = ref('')
const foodType: Ref<string> = ref('')
const foodTemperature: Ref<string> = ref('')

const foodList = ref([])

const errorMessage = ref('')
const successMessage = ref('')

async function addFruit() {
    console.log("adding " + foodName.value)
    if (!foodName.value.trim() || !foodType.value.trim() || !foodTemperature.value.trim()) {
        errorMessage.value = "Please fill in all fields"
    }
    try {
        const foodData = {
            name: foodName.value.toLowerCase(),
            type: foodType.value.toLowerCase(),
            temperature: foodTemperature.value.toLowerCase(),
        }
        console.log('req data:', foodData)
        // Supabase DB
        const res = await $fetch('/api/insert-food', {
            method: 'POST',
            body: foodData,
        })
        console.log('useFetch res:', res)
        if (res.code === '23505') {
            console.log('fetch error')
            errorMessage.value = `${foodData.name} already added`
            successMessage.value = ''
        } else if (res.status = 201) {
            console.log('add success')
            successMessage.value = `Successfully Added`
            errorMessage.value = ''
        } else {
            console.log("something went wrong")
            successMessage.value = ``
            errorMessage.value = 'Something went wrong'
        }
        // Local DB
        // const res = await axios.post('http://localhost:3000/add', foodData)
        // console.log("post result:", res)
    } catch (error: any) {
        console.log('error making request:', error)
        errorMessage.value = error.response.data
        successMessage.value = ''
    }
}


</script>

<style scoped>

form {
    width: 234px;
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