'use client'
import {ReactElement} from "react";
import {useParams} from "next/navigation";
import useGame from "@/hooks/games/useGameLobby";
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser";
import Link from "next/link";
import Loader from "../../../components/Loading";

const GameMasterPage = (): ReactElement => {
    const params = useParams<{ gameSlug: string }>()
    const {game, isLoading, error} = useGame(params.gameSlug)
    const {user} = useAuthenticatedUser()

    if (error) throw new Error(error.message)
    if (isLoading || !game || !user) return <LoadingPage/>

    return (
        <>
            <Link href={`/${game.slug}`}>Back to game lobby</Link>

            Game master dashboard
        </>
    )
}
export default GameMasterPage