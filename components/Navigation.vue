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
    background-color: var(--primary-color);
    padding: 20px;
}
.nav-container > h1 {
    color: var(--primary-color-darker);
}
.nav-link {
    padding: 16px;
    text-decoration: none;
    background-color: var(--primary-color-dark);
    font-weight: bold;
    color: white;
    border-radius: 4px;
    margin-left: 10px;
}
</style>
