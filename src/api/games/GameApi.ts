import ApiService from "@/services/ApiService";

const ROUTE_URL = '/games'

export const createGame = (data: CreateGameFormData) => {
    return ApiService.fetch<Game>({
        url: `${ROUTE_URL}`,
        method: "POST",
        data
    })
}

export const editGame = (gameSlug: string, data: EditGameFormData) => {
    return ApiService.fetch<Game>({
        url: `${ROUTE_URL}/${gameSlug}`,
        method: "PUT",
        data
    })
}