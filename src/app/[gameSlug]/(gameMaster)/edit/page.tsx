'use client'
import {ReactElement} from "react";
import EditGameForm from "@/features/games/EditGameForm";
import {useParams} from "next/navigation";
import useGame from "@/hooks/games/useGameLobby";
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser";
import PageLoading from "@/components/ui/PageLoading";

const EditGamePage = (): ReactElement => {
    const params = useParams<{ gameSlug: string }>()
    const {game, isLoading, error} = useGame(params.gameSlug)
    const {user} = useAuthenticatedUser()

    if (error) throw new Error(error.message)
    if (isLoading || !game || !user) return <PageLoading/>

    return (
        <>
            <EditGameForm game={game}/>
        </>
    )
}
export default EditGamePage