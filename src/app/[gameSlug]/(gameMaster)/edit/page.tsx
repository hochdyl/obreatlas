'use client'
import {ReactElement} from "react";
import EditGameForm from "@/features/games/EditGameForm";
import {useParams} from "next/navigation";
import useGame from "@/hooks/games/useGameLobby";
import useUser from "@/hooks/authentication/useUser";
import PageLoading from "@/components/ui/PageLoading";
import Link from "next/link";

const EditGame = (): ReactElement => {
    const params = useParams<{gameSlug: string}>()
    const {game, isLoading, error} = useGame(params.gameSlug)
    const {user} = useUser()

    if (error) throw new Error(error.message)
    if (isLoading || !game || !user) return <PageLoading/>

    return (
        <>
            <EditGameForm game={game}/>
        </>
    )
}
export default EditGame