'use client'
import {ReactElement, useEffect} from "react";
import {useParams} from "next/navigation";
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser";
import PageLoading from "@/components/ui/PageLoading";
import Link from "next/link";
import EditProtagonistForm from "@/features/games/protagonists/EditProtagonistForm";
import usePlayProtagonist from "@/hooks/games/protagonists/usePlayProtagonist";
import PermissionService from "@/services/PermissionService";

const EditProtagonistPage = (): ReactElement => {
    const params = useParams<{ gameSlug: string, protagonistSlug: string }>()
    const {protagonist, isLoading, error} = usePlayProtagonist(params.gameSlug, params.protagonistSlug)
    const {user} = useAuthenticatedUser()

    useEffect(() => {
        if (user && protagonist && !PermissionService.isGameMaster(user, protagonist.game)) {
            throw new Error("You can't edit this protagonist")
        }
    }, [protagonist, user])

    if (error) throw new Error(error.message)
    if (isLoading || !protagonist || !user) return <PageLoading/>

    return (
        <>
            <Link href={`/${protagonist.game.slug}/play/${protagonist.slug}`}>Back to protagonist</Link>

            <EditProtagonistForm protagonist={protagonist}/>
        </>
    )
}
export default EditProtagonistPage