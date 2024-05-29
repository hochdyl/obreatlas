'use client'
import {ReactElement} from "react";
import Link from "next/link";
import useUser from "@/hooks/authentication/useUser";
import PageLoading from "@/components/ui/PageLoading";
import GamesList from "@/features/games/GamesList";

const HomePage = (): ReactElement => {
    const {user, isLoading} = useUser()

    if (isLoading) return <PageLoading/>

    return (
        <>
            Obreatlas homepage
            {user ? <GamesList/> :
                <>
                    <Link href={'/login'}>Login</Link>
                    <Link href={'/register'}>Register</Link>
                </>
            }
        </>
    );
}
export default HomePage