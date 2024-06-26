'use client'
import React, {PropsWithChildren, ReactElement, useEffect} from "react"
import PermissionService from "@/services/PermissionService";
import {useParams} from "next/navigation";
import useGame from "@/hooks/games/useGame";
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser";
import Loader from "@/components/common/Loader";

const GameMasterLayout = ({children}: Readonly<PropsWithChildren>): ReactElement => {
    const {game, error, isLoading} = useGame()
    const {user} = useAuthenticatedUser()

    useEffect(() => {
        if (user && game && !PermissionService.isGameMaster(user, game)) {
            throw new Error("You are not the game master")
        }
    }, [game, user])

    if (error) throw new Error(error.message)
    if (isLoading || !game || !user) return <Loader/>

    return (
        <>
            {children}
        </>
    );
}
export default GameMasterLayout