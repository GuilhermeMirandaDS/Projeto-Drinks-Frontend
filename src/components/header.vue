<script setup lang="ts">
import { useSearchStore } from '@/stores/search';

const searchStore = useSearchStore()
</script>

<template>
    <header>
        <div class="header-logo">
            <router-link to="/">
                <img class="logo-page" src="../assets/logos/logo.png" alt="Drinks">
            </router-link>
        </div>

        <div class="header-search">
            <input class="search-input"
             type="text" 
             placeholder="Search your drink..."
             v-model="searchStore.searchQuery"
            >
        </div>

        <div class="header-menu-item">
            <router-link to="/">Home</router-link>
            <router-link to="/favoritos">Favorites</router-link>
        </div>
    </header>
</template>