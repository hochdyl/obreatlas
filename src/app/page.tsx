'use client'
import Link from "next/link";
import {ReactElement} from "react";
import useUser from "@/hooks/useUser";
import SessionService from "@/services/SessionService";

const Home = (): ReactElement => {
    const {user} = useUser()

    const handleLogout = () => SessionService.closeSession()

    return (
        <main>
            <Link href={'/register'}>Register</Link>
            <Link href={'/login'}>Login</Link>
            <button onClick={handleLogout}>Logout</button>
            Fiche perso
        </main>
    );
}

export default Home