'use client'
import {ReactElement} from "react";
import CreateProtagonistForm from "@/features/games/protagonists/CreateProtagonistForm";
import ProtagonistsList from "@/features/games/protagonists/ProtagonistsList";
import {useParams} from "next/navigation";
import Link from "next/link";
import PageLoading from "@/components/ui/PageLoading";
import useGameDetails from "@/hooks/games/useGame";

const Game = (): ReactElement => {
    const params = useParams<{gameSlug: string}>()

    const {game, error, isLoading} = useGameDetails(params.gameSlug)

    if (error) throw new Error(error.message)
    if (isLoading || !game) return <PageLoading/>

    return (
        <>
            <Link href={`${params.gameSlug}/edit`}>Edit {game.title}</Link>
            <CreateProtagonistForm/>
            <ProtagonistsList protagonists={game.protagonists}/>
        </>
    )
}
export default Game