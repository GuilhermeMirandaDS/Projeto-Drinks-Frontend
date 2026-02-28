import { api } from "./api"

export const getDrink = (letra: string) => {
    return api.get(`/search.php?f=${letra}`)
}