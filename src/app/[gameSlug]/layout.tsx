'use client'
import React, {PropsWithChildren, ReactElement} from "react"
import PermissionService from "@/services/PermissionService";
import Link from "next/link";
import {useParams} from "next/navigation";
import useGameLobby from "@/hooks/games/useGameLobby";
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser";
import PageLoading from "@/components/ui/PageLoading";
import Image from "next/image";
import getImage from "@/utils/getImage";

const GameLobbyLayout = ({children}: Readonly<PropsWithChildren>): ReactElement => {
    const params = useParams<{ gameSlug: string }>()
    const {game, error, isLoading} = useGameLobby(params.gameSlug)
    const {user} = useAuthenticatedUser()

    if (error) throw new Error(error.message)
    if (isLoading || !game || !user) return <PageLoading/>

    return (
        <>
            <nav>
                <h1>{game.title}</h1>
                {PermissionService.isGameMaster(user, game) &&
                    <>
                        <Link href={`/${game.slug}/game-master`}>Admin dashboard</Link>
                        <Link href={`/${game.slug}/game-master/edit`}>Edit</Link>
                        <Link href={`/${game.slug}/game-master/metrics`}>Metrics</Link>
                    </>
                }
                <h3>Protagonists available</h3>
                {game.protagonists.map(protagonist =>
                    <div key={protagonist.id}>
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
                            <>
                                <Link
                                    href={`/${params.gameSlug}/game-master/protagonists/${protagonist.slug}`}>Edit {protagonist.name}</Link>
                                <Link
                                    href={`/${params.gameSlug}/game-master/metrics/${protagonist.slug}`}>{protagonist.name} metrics</Link>
                            </>
                        }
                        <br/>
                        <br/>
                    </div>
                )}
            </nav>
            {children}
        </>

    );
}
export default GameLobbyLayout