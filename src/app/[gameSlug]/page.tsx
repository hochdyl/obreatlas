'use client'
import {ReactElement} from "react";
import {useRouter} from "next/navigation";
import CreateProtagonistForm from "@/features/games/protagonists/CreateProtagonistForm";
import ProtagonistsList from "@/features/games/protagonists/ProtagonistsList";

const GameDashboard = (): ReactElement => {
    const router = useRouter()

    return (
        <main>
            <CreateProtagonistForm/>
            <ProtagonistsList/>
        </main>
    );
}
export default GameDashboard