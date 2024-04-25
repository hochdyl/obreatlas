import ApiService from "@/services/ApiService";

const ROUTE_URL = '/games'

export const createGame = (data: CreateGameFormData) => ApiService.fetch<Game>({
    url: `${ROUTE_URL}`,
    method: "POST",
    data
})