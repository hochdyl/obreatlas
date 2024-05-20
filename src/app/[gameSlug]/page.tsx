'use client'
import {ReactElement} from "react";
import CreateProtagonistForm from "@/features/games/protagonists/CreateProtagonistForm";
import ProtagonistsList from "@/features/games/protagonists/ProtagonistsList";
import {useParams} from "next/navigation";
import useGame from "@/hooks/games/useGame";
import Link from "next/link";

const GameDashboard = (): ReactElement => {
    const params = useParams<{gameSlug: string}>()
    const {game, mutate} = useGame(params.gameSlug)

    if (!game) return <p>Loading...</p>

    return (
        <main>
            <CreateProtagonistForm/>
            <Link href={`${params.gameSlug}/edit`}>Edit {game.title}</Link>
            <ProtagonistsList/>
        </main>
    );
}
export default GameDashboard