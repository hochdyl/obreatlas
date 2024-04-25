import {createGame} from "@/api/games/GameApi";
import {MutatorOptions} from "swr";

export const createGameMutation = async (games: SWRGame[], newGame: CreateGameFormData) => {
    const addedGame = await createGame(newGame)
    return [addedGame, ...games]
}

export const createGameOptions = (games: SWRGame[], newGame: CreateGameFormData): MutatorOptions<SWRGame[], CreateGameFormData> => ({
    optimisticData: [newGame, ...games],
    rollbackOnError: true,
})