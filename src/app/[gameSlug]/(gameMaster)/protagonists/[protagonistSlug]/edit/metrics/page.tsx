'use client'
import {ReactElement} from "react";
import {useParams} from "next/navigation";
import PageLoading from "@/components/ui/PageLoading";
import Link from "next/link";
import useProtagonistData from "@/hooks/games/protagonists/useProtagonistData";
import EditMetricsForm from "@/features/games/game-master/protagonists/metrics/EditMetricsForm";

const EditMetricsPage = (): ReactElement => {
    const params = useParams<{ gameSlug: string, protagonistSlug: string }>()
    const {protagonist, isLoading, error} = useProtagonistData(params.gameSlug, params.protagonistSlug)

    if (error) throw new Error(error.message)
    if (isLoading || !protagonist) return <PageLoading/>

    return (
        <>
            <Link href={`/${protagonist.game.slug}/game-master`}>Back to game master dashboard</Link>

            <EditMetricsForm protagonist={protagonist}/>
        </>
    )
}
export default EditMetricsPage