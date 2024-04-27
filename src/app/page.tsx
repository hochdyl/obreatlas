'use client'
import {ReactElement} from "react";
import SessionService from "@/services/SessionService";
import CreateGameForm from "@/features/games/CreateGameForm";
import GamesList from "@/features/games/GamesList";
import {useRouter} from "next/navigation";
import AppVersion from "@/components/ui/AppVersion";
import {useSWRConfig} from "swr";

const Home = (): ReactElement => {
    const router = useRouter()
    const { mutate } = useSWRConfig()

    const handleLogout = () => {
        SessionService.closeSession()
        mutate(
            () => true,
            undefined,
            {revalidate: false}
        ).then(() => router.refresh())
    }

    return (
        <main>
            <AppVersion/>
            <button onClick={() => handleLogout()}>Logout</button>
            <CreateGameForm/>
            <GamesList/>
        </main>
    );
}

export default Home