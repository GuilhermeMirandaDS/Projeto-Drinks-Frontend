import { defineStore } from 'pinia'

export const useFavStore = defineStore('favoritos', {
    state: () => ({
        favoritos: [] as any[]
    }),

    actions: {
        addFav(item: any) {
            if (!this.favoritos.find(f => f.id === item.idDrink)) {
                this.favoritos.push(item);
            };
        },

        removeFav(idDrink: string) {
            this.favoritos = this.favoritos.filter(f => f.idDrink !== idDrink);
        },

        toggleFav(item: any) {
            if (this.favoritos.find(f => f.idDrink === item.idDrink)) {
                this.removeFav(item.idDrink);
            } else {
                this.addFav(item);
            };
        },

        isFav(idDrink: string) {
            return this.favoritos.some(f => f.idDrink === idDrink);
        },

        showFavs() {
            return this.favoritos;
        },
    }
})