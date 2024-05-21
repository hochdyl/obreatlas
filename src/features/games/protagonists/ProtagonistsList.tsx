'use client'
import {ReactElement} from "react";
import Link from "next/link";
import useProtagonists from "@/hooks/games/protagonists/useProtagonists";
import {useParams} from "next/navigation";
import Image from "next/image";
import useUser from "@/hooks/authentication/useUser";
import {chooseProtagonist} from "@/api/games/protagonists/ProtagonistApi";
import ProtagonistCard from "@/features/games/protagonists/ProtagonistCard";
import useGame from "@/hooks/games/useGame";

const ProtagonistsList = (): ReactElement => {
    const params = useParams<{gameSlug: string}>()
    const {protagonists, error, isLoading, mutate} = useProtagonists(params.gameSlug)

    if (isLoading || !protagonists) return <p>Loading..</p>
    if (error) return <p>Error..</p>

    const handleChooseProtagonist = async (protagonist: Protagonist) => {
        await chooseProtagonist(protagonist.id)

        void mutate()
    }

    return (
        <>
            <h1>Protagonists</h1>
            {protagonists.map((protagonist, index) =>
                <ProtagonistCard
                    protagonist={protagonist}
                    onChoose={(protagonist) => handleChooseProtagonist(protagonist)}
                    key={index}
                />
            )}
        </>
    )
}
export default ProtagonistsList