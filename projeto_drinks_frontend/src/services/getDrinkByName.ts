import { api } from "./api"

export const getDrinkByName = (name: string) => {
    return api.get(`/search.php?s=${name}`)
}