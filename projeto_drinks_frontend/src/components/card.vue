<script setup lang="ts">
    import { useFavStore } from "@/stores/favoritos";

    defineProps<{
        drink: any
    }>()

    const favStore = useFavStore();

    const toggle = (item: any) => {
        favStore.toggleFav(item);
    };
</script>

<template>
    <div class="drink-card">
        <button class="fav-btn" @click="toggle(drink)">
             
            <svg v-if="favStore.isFav(drink.idDrink)" width="24" height="24" viewBox="0 0 1.92 1.92" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"><path style="fill:none" d="M-1.92-7.68h38.4v24h-38.4z"/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><path d="M1.291.272a.39.39 0 0 1 .353.255c.072.187.02.404-.075.589-.114.221-.324.381-.539.519 0 0-.084.041-.165-.012-.277-.181-.536-.419-.61-.745C.2.629.291.319.573.276.715.254.906.359.957.452c.05-.093.197-.177.321-.18z" style="fill-rule:nonzero"/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></svg>

            <svg v-else width="24" height="24" viewBox="0 0 1.92 1.92" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"><path style="fill:none" d="M0-7.68h38.4v24H0z"/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><path d="M1.296.272a.39.39 0 0 1 .353.255c.072.187.02.404-.075.589-.114.221-.324.381-.539.519 0 0-.084.041-.165-.012C.593 1.442.334 1.204.26.878.205.629.295.319.578.276.72.254.911.359.962.452c.05-.093.197-.177.321-.18zm-.01.12c-.161.005-.274.174-.323.311L.938.64.917.598C.834.442.627.302.457.463.279.632.37.987.554 1.202c.115.134.258.241.409.336.197-.125.396-.267.501-.469.109-.211.175-.496-.031-.634a.3.3 0 0 0-.059-.029.2.2 0 0 0-.088-.014" style="fill-rule:nonzero"/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></svg>
            
        </button>

        <router-link :to="`/detalhes/${ drink.idDrink }`" class="card-content">
            <div class="card-image">
                <img :src="drink.strDrinkThumb">
            </div>
    
            <div class="card-title">
                <h2>{{ drink.strDrink }}</h2>
            </div>
        </router-link>
    </div>
</template>