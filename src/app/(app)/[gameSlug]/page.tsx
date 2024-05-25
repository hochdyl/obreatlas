'use client'
import {ReactElement} from "react";
import CreateProtagonistForm from "@/features/games/protagonists/CreateProtagonistForm";
import ProtagonistsList from "@/features/games/protagonists/ProtagonistsList";
import {useParams} from "next/navigation";
import Link from "next/link";
import PageLoading from "@/components/ui/PageLoading";
import useUser from "@/hooks/authentication/useUser";
import useGameDashboard from "@/hooks/games/useGameDashboard";

const Game = (): ReactElement => {
    const params = useParams<{gameSlug: string}>()
    const {game, error, isLoading} = useGameDashboard(params.gameSlug)
    const {user} = useUser()

    if (error) throw new Error(error.message)
    if (isLoading || !game || !user) return <PageLoading/>

    return (
        <>
            <Link href={'/games'}>Back to games</Link>
            {game.owner.id === user.id &&
                <Link href={`${params.gameSlug}/edit`}>Edit {game.title}</Link>
            }
            <CreateProtagonistForm/>
            <ProtagonistsList protagonists={game.protagonists}/>
        </>
    )
}
export default Game