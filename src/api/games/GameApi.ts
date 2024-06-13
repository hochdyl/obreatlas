import ApiService from "@/services/ApiService";
import {CreateGameFormData} from "@/types/games/CreateGameFormData";

const ROUTE_URL = '/games'

export const createGame = (data: CreateGameFormData) => {
    return ApiService.fetch<Game>({
        url: `${ROUTE_URL}/create`,
        method: "POST",
        data
    })
}

export const editGame = (gameId: number, data: EditGameFormData) => {
    return ApiService.fetch<Game>({
        url: `${ROUTE_URL}/${gameId}/edit`,
        method: "POST",
        data
    })
}