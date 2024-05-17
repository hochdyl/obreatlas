'use client'
import {ReactElement} from "react";
import Link from "next/link";
import useProtagonists from "@/hooks/games/protagonists/useProtagonists";
import {useParams} from "next/navigation";
import Image from "next/image";
import useUser from "@/hooks/authentication/useUser";
import {chooseProtagonist} from "@/api/games/protagonists/ProtagonistApi";

const ProtagonistsList = (): ReactElement => {
    const params = useParams<{gameSlug: string}>()
    const {protagonists, error, isLoading, mutate} = useProtagonists(params.gameSlug)
    const {user} = useUser()

    if (isLoading && !protagonists || !user) return <p>Loading..</p>
    if (error) return <p>Error..</p>

    const handlePortrait = (protagonist: Protagonist) => {
        const path = `${process.env.API_URL}/uploads`

        if (protagonist.portrait) {
            return `${path}/${protagonist.portrait.fileName}`
        }

        return '/images/default.jpg'
    }

    const handlePlayProtagonist = async (protagonistId: number) => {
        await chooseProtagonist(protagonistId)

        void mutate()
    }

    return (
        <>
            <h1>Protagonists</h1>
            {protagonists?.map((protagonist, index) =>
                <div key={index}>
                    <Image
                        src={handlePortrait(protagonist)}
                        alt="protagonist portrait"
                        height="50"
                        width="50"
                    />
                    {protagonist.name} {protagonist.slug}
                    {!protagonist.owner &&
                        <button onClick={() => handlePlayProtagonist(protagonist.id)}>Play this protagonist</button>
                    }
                    {protagonist.owner && protagonist.owner.id === user.id &&
                        <Link href={`${params.gameSlug}/${protagonist.slug}`}>Dashboard</Link>
                    }
                </div>
            )}
        </>
    )
}
export default ProtagonistsList