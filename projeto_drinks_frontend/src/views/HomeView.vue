<script setup lang="ts">
    import Card from '@/components/card.vue';
    import { onMounted, ref } from "vue";
    import { getDrink } from "@/services/getDrink";
    import { getCategories } from '@/services/getCategories';
    import { getDrinkByCategory } from '@/services/getDrinkByCategory';
    import { getDrinkByName } from '@/services/getDrinkByName';
    import { watch } from 'vue';
    import { useSearchStore } from '@/stores/search';
    import { storeToRefs } from 'pinia';

    const loading = ref(false);
    const drinks = ref<any[]>([]);
    const error = ref<string | null>(null);
    const selectedLetter = ref('A');
    const categories = ref<any[]>([]);
    const activeCategory = ref<string | null>(null);
    const catListActive = ref(false);

    const searchStore = useSearchStore();
    const { searchQuery } = storeToRefs(searchStore);

    let timeout: ReturnType<typeof setTimeout>;

    watch(searchQuery, (value) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            if (value.trim()) {
                fetchDrinksByName(value)
            } else {
                fetchDrinks(selectedLetter.value)
            };
        }, 400)
    })

    const fetchDrinks = async (letter: string) => {
        try {
            loading.value = true;
            selectedLetter.value = letter
            const res = await getDrink(letter);

            drinks.value = res.data?.drinks ?? [];
        } catch (err: any){
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    };

    const fetchDrinksByName = async (name: string) => {
        try {
            loading.value = true;
            const res = await getDrinkByName(name);

            drinks.value = res.data?.drinks ?? [];
        } catch (err: any){
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    };

    const fetchDrinksByCategory = async (category: string) => {
        try {
            loading.value = true;
            const res = await getDrinkByCategory(category);

            drinks.value = res.data?.drinks ?? [];
        } catch (err: any){
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    };

    const changeClass = (category: string) => {
        activeCategory.value = category;
    };

    const changeLetterClass = (letter: string) => {
        selectedLetter.value = letter;
    };

    const fetchCategories = async () => {
        try {
            const res = await getCategories();
            categories.value = res.data?.drinks ?? [];
        } catch (err: any) {
            error.value = err.message;
        }
    };

    onMounted(() => {
        fetchDrinks('A');
        fetchCategories();
    });
</script>

<template>
    <div class="container home-content">
        <div :class="[ 'left-content', { active: catListActive }]" @click="catListActive = !catListActive">
            <h3 class="subtitle">Categories</h3>
            <div class="cat-filter">
                <div 
                    v-for="cat in categories"
                    :class="['cat-item', { active: activeCategory === cat.strCategory }]"
                    @click="fetchDrinksByCategory(cat.strCategory); changeClass(cat.strCategory)"
                >
                    {{ cat.strCategory }}
                </div>
            </div>
        </div>
        <div class="right-content">
            <h1 class="page-title">Drinks</h1>
            
            <div class="page-content">
                <h3 class="subtitle">Search by Letter</h3>
                <div class="letter-filter">
                    <div 
                        v-for="letter in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')" 
                        :key="letter"
                        :class="['filter-item', { active: selectedLetter === letter }]"
                        @click="fetchDrinks(letter); changeLetterClass(letter)"
                    >
                        {{ letter }}
                    </div>
                </div>
            </div>
        
            <div class="results">
                <div v-if="loading" class="loading">
                    <img src="../assets/gifs/Drink.gif">
                </div>
                <div v-if="error">{{ error }}</div>
    
                <Card
                    v-if="drinks"
                    v-for="drink in drinks" 
                    :key="drink.idDrink"
                    :drink="drink"
                />
    
                <div v-if="!loading && drinks.length === 0" class="empty-drinks">
                    No drinks found :(
                </div>
            </div>
        </div>
    </div>
</template>