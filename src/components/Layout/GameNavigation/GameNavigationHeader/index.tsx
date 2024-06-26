'use client'
import React, {ReactElement} from "react";
import {Divider, Skeleton, Stack, Typography} from "@mui/material";
import {Category, Dashboard, Edit, Home, Map, Numbers, People} from "@mui/icons-material";
import useGame from "@/hooks/games/useGame";
import {GlassPaper} from "@/components/ui/Glass";
import GameNavigationLink from "@/components/layout/GameNavigation/GameNavigationLink";
import GameNavigationLinkSkeleton
    from "@/components/layout/GameNavigation/GameNavigationLink/GameNavigationLinkSkeleton";

const GameNavigationHeader = (): ReactElement => {
    const {isGameMaster, game} = useGame()

    return (
        <Stack component={GlassPaper} sx={{px: 2, py: 1}}>
            <Typography variant="standout" sx={{fontSize: 20}}>
                {game ? game.title : <Skeleton animation="wave"/>}
            </Typography>
            <Stack direction="row" sx={{
                flexWrap: "wrap",
                alignItems: "center",
                pt: isGameMaster ? 0 : 1,
            }}>
                {game ?
                    <>
                        <GameNavigationLink
                            href={`/${game.slug}`}
                            title="Home"
                            icon={<Home/>}
                        />
                        <GameNavigationLink icon={<Map/>}/>
                    </>
                    :
                    <>
                        <GameNavigationLinkSkeleton/>
                        <GameNavigationLinkSkeleton/>
                    </>
                }
            </Stack>

            {game && isGameMaster &&
                <>
                    <Typography variant="overline" color="primary">
                        Game master
                    </Typography>

                    <Divider/>

                    <Stack direction="row" sx={{flexWrap: "wrap", pt: 1}}>
                        <GameNavigationLink
                            href={`/${game.slug}/game-master`}
                            title="Dashboard"
                            icon={<Dashboard/>}
                        />
                        <GameNavigationLink
                            href={`/${game.slug}/game-master/protagonists`}
                            title="Protagonists"
                            icon={<People/>}
                        />
                        <GameNavigationLink
                            href={`/${game.slug}/game-master/metrics`}
                            title="Metrics"
                            icon={<Numbers/>}
                        />
                        <GameNavigationLink icon={<Category/>}/>
                    </Stack>
                </>
            }
        </Stack>
    )
}
export default GameNavigationHeader