'use client'
import {ReactElement} from "react";
import {useParams, useRouter} from "next/navigation";
import useGame from "@/hooks/games/useGame";
import useProtagonist from "@/hooks/games/protagonists/useProtagonist";
import Image from "next/image";
import getImage from "@/utils/getImage";
import {chooseProtagonist} from "@/api/games/protagonists/ProtagonistApi";
import PageLoading from "@/components/ui/PageLoading";

const Protagonist = (): ReactElement => {
    const router = useRouter()
    const params = useParams<{gameSlug: string, protagonistSlug: string}>()

    const {protagonist, isLoading, error} = useProtagonist(params.gameSlug, params.protagonistSlug)
    const {game} = useGame(params.gameSlug)

    if (error) throw new Error(error.message)
    if (isLoading || !protagonist) return <PageLoading/>

    const handleChooseProtagonist = async (protagonist: Protagonist) => {
        await chooseProtagonist(protagonist.id)

        void mutate()
    }

    return (
        <main>
            <button onClick={() => router.push(`/${params.gameSlug}`)}>Back to game</button>
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
        </main>
    )
}
export default Protagonist