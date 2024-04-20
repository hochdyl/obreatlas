'use client'
import Link from "next/link";
import {ReactElement} from "react";
import useUser from "@/hooks/useUser";

const Home = (): ReactElement => {
    const {user} = useUser()

    return (
        <main>
            <Link href={'/register'}>Register</Link>
            <Link href={'/login'}>Login</Link>
            <button>Logout</button>
            Fiche perso
        </main>
    );
}

export default Home