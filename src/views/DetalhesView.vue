<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import { computed, onMounted, ref } from 'vue';
    import { useFavStore } from "@/stores/favoritos";
    import { getDrinkDetails } from "@/services/getDrinkDetails";

    const loading = ref(false);
    const drink = ref<any | null>(null);
    const error = ref<string | null>(null);
    const route = useRoute()

    const fetchDrink = async (id: string) => {
        try {
            loading.value = true;
            const res = await getDrinkDetails(id);

            drink.value = res.data?.drinks?.[0] ?? [];
        } catch (err: any){
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    };

    const drinkID = computed(() => route.params.id as string)

    const getIngredientes = (drink: any) => {
        const ingredients = [];

        for (let i = 1; i <= 15; i++) {
            const ingredient = drink[`strIngredient${i}`];
            if (ingredient) {
            ingredients.push(ingredient);
            }
        }

        return ingredients;
    };

    const favStore = useFavStore();

    const toggle = (item: any) => {
        favStore.toggleFav(item);
    };

    onMounted(() => fetchDrink(drinkID.value));
    getIngredientes(drink);
</script>

<template>
    <div class="container">
        <div class="drink-details position-relative">
            <div v-if="loading" class="loading">
                <img src="../assets/gifs/Drink.gif">
            </div>
            <div v-if="error">{{ error }}</div>
    
            <div v-if="drink" class="details-content">
                <div class="left-info">
                    <div class="card-image">
                        <img :src="drink.strDrinkThumb">
                    </div>
                </div>

                <div class="right-info">
                    <button class="fav-btn-top" @click="toggle(drink)">
                        <svg v-if="favStore.isFav(drink.idDrink)" width="24" height="24" viewBox="0 0 1.92 1.92" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"><path style="fill:none" d="M-1.92-7.68h38.4v24h-38.4z"/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><path d="M1.291.272a.39.39 0 0 1 .353.255c.072.187.02.404-.075.589-.114.221-.324.381-.539.519 0 0-.084.041-.165-.012-.277-.181-.536-.419-.61-.745C.2.629.291.319.573.276.715.254.906.359.957.452c.05-.093.197-.177.321-.18z" style="fill-rule:nonzero"/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></svg>
                        <svg v-else width="24" height="24" viewBox="0 0 1.92 1.92" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"><path style="fill:none" d="M0-7.68h38.4v24H0z"/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><path d="M1.296.272a.39.39 0 0 1 .353.255c.072.187.02.404-.075.589-.114.221-.324.381-.539.519 0 0-.084.041-.165-.012C.593 1.442.334 1.204.26.878.205.629.295.319.578.276.72.254.911.359.962.452c.05-.093.197-.177.321-.18zm-.01.12c-.161.005-.274.174-.323.311L.938.64.917.598C.834.442.627.302.457.463.279.632.37.987.554 1.202c.115.134.258.241.409.336.197-.125.396-.267.501-.469.109-.211.175-.496-.031-.634a.3.3 0 0 0-.059-.029.2.2 0 0 0-.088-.014" style="fill-rule:nonzero"/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></svg>
                    </button>

                    <div class="drink-title">
                        <h1>{{ drink.strDrink }}</h1>
                        <span class="category">{{ drink.strCategory }} - {{ drink.strAlcoholic }}</span>
                    </div>
    
                    <div class="info-section">
                        <h3>Ingredients</h3>
                        <ul>
                            <li v-for="(ing, index) in getIngredientes(drink)" :key="index">
                                <a :href="`https://www.google.com/search?q=${encodeURIComponent(ing)}%20ingredient`" target="_blank">{{ ing }}</a>
                            </li>
                        </ul>
                    </div>

                    <div class="info-section">
                        <h3>Instructions</h3>
                        <p>{{ drink.strInstructions }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>