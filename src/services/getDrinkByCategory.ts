import { api } from "./api"

export const getDrinkByCategory = (category: string) => {
    return api.get(`/filter.php?c=${category}`)
}