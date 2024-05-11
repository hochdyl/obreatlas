'use client'
import {ReactElement} from "react";
import useGames from "@/hooks/games/useGames";
import Link from "next/link";
import useProtagonists from "@/hooks/games/protagonists/useProtagonists";
import {useParams} from "next/navigation";

const GamesList = (): ReactElement => {
    const params = useParams<{gameSlug: string}>()
    const {protagonists, error, isLoading} = useProtagonists(params.gameSlug)

    if (isLoading && !protagonists) return <p>Loading..</p>
    if (error) return <p>Error..</p>

    return (
        <>
            <h1>Protagonists</h1>
            {protagonists?.map((protagonist, index) =>
                <div key={index}>
                    {protagonist.name} {protagonist.slug}
                    <Link href={`${params.gameSlug}/${protagonist.slug}`}>Dashboard</Link>
                </div>
            )}
        </>
    )
}
export default GamesList