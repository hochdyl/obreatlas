'use client'
import Link from "next/link";
import {ReactElement} from "react";
import CreateGameForm from "@/components/form/CreateGameForm";
import SessionService from "@/services/SessionService";

const Home = (): ReactElement => {
    const handleLogout = () => SessionService.closeSession()

    // if (isLoading) return <p>loading</p>
    // if (error || !user) return <p>error</p>

    return (
        <main>
            <Link href={'/register'}>Register</Link>
            <Link href={'/login'}>Login</Link>
            <button onClick={() => handleLogout}>Logout</button>
            <CreateGameForm/>
        </main>
    );
}

export default Home