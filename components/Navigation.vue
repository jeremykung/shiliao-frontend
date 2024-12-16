<template>
    <div class="nav-container">
        <div class="title">
            <h1>食療 ShíLiáo</h1>
            <p>Chinese Food Therapy</p>
        </div>
        <div>
            <NuxtLink class="nav-link" to="/">Home</NuxtLink>
            <!-- <NuxtLink class="nav-link" to="add">Add</NuxtLink> -->
            <!-- <NuxtLink class="nav-link" to="edit">Edit</NuxtLink> -->
            <!-- <NuxtLink class="nav-link" to="login">Login</NuxtLink> -->
            <NuxtLink class="nav-link" to="about">About</NuxtLink>
        </div>
        <!-- <p>User: {{ userStore.email }}</p> -->
    </div>
</template>

<script lang="ts" setup>
// import { useUserStore } from '~/stores/user'

// const userStore = useUserStore()
</script>


<style scoped>
.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* background-color: var(--primary-color); */
    padding: 20px;
}
.nav-container > h1 {
    /* color: var(--primary-color-darker); */
}
.nav-link {
    padding: 16px;
    text-decoration: none;
    /* background-color: var(--primary-color-dark); */
    background-color: rgba(255, 255, 255, 0.7);
    font-weight: bold;
    /* color: white; */
    border-radius: 4px;
    margin-left: 10px;
}
@media only screen and (max-width: 700px) {
    .title > h1 {
        font-size: 1.6rem;
    }
    .title > p {
        font-size: 0.9rem;
    }
}
</style>
