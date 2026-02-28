<script setup lang="ts">
    import Card from '@/components/card.vue';
    import { computed } from "vue";
    import { useFavStore } from "@/stores/favoritos";

    const drinks = computed(() => useFavStore().favoritos)
</script>

<template>
    <div class="banner-home">
        <div class="banner-bg"></div>
    </div>
    <div class="container">
        <h1 class="page-title">Favorites</h1>
    
        <div class="results">
            <div v-if="drinks.length === 0" class="not-found"> No favorites yet 🍹 </div>

            <Card
                v-if="drinks"
                v-for="drink in drinks" 
                :key="drink.idDrink"
                :drink="drink"
            />
        </div>
    </div>
</template>