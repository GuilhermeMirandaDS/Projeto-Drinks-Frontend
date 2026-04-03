import { api } from "./api"

export const getCategories = () => {
    return api.get(`/list.php?c=list`)
}