'use client'
import {ReactElement} from "react";
import useGames from "@/hooks/games/useGames";

const GamesList = (): ReactElement => {
    const {games, isLoading, error} = useGames()

    if (isLoading && !games) return <p>Loading..</p>
    if (error) return <p>Error..</p>

    return (
        <>
            <h1>Games</h1>
            {games?.map((game, index) => {
                return <p key={index}>
                    {game.title}
                </p>
            })}
        </>
    )
}
export default GamesList