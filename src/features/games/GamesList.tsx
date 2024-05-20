'use client'
import {ReactElement} from "react";
import useGames from "@/hooks/games/useGames";
import GameCard from "@/features/games/GameCard";

const GamesList = (): ReactElement => {
    const {games, error, isLoading} = useGames()

    if (isLoading && !games) return <p>Loading..</p>
    if (error) return <p>Error..</p>

    return (
        <>
            <h1>Games</h1>
            {games?.map((game, index) =>
                <GameCard game={game} key={index}/>
            )}
        </>
    )
}
export default GamesList