'use client'
import {ReactElement} from "react";
import ProtagonistCard from "@/features/games/protagonists/ProtagonistCard";

type ProtagonistsListProps = {
    protagonists: Protagonist[]
}

const ProtagonistsList = ({protagonists}: ProtagonistsListProps): ReactElement => {
    return (
        <>
            <h1>Protagonists</h1>
            {protagonists.map((protagonist, index) =>
                <ProtagonistCard
                    protagonist={protagonist}
                    key={index}
                />
            )}
        </>
    )
}
export default ProtagonistsList