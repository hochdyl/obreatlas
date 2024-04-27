'use client'
import {ReactElement} from "react";
import useGames from "@/hooks/games/useGames";
import Link from "next/link";

const GamesList = (): ReactElement => {
    const {games, error, isLoading} = useGames()

    if (isLoading && !games) return <p>Loading..</p>
    if (error) return <p>Error..</p>

    return (
        <>
            <h1>Games</h1>
            {games?.map((game, index) =>
                <div key={index}>
                    {game.title} {game.slug}
                    {game.slug && <Link href={game.slug}>Access</Link>}
                </div>
            )}
        </>
    )
}
export default GamesList