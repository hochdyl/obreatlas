'use client'
import {ReactElement, useState} from "react";
import {useParams} from "next/navigation";
import Image from "next/image";
import getImage from "@/utils/getImage";
import PageLoading from "@/components/ui/PageLoading";
import {chooseProtagonist} from "@/api/protagonists/ProtagonistApi";
import useProtagonistData from "@/hooks/protagonists/useProtagonistData";

const PlayProtagonistPage = (): ReactElement => {
    const params = useParams<{ gameSlug: string, protagonistSlug: string }>()
    const {protagonist, isLoading, error, mutate} = useProtagonistData(params.gameSlug, params.protagonistSlug)
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