import {Stack, Typography} from "@mui/material";
import React, {ReactElement} from "react";
import {GlassPaper} from "@/components/ui/Glass";
import ProtagonistCard from "@/components/common/ProtagonistCard";
import useGame from "@/hooks/games/useGame";
import GameNavigationHeader from "@/components/layout/GameNavigation/GameNavigationHeader";
import ProtagonistCardSkeleton from "@/components/common/ProtagonistCard/ProtagonistCardSkeleton";
import {useRouter} from "next/navigation";
import theme from "@/theme";

const GameNavigation = (): ReactElement => {
    const router = useRouter()
    const {game} = useGame()

    return (
        <Stack sx={{width: 250, height: 1, gap: theme.spacing(2)}}>
            <GameNavigationHeader/>

            <Stack sx={{overflowY: "auto"}}>
                <Stack sx={{gap: theme.spacing(2)}}>
                    {game ?
                        !game.protagonists.length ?
                            <Typography component={GlassPaper} sx={{p: 2}}>
                                No protagonist found
                            </Typography>
                            :
                            game.protagonists.map(protagonist =>
                                <ProtagonistCard
                                    key={protagonist.id}
                                    protagonist={protagonist}
                                    actionTitle="Access"
                                    onClick={() => router.push(`/${game.slug}/dashboard/${protagonist.slug}`)}
                                />
                            )
                        :
                        <ProtagonistCardSkeleton/>
                    }
                </Stack>
            </Stack>
        </Stack>
    )
}
export default GameNavigation