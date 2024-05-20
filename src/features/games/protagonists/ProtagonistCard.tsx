'use client'
import {ReactElement} from "react";
import Link from "next/link";
import Image from "next/image";
import useUser from "@/hooks/authentication/useUser";
import {useParams} from "next/navigation";

type ProtagonistCardProps = {
    protagonist: Protagonist
    onChoose: (protagonist: Protagonist) => void
}

const ProtagonistCard = ({protagonist, onChoose}: ProtagonistCardProps): ReactElement => {
    const params = useParams<{gameSlug: string}>()
    const {user} = useUser()

    if (!user) return <></>

    const handlePortrait = (protagonist: Protagonist) => {
        const path = `${process.env.API_URL}/uploads`

        if (protagonist.portrait) {
            return `${path}/${protagonist.portrait.fileName}`
        }

        return '/images/default.jpg'
    }

    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <td colSpan={2}>
                        <Image
                            src={handlePortrait(protagonist)}
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
                <button onClick={() => onChoose(protagonist)}>Play this protagonist</button>
            }
            {protagonist.owner && protagonist.owner.id === user.id &&
                <Link href={`${params.gameSlug}/${protagonist.slug}`}>Dashboard</Link>
            }
            <br/>
            <br/>
        </div>
    )
}
export default ProtagonistCard