'use client'
import React, {PropsWithChildren, ReactElement, useEffect} from "react"
import PermissionService from "@/services/PermissionService";
import {useParams} from "next/navigation";
import useGameLobby from "@/hooks/games/useGameLobby";
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser";
import Loader from "../../../components/Loading";

const GameMasterLayout = ({children}: Readonly<PropsWithChildren>): ReactElement => {
    const params = useParams<{ gameSlug: string }>()
    const {game, error, isLoading} = useGameLobby(params.gameSlug)
    const {user} = useAuthenticatedUser()

    useEffect(() => {
        if (user && game && !PermissionService.isGameMaster(user, game)) {
            throw new Error("You are not the game master")
        }
    }, [game, user])

    if (error) throw new Error(error.message)
    if (isLoading || !game || !user) return <LoadingPage/>

    return (
        <>
            {children}
        </>
    );
}
export default GameMasterLayout