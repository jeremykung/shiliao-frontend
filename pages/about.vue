<template>
    <Navigation />
    <div class="suggestion-container">
        <h1>Suggestions</h1>
        <p>Would you love to see a certain feature or recommend a food? I'd be happy to improve the app!</p>
        <form @submit.prevent="submit">
            <textarea v-model="suggestion" type="text-area" placeholder="I would like..."></textarea>
            <input @click="addSuggestion" type="submit" value="Suggest" id="submit-suggestion" class="button">
        </form>
        <p class="error-message">{{ errorMessage }}</p>
        <p class="success-message">{{ successMessage }}</p>
    </div>
    <div class="about-container">
        <h1>About</h1>
        <p>I made this project to make it easy to find which foods are hot and cold according to Chinese medicine and food therapy.</p>
        <p>Developed by <a href="https://github.com/jeremykung">J. Kung</a> 🌱</p>
    </div>
</template>

<script lang="ts" setup>
import { createClient } from '@supabase/supabase-js'

const config = useRuntimeConfig()
const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_KEY)

const suggestion: Ref<string> = ref('')
const errorMessage: Ref<string> = ref('')
const successMessage: Ref<string> = ref('')

async function addSuggestion() {
    console.log('adding suggestion:', suggestion.value)
    try {
        const { error } = await supabase
            .from('suggestion')
            .insert({ suggestion: suggestion.value })
        if (error) {
            console.log('supabase insert error:', error)
            throw(error)
        } else {
            console.log('added successfully!')
            suggestion.value = ''
            successMessage.value = "Thank you for your feedback!"
            errorMessage.value = ''
        }
    } catch (error) {
        console.log('error adding suggestion:', error)
        if (error.code === "42501") {
            errorMessage.value = "Please log in to add!"
        } else {
            errorMessage.value = "Oops, there was an error!"
        }
        successMessage.value = ''
    }
}
</script>


<style scoped>
.about-container, .suggestion-container {
    width: 50%;
    max-width: 500px;
    min-width: 250px;
    margin: 2rem auto;
    text-align: center;
}
.about-container > p {
    margin-top: 1rem;
}
.suggestion-container > p {
    margin: 1rem 0;
}
textarea {
    width: 100%;
    height: 6rem;
}
#submit-suggestion {
    width: 100%;
}

@media only screen and (max-width: 700px) {
    .about-container, .suggestion-container {
        width: 70%;
    }
}
@media only screen and (max-width: 500px) {
    .about-container, .suggestion-container {
        width: 90%;
    }
}
</style>