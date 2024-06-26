'use client'
import {ReactElement} from "react";
import {Skeleton, Stack, Typography} from "@mui/material";
import {GlassCard} from "@/components/ui/Glass";
import useGame from "@/hooks/games/useGame";
import ChooseProtagonistButton from "@/components/common/ChooseProtagonistButton";
import theme from "@/theme";

const ProtagonistDashboardPage = (): ReactElement => {
    const {error, protagonist} = useGame()

    if (error) throw new Error(error.message)

    return (
        <>
            <Stack direction="row" sx={{flex: 1, width: 1, gap: theme.spacing(8)}}>
                <Stack sx={{flex: 1, gap: 1, width: 1}}>
                    <Typography variant="h2">
                        {protagonist ? protagonist.name : <Skeleton animation="wave" width={300}/>}
                    </Typography>

                    {protagonist && !protagonist.owner &&
                        <ChooseProtagonistButton sx={{alignSelf: "flex-start"}}/>
                    }

                    <Stack direction="row" sx={{gap: theme.spacing(1)}}>
                        <Typography>test</Typography>
                        <Typography>test</Typography>
                        <Typography>test</Typography>
                    </Stack>
                </Stack>

                <Stack component={GlassCard} sx={{alignSelf: "flex-start", width: 250, px: 2, py: 1}}>
                    <Typography>test</Typography>
                </Stack>
            </Stack>
        </>

    )
}
export default ProtagonistDashboardPage