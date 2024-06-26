'use client'
import useSWR from "swr";
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser";

const useGame = () => {
    const params = useParams<{ gameSlug: string, protagonistSlug?: string }>()
    const {data: game, error, isLoading, mutate} = useSWR<GameLobby>(`/games/${params.gameSlug}`)
    const {user} = useAuthenticatedUser()
    const [loading, setLoading] = useState<boolean>(true)
    const isGameMaster = user?.id === game?.gameMaster.id || undefined

    useEffect(() => {
        if (isLoading && game && user) {
            setLoading(false)
        }
    }, [game, user, params.protagonistSlug]);

    const getProtagonist = (): Protagonist | undefined => {
        if (!game || !params.protagonistSlug) {
            return undefined
        }

        return game.protagonists.find(protagonist => protagonist.slug === params.protagonistSlug);
    }

    const protagonist = getProtagonist()

    return {isGameMaster, game, isLoading: loading, error, mutate, protagonist}
}
export default useGame