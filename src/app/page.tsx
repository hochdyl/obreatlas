'use client'
import {ReactElement} from "react";
import Link from "next/link";
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser";
import PageLoading from "@/components/ui/PageLoading";
import GamesList from "@/features/games/GamesList";
import styles from './HomePage.module.scss'

const HomePage = (): ReactElement => {
    const {user, isLoading} = useAuthenticatedUser()

    if (isLoading) return <PageLoading/>

    return (
        <>
            <p className={styles.module}>Obreatlas homepage</p>
            {!user ?
                <>
                    <Link href={'/login'}>Login</Link>
                    <Link href={'/register'}>Register</Link>
                </> :
                <GamesList/>
            }
        </>
    );
}
export default HomePage