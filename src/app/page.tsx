'use client'
import React, {ReactElement} from "react"
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser"
import {Button, Card, CardActions, CardContent, Container, Typography} from "@mui/material"
import Loader from "@/components/Loader"
import {GlassPaper} from "@/components/Glass"
import {Box} from "@mui/system"

const HomePage = (): ReactElement => {
    const {isLoading} = useAuthenticatedUser()

    if (isLoading) return <Loader/>

    return (
        <Container maxWidth="lg" sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10
        }}>
            <Typography variant="h1" sx={{flex: 3, mt: 10}}>Welcome to Atlas</Typography>
            <Box sx={{
                display: "flex",
                flexFlow: "column nowrap",
                gap: 3,
                flex: 2
            }}>
                <Card sx={{flex: 1}}>
                    <CardContent>
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                            Word of the Day
                        </Typography>
                        <Typography variant="h5" component="div" color="secondary">
                            prout
                        </Typography>
                        <Typography sx={{mb: 1.5}} color="text.secondary">
                            adjective
                        </Typography>
                        <GlassPaper sx={{p: 2}}>
                            test
                        </GlassPaper>
                        <Typography variant="body2">
                            well meaning and kindly.
                            <br/>
                            {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Box>
        </Container>
    )
}
export default HomePage