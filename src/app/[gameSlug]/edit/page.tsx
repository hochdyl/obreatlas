'use client'
import {ReactElement} from "react";
import EditGameForm from "@/features/games/EditGameForm";

const GameDashboard = (): ReactElement => {

    return (
        <main>
            <EditGameForm/>
        </main>
    );
}
export default GameDashboard