import { api } from "./api"

export const getDrinkDetails = (id: string) => {
    return api.get(`/lookup.php?i=${id}`)
}