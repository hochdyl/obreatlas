'use client'
import {ReactElement, useState} from "react";
import {useParams} from "next/navigation";
import usePlayProtagonist from "@/hooks/games/protagonists/usePlayProtagonist";
import Image from "next/image";
import getImage from "@/utils/getImage";
import {chooseProtagonist} from "@/api/games/protagonists/ProtagonistApi";
import PageLoading from "@/components/ui/PageLoading";

const PlayProtagonistPage = (): ReactElement => {
    const params = useParams<{ gameSlug: string, protagonistSlug: string }>()
    const {protagonist, isLoading, error, mutate} = usePlayProtagonist(params.gameSlug, params.protagonistSlug)
    const [chooseLoading, setChooseLoading] = useState(false)

    if (error) throw new Error(error.message)
    if (isLoading || !protagonist) return <PageLoading/>

    const handleChooseProtagonist = () => {
        setChooseLoading(true)

        chooseProtagonist(protagonist.id)
            .then(() => mutate())
            .catch(() => console.log('ptit toast'))
            .finally(() => setChooseLoading(false))
    }

    return (
        <>
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
                <tr>
                    <td>Level:</td>
                    <td>{protagonist.level}</td>
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
            {chooseLoading && <p>loading choose...</p>}
        </>
    )
}
export default PlayProtagonistPage