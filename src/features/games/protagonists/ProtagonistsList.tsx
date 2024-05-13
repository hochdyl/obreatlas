'use client'
import {ReactElement} from "react";
import Link from "next/link";
import useProtagonists from "@/hooks/games/protagonists/useProtagonists";
import {useParams} from "next/navigation";
import Image from "next/image";

const ProtagonistsList = (): ReactElement => {
    const params = useParams<{gameSlug: string}>()
    const {protagonists, error, isLoading} = useProtagonists(params.gameSlug)

    if (isLoading && !protagonists) return <p>Loading..</p>
    if (error) return <p>Error..</p>

    const handlePortrait = (protagonist: SWRProtagonist) => {
        const path = `${process.env.API_URL}/uploads`

        if (protagonist.portrait) {
            return `${path}/${protagonist.portrait.fileName}`
        }

        return `${path}/default.jpg`
    }

    return (
        <>
            <h1>Protagonists</h1>
            {protagonists?.map((protagonist, index) =>
                <div key={index}>
                    {!protagonist.id ?
                        <p>Loading portrait..</p> :
                        <Image
                            src={handlePortrait(protagonist)}
                            alt="protagonist portrait"
                            height="50"
                            width="50"
                        />
                    }

                    {protagonist.name} {protagonist.slug}
                    <Link href={`${params.gameSlug}/${protagonist.slug}`}>Dashboard</Link>
                </div>
            )}
        </>
    )
}
export default ProtagonistsList