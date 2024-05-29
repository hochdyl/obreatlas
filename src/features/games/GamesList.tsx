'use client'
import {ReactElement} from "react";
import GameCard from "@/features/games/GameCard";
import useGames from "@/hooks/games/useGames";
import PageLoading from "@/components/ui/PageLoading";
import CreateGameForm from "@/features/games/CreateGameForm";

const GamesList = (): ReactElement => {
    const {games, isLoading, error} = useGames()

    if (error) throw new Error(error.message)
    if (isLoading || !games) return <PageLoading/>

    return (
        <>
            <CreateGameForm/>

            <h1>Games</h1>
            {games.map((game, index) =>
                <GameCard game={game} key={index}/>
            )}
        </>
    )
}
export default GamesList