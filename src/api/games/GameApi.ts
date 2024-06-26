import ApiService from "@/services/ApiService";
import {GameFormData} from "@/types/games/GameFormData";

const ROUTE_URL = '/games'

export const createGame = (data: GameFormData) => {
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