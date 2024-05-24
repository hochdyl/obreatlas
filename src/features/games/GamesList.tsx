'use client'
import {ReactElement} from "react";
import GameCard from "@/features/games/GameCard";

type GamesListProps = {
    games: Game[]
}

const GamesList = ({games}: GamesListProps): ReactElement => {
    return (
        <>
            <h1>Games</h1>
            {games.map((game, index) =>
                <GameCard game={game} key={index}/>
            )}
        </>
    )
}
export default GamesList