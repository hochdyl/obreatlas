'use client'
import {ReactElement} from "react";
import {useRouter} from "next/navigation";

const GameDashboard = (): ReactElement => {
    const router = useRouter()

    console.log(router)

    return (
        <main>
            <p>Game page</p>
        </main>
    );
}

export default GameDashboard