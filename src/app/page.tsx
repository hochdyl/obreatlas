'use client'
import {ReactElement} from "react";
import CreateGameForm from "@/features/games/CreateGameForm";
import GamesList from "@/features/games/GamesList";
import AppVersion from "@/features/appVersions/AppVersion";
import useUser from "@/hooks/authentication/useUser";

const Home = (): ReactElement => {
    const {logout} = useUser()

    return (
        <main>
            <AppVersion/>
            <button onClick={logout}>Logout</button>
            <CreateGameForm/>
            <GamesList/>
        </main>
    );
}

export default Home