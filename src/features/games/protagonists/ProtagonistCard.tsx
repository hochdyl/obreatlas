'use client'
import React, {ReactElement} from "react";
import Link from "next/link";
import Image from "next/image";
import {useParams} from "next/navigation";
import getImage from "@/utils/getImage";
import PermissionService from "@/services/PermissionService";
import useUser from "@/hooks/authentication/useUser";
import PageLoading from "@/components/ui/PageLoading";

type ProtagonistCardProps = {
    game: Game
    protagonist: Protagonist
}

const ProtagonistCard = ({game, protagonist}: ProtagonistCardProps): ReactElement => {
    const params = useParams<{gameSlug: string}>()
    const {user} = useUser()

    if (!user) return <PageLoading/>

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
            <Link href={`/${params.gameSlug}/play/${protagonist.slug}`}>View</Link>
            {PermissionService.isGameMaster(user, game) &&
                <Link href={`/${params.gameSlug}/play/${protagonist.slug}/edit`}>Edit {protagonist.name}</Link>
            }
            <br/>
            <br/>
        </div>
    )
}
export default ProtagonistCard