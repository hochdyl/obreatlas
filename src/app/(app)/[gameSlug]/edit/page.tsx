'use client'
import {ReactElement, useEffect} from "react";
import EditGameForm from "@/features/games/EditGameForm";
import {useParams, useRouter} from "next/navigation";
import useGame from "@/hooks/games/useGame";
import useUser from "@/hooks/authentication/useUser";
import PageLoading from "@/components/ui/PageLoading";

const EditGame = (): ReactElement => {
    const router = useRouter()
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
            <button onClick={() => router.push(`/${params.gameSlug}`)}>Back to game</button>

            <EditGameForm game={game}/>
        </>
    )
}
export default EditGame