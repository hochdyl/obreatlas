'use client'
import {ReactElement} from "react";
import Link from "next/link";
import Image from "next/image";
import useUser from "@/hooks/authentication/useUser";
import {useParams} from "next/navigation";
import useGame from "@/hooks/games/useGame";
import getImage from "@/utils/getImage";

type ProtagonistCardProps = {
    protagonist: Protagonist
}

const ProtagonistCard = ({protagonist}: ProtagonistCardProps): ReactElement => {
    const params = useParams<{gameSlug: string}>()
    const {game} = useGame(params.gameSlug)
    const {user} = useUser()

    if (!user || !game) return <></>

    return (
        <div>
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
            {(
                !protagonist.owner || // No owner
                (protagonist.owner && protagonist.owner.id === user.id) || // User is owner
                game.owner.id === user.id // User is game owner
            ) &&
                <Link href={`${params.gameSlug}/${protagonist.slug}`}>View</Link>
            }
            <br/>
            <br/>
        </div>
    )
}
export default ProtagonistCard