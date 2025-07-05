<template>
    <Navigation />

    <form @submit.prevent="submit">
        <h1>Add Food</h1>
        <input v-model="foodName" type="text" id="food-name" name="chinese-name" placeholder="Name">
        <input v-model="chineseName" type="text" id="chinese-name" name="chinese-name" placeholder="Chinese Name">
        <div class="food-select-inputs">
            <select v-model="foodType" name="type" id="food-type">
                <option :value="null" disabled selected>Type</option>
                <option value="plant">Plant</option>
                <option value="animal">Animal</option>
            </select>
            <select v-model="foodTemperature" name="temperature" id="food-temperature">
                <option :value="null" disabled selected>Temperature</option>
                <option value="cold">Cold</option>
                <option value="cool">Cool</option>
                <option value="neutral">Neutral</option>
                <option value="warm">Warm</option>
                <option value="hot">Hot</option>
            </select>
        </div>
        <input type="submit" value="Add" @click="addFood()" class="button">
        <p class="error-message">{{ errorMessage }}</p>
        <p class="success-message">{{ successMessage }}</p>
    </form>

</template>

<script lang="ts" setup>
import { createClient } from "@supabase/supabase-js";

const config = useRuntimeConfig()
const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_KEY)

const foodName: Ref<string> = ref('')
const chineseName: Ref<string> = ref('')
const foodType: Ref<any> = ref(null)
const foodTemperature: Ref<any> = ref(null)

const foodList = ref([])

const errorMessage = ref('')
const successMessage = ref('')

async function addFood() {

    // // Retrieve user's session token (assuming the user is logged in)
    // const { data: session } = await supabase.auth.getSession();
    // if (!session.session) {
    // console.error('User session is missing. Ensure the user is logged in.');
    // return;
    // } else {
    //     console.log('user is authorized with session:', session)
    // }

    // Validate data
    if (!foodName.value.trim() || !foodType.value.trim() || !foodTemperature.value.trim()) {
        errorMessage.value = "Please fill in all fields"
    }
    try {
        // Data to add
        const foodData = {
            name: foodName.value.toLowerCase(),
            type: foodType.value.toLowerCase(),
            temperature: foodTemperature.value.toLowerCase(),
        }
        console.log('adding food:', foodData)

        // Supabase INSERT request
        const { error } = await supabase
            .from('food')
            .insert(foodData)

        // error / response handling
        if (error) {
            successMessage.value = ''
            if (error!.code === '23505') {
                console.log('fetch error')
                errorMessage.value = `${foodData.name} already added`
                throw error
            }
            throw error
        }
        console.log('add success')
        successMessage.value = `Successfully Added`
        errorMessage.value = ''
    } catch (error: any) {
        console.log('error making request:', error)
        errorMessage.value = error.response.data
        successMessage.value = ''
    }
}


</script>

<style scoped>

form {
    width: 260px;
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

#food-name {
    margin-bottom: 10px;
}

.food-select-inputs {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
}

#food-type {
    margin-right: 8px;
    width: 40%;
}
#food-temperature {
    width: 60%;
}

.error-message, .success-message {
    margin-top: 1rem;
    text-align: center;
}
</style>