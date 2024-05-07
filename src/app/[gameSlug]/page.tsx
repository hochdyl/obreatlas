'use client'
import {ReactElement} from "react";
import {useRouter} from "next/navigation";
import CreateProtagonistForm from "@/features/games/protagonists/CreateProtagonistForm";

const GameDashboard = (): ReactElement => {
    const router = useRouter()

    return (
        <main>
            <CreateProtagonistForm/>
        </main>
    );
}
export default GameDashboard