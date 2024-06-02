'use client'
import {ReactElement} from "react";
import {useParams} from "next/navigation";
import PageLoading from "@/components/ui/PageLoading";
import Link from "next/link";
import useProtagonistData from "@/hooks/protagonists/useProtagonistData";
import EditProtagonistForm from "@/features/protagonists/EditProtagonistForm";

const EditProtagonistPage = (): ReactElement => {
    const params = useParams<{ gameSlug: string, protagonistSlug: string }>()
    const {protagonist, isLoading, error} = useProtagonistData(params.gameSlug, params.protagonistSlug)

    if (error) throw new Error(error.message)
    if (isLoading || !protagonist) return <PageLoading/>

    return (
        <>
            <Link href={`/${protagonist.game.slug}/game-master`}>Back to game master dashboard</Link>

            <EditProtagonistForm protagonist={protagonist}/>
        </>
    )
}
export default EditProtagonistPage