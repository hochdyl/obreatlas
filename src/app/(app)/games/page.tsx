'use client'
import {ReactElement} from "react";
import CreateGameForm from "@/features/games/CreateGameForm";
import GamesList from "@/features/games/GamesList";
import useGames from "@/hooks/games/useGames";
import PageLoading from "@/components/ui/PageLoading";

const Games = (): ReactElement => {
    const {games, isLoading, error} = useGames()

    if (error) throw new Error(error.message)
    if (isLoading || !games) return <PageLoading/>

    return (
        <>
            <CreateGameForm/>
            <GamesList games={games}/>
        </>
    );
}
export default Games