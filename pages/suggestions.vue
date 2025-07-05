<template>
    <Navigation />
    <h1>Suggestions</h1>
    
    <div class="todos-container">
        <div v-for="todo in backlog" class="todo-card">
            <p>{{ todo.suggestion }}</p>
        </div>
        <div v-for="todo in inProgress" class="todo-card">
            <p>{{ todo.suggestion }}</p>
        </div>
        <div v-for="todo in toDo" class="todo-card">
            <p>{{ todo.suggestion }}</p>
        </div>
        <div v-for="todo in done" class="todo-card">
            <p>{{ todo.suggestion }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { createClient } from "@supabase/supabase-js";
import Navigation from "~/components/Navigation.vue";

const config = useRuntimeConfig()
const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_KEY)

const { data: fetchedSuggestions, error } = await supabase
    .from('suggestion')
    .select()
if (error) {
    console.log('supbase error:', error)
}

const suggestions = ref()
const backlog = computed(() => fetchedSuggestions?.filter(todo => todo.status === "backlog"))
const inProgress = computed(() => fetchedSuggestions?.filter(todo => todo.status === "in progress"))
const toDo = computed(() => fetchedSuggestions?.filter(todo => todo.status === "to do"))
const done = computed(() => fetchedSuggestions?.filter(todo => todo.status === "done"))


</script>

<style scoped>

</style>