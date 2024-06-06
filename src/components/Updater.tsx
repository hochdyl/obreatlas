'use client'
import React, {ReactElement} from "react";
import {Backdrop, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {useSWRConfig} from "swr";

type UpdaterProps = {
    show: boolean
}

const Updater = ({show}: UpdaterProps): ReactElement => {
    const {mutate} = useSWRConfig()

    const handleUpdate = () => {
        mutate(
            () => true,
            undefined,
            {revalidate: false}
        ).then(() => location.reload())
    }

    return (
        <Backdrop
            open={show}
            sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <Card variant="outlined">
                <CardContent>
                    <Typography >Update available</Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={handleUpdate}>Update</Button>
                </CardActions>
            </Card>
        </Backdrop>
    )
}
export default Updater