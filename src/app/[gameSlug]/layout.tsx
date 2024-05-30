'use client'
import React, {PropsWithChildren, ReactElement} from "react"
import PermissionService from "@/services/PermissionService";
import Link from "next/link";
import {useParams} from "next/navigation";
import useGameLobby from "@/hooks/games/useGameLobby";
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser";
import PageLoading from "@/components/ui/PageLoading";
import ProtagonistCard from "@/features/games/protagonists/ProtagonistCard";

const GameLobbyLayout = ({children}: Readonly<PropsWithChildren>): ReactElement => {
    const params = useParams<{ gameSlug: string }>()
    const {game, error, isLoading} = useGameLobby(params.gameSlug)
    const {user} = useAuthenticatedUser()

    if (error) throw new Error(error.message)
    if (isLoading || !game || !user) return <PageLoading/>

    return (
        <>
            <nav>
                <h1>{game.title}</h1>
                {PermissionService.isGameMaster(user, game) &&
                    <>
                        <Link href={`/${game.slug}/game-master`}>Admin dashboard</Link>
                        <Link href={`/${game.slug}/edit`}>Edit</Link>
                    </>
                }
                <h3>Protagonists available</h3>
                {game.protagonists.map((protagonist, index) =>
                    <ProtagonistCard
                        game={game}
                        protagonist={protagonist}
                        key={index}
                    />
                )}
            </nav>
            {children}
        </>

    );
}
export default GameLobbyLayout