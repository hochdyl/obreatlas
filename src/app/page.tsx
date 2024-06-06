'use client'
import {ReactElement} from "react";
import Link from "next/link";
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser";
import GamesList from "@/features/games/GamesList";
import {Typography} from "@mui/material";
import Loader from "@/components/ui/Loader";

const HomePage = (): ReactElement => {
    const {user, isLoading} = useAuthenticatedUser()

    if (isLoading) return <Loader/>

    return (
        <>
            <Typography>Obreatlas homepage</Typography>
            {!user ?
                <>
                    <Link href={'/login'}>
                        <Typography>Login</Typography>
                    </Link>
                    <Link href={'/register'}>
                        <Typography>Register</Typography>
                    </Link>
                </> :
                <GamesList/>
            }
        </>
    );
}
export default HomePage