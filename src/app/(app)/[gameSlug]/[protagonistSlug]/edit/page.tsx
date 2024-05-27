'use client'
import {ReactElement, useEffect} from "react";
import {useParams} from "next/navigation";
import useUser from "@/hooks/authentication/useUser";
import PageLoading from "@/components/ui/PageLoading";
import Link from "next/link";
import EditProtagonistForm from "@/features/games/protagonists/EditProtagonistForm";
import useProtagonistDashboard from "@/hooks/games/protagonists/useProtagonistDashboard";
import PermissionService from "@/services/PermissionService";

const EditProtagonist = (): ReactElement => {
    const params = useParams<{gameSlug: string, protagonistSlug: string}>()
    const {protagonist, isLoading, error} = useProtagonistDashboard(params.gameSlug, params.protagonistSlug)
    const {user} = useUser()

    useEffect(() => {
        if (user && protagonist && !PermissionService.isGameOwner(user, protagonist.game)) {
            throw new Error("You can't edit this protagonist")
        }
    }, [protagonist, user])

    if (error) throw new Error(error.message)
    if (isLoading || !protagonist || !user) return <PageLoading/>

    return (
        <>
            <Link href={`/${params.gameSlug}`}>Back to game</Link>

            <EditProtagonistForm protagonist={protagonist}/>
        </>
    )
}
export default EditProtagonist