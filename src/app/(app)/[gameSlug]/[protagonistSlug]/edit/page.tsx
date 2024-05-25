'use client'
import {ReactElement, useEffect} from "react";
import {useParams, useRouter} from "next/navigation";
import useGame from "@/hooks/games/useGameDashboard";
import useUser from "@/hooks/authentication/useUser";
import PageLoading from "@/components/ui/PageLoading";
import Link from "next/link";
import EditProtagonistForm from "@/features/games/protagonists/EditProtagonistForm";
import useProtagonist from "@/hooks/games/protagonists/useProtagonist";

const EditProtagonist = (): ReactElement => {
    const params = useParams<{gameSlug: string, protagonistSlug: string}>()
    const {protagonist, isLoading, error, mutate} = useProtagonist(params.gameSlug, params.protagonistSlug)
    const {user} = useUser()

    useEffect(() => {
        if (user && protagonist && user.id !== game.owner.id) {
            throw new Error("You can't edit this protagonist")
        }
    }, [protagonist, user])

    if (error) throw new Error(error.message)
    if (isLoading || !protagonist || !user) return <PageLoading/>

    return (
        <>
            <Link href={`/${params.gameSlug}`}>Back to game</Link>

            <EditProtagonistForm protagonist={game}/>
        </>
    )
}
export default EditProtagonist