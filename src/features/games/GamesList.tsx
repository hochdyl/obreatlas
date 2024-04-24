'use client'
import {ReactElement} from "react";
import useGames from "@/hooks/useGames";

const GamesList = (): ReactElement => {
    const {games, isLoading, error} = useGames()

    if (isLoading) return <p>Loading..</p>
    if (error) return <p>Error..</p>

    return (
        <>
            <h1>Games</h1>
            {games}
        </>
    )
}
export default GamesList