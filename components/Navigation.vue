<template>
    <div class="nav-container">
        <h1>食療 | Shi Liao</h1>
        <div>
            <NuxtLink class="nav-link" to="/">Home</NuxtLink>
            <NuxtLink class="nav-link" to="about">About</NuxtLink>
            <NuxtLink class="nav-link" to="add">Add</NuxtLink>
            <NuxtLink class="nav-link" to="edit">Edit</NuxtLink>
        </div>
    </div>
</template>

<style scoped>
.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(104, 178, 0);
    padding: 20px;
}
.nav-container > h1 {
    color: rgb(47, 80, 0);
}
.nav-link {
    padding: 16px;
    text-decoration: none;
    background-color: rgb(71, 121, 0);
    font-weight: bold;
    color: white;
    border-radius: 4px;
    margin-left: 10px;
}
</style>
