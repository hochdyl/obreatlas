'use client'
import {ReactElement} from "react";
import Link from "next/link";
import moment from "moment";

type GameCardProps = {
    game: Game
}

const GameCard = ({game}: GameCardProps): ReactElement => {
    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <td>Title:</td>
                    <td>{game.title}</td>
                </tr>
                <tr>
                    <td>Slug:</td>
                    <td>{game.slug}</td>
                </tr>
                <tr>
                    <td>Owner:</td>
                    <td>{game.owner.username}</td>
                </tr>
                <tr>
                    <td>Started at:</td>
                    <td>{moment(game.startedAt).format("YYYY-MM-DD")}</td>
                </tr>
                <tr>
                    <td>Closed:</td>
                    <td>{game.closed ? "Yes" : "No"}</td>
                </tr>
                </tbody>
            </table>
            <Link href={game.slug}>Access</Link>
            <br/>
            <br/>
        </div>
    )
}
export default GameCard