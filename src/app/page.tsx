'use client'
import Link from "next/link";
import {ReactElement} from "react";
import SessionService from "@/services/SessionService";
import CreateGameForm from "@/features/games/CreateGameForm";
import GamesList from "@/features/games/GamesList";
import useUser from "@/hooks/users/useUser";
import {useRouter} from "next/navigation";

const Home = (): ReactElement => {
    const router = useRouter()
    const handleLogout = () => {
        SessionService.closeSession()
        router.refresh()
    }

    return (
        <main>
            <Link href={'/register'}>Register</Link>
            <Link href={'/login'}>Login</Link>
            <button onClick={() => handleLogout()}>Logout</button>
            <CreateGameForm/>
            <GamesList/>
        </main>
    );
}

export default Home