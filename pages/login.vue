<template>
    <Navigation />
    <div v-if="isLogin" class="login-container container">
        <h1>Login</h1>
        <form @submit.prevent="submit">
            <input v-model="email" type="email" id="email" placeholder="Email">
            <input v-model="password" type="password" id="password" placeholder="Password">
            <input @click="login()" type="submit" value="Login" class="button">
        </form>
        <p>Not registered? <span @click="toggleForm()">Sign Up</span> instead</p>
        <p class="error-message">{{ errorMessage }}</p>
    </div>

    <div v-if="!isLogin" class="signup-container container">
        <h1>Sign Up</h1>
        <form @submit.prevent="submit">
            <input v-model="email" type="email" id="email" placeholder="Email">
            <input v-model="password" type="password" id="password" placeholder="Password">
            <input v-model="passwordAgain" type="password" id="password" placeholder="Confirm Password">
            <input @click="signup" type="submit" value="Sign Up" class="button">
        </form>
        <p>Already registered? <span @click="toggleForm()">Login</span> instead</p>
        <p class="error-message">{{ errorMessage }}</p>
    </div>
    
</template>

<script lang="ts" setup>
import { useUserStore } from '~/stores/user'

// Import User Store
const userStore = useUserStore()

const isLogin = ref(false)
const email: Ref<string> = ref('')
const password: Ref<string> = ref('')
const passwordAgain: Ref<string> = ref('')
const errorMessage: Ref<string> = ref('')

function toggleForm() {
    isLogin.value = !isLogin.value
    errorMessage.value = '';
}

async function signup() {
    if (!email.value.trim() || !password.value.trim()) {
        errorMessage.value = "Please complete all fields"
        return
    }
    if (password.value !== passwordAgain.value) {
        errorMessage.value = "Passwords do not match"
        return
    }
    try {
        const res: any = await $fetch('/api/signup', { 
            method: 'POST',
            body: {
                email: email.value,
                password: password.value,
            }, 
        })
        console.log('signup res:', res)
        if (res.data.code === "weak_password") {
            errorMessage.value = "Password should be at least 6 characters"
        }
    } catch (error) {
        console.log('signup error:', error)
        errorMessage.value = "Something went wrong"
    }
}

async function login() {
    if (!email.value.trim() || !password.value.trim()) {
        errorMessage.value = "Please complete all fields"
        return
    }
    try {
        console.log('sending login request...')
        // const res = await userStore.login({
        //     email: email.value,
        //     password: password.value,
        // })
        const res = await $fetch('/api/login', {
            method: "POST",
            body: {
                email: email.value,
                password: password.value
            }
        })
        console.log('login res:', res)
        console.log(res.data.user)
        // Set user data in Pinia
        userStore.setData(res.data.user)
    } catch (error) {
        console.log('login error:', error)
    }
}
</script>


<style scoped>
.container > h1, .container > p {
    text-align: center;
    margin-top: 1rem;
}
.container > p > span {
    color: var(--secondary-color);
    cursor: pointer;
}
.container > form {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin: auto;
}
.container > form > input {
    margin-top: 1rem;
}
</style>