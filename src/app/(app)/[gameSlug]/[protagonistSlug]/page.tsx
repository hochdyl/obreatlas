'use client'
import {ReactElement, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import useProtagonist from "@/hooks/games/protagonists/useProtagonist";
import Image from "next/image";
import getImage from "@/utils/getImage";
import {chooseProtagonist} from "@/api/games/protagonists/ProtagonistApi";
import PageLoading from "@/components/ui/PageLoading";
import Link from "next/link";

const Protagonist = (): ReactElement => {
    const router = useRouter()
    const params = useParams<{gameSlug: string, protagonistSlug: string}>()
    const {protagonist, isLoading, error, mutate} = useProtagonist(params.gameSlug, params.protagonistSlug)
    const [loading, setLoading] = useState(false)

    if (error) throw new Error(error.message)
    if (isLoading || !protagonist) return <PageLoading/>

    const handleChooseProtagonist = () => {
        setLoading(true)

        chooseProtagonist(protagonist.id)
            .then(() => mutate())
            .catch(() => console.log('ptit toast'))
            .finally(() => setLoading(false))
    }

    return (
        <main>
            <Link href={`/${params.gameSlug}`}>Back to game</Link>
            <table>
                <tbody>
                <tr>
                    <td colSpan={2}>
                        <Image
                            src={getImage(protagonist.portrait, '/images/default.jpg')}
                            alt="protagonist portrait"
                            height="50"
                            width="50"
                        />
                    </td>
                </tr>
                <tr>
                    <td>Name:</td>
                    <td>{protagonist.name}</td>
                </tr>
                <tr>
                    <td>Slug:</td>
                    <td>{protagonist.slug}</td>
                </tr>
                <tr>
                    <td>Story:</td>
                    <td>{protagonist.story}</td>
                </tr>
                {protagonist.owner &&
                    <tr>
                        <td>Owner:</td>
                        <td>{protagonist.owner.username}</td>
                    </tr>
                }
                </tbody>
            </table>
            {!protagonist.owner &&
                <button onClick={handleChooseProtagonist}>Choose this protagonist</button>
            }
            {loading && <p>loading form...</p>}
        </main>
    )
}
export default Protagonist