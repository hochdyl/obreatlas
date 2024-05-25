'use client'
import {ReactElement, useEffect} from "react";
import EditGameForm from "@/features/games/EditGameForm";
import {useParams} from "next/navigation";
import useGame from "@/hooks/games/useGameDashboard";
import useUser from "@/hooks/authentication/useUser";
import PageLoading from "@/components/ui/PageLoading";
import Link from "next/link";

const EditGame = (): ReactElement => {
    const params = useParams<{gameSlug: string}>()
    const {game, isLoading, error} = useGame(params.gameSlug)
    const {user} = useUser()

    useEffect(() => {
        if (user && game && user.id !== game.owner.id) {
            throw new Error("You can't edit this game")
        }
    }, [game, user])

    if (error) throw new Error(error.message)
    if (isLoading || !game || !user) return <PageLoading/>

    return (
        <>
            <Link href={`/${params.gameSlug}`}>Back to game</Link>

            <EditGameForm game={game}/>
        </>
    )
}
export default EditGame