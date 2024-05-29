'use client'
import React, {ReactElement} from "react";
import {useParams} from "next/navigation";
import Link from "next/link";
import PageLoading from "@/components/ui/PageLoading";
import useUser from "@/hooks/authentication/useUser";
import useGameLobby from "@/hooks/games/useGameLobby";
import CreateProtagonistForm from "@/features/games/protagonists/CreateProtagonistForm";

const GameLobbyPage = (): ReactElement => {
    const params = useParams<{ gameSlug: string }>()
    const {game, error, isLoading} = useGameLobby(params.gameSlug)
    const {user} = useUser()

    if (error) throw new Error(error.message)
    if (isLoading || !game || !user) return <PageLoading/>

    return (
        <>
            <Link href={'/'}>Back to games</Link>

            <p>Welcome to {game.title}</p>

            <CreateProtagonistForm/>
        </>
    )
}
export default GameLobbyPage