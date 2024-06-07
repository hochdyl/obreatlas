'use client'
import React, {ReactElement} from "react";
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser";
import {Button, CardActions, CardContent, Container, Typography} from "@mui/material";
import Loader from "@/components/Loader";
import {GlassCard} from "@/components/Glass/Glass";

const HomePage = (): ReactElement => {
    const {isLoading} = useAuthenticatedUser()

    if (isLoading) return <Loader/>

    return (
        <Container maxWidth="lg" sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10
        }}>
            <Typography variant="h1" maxWidth="md">Welcome to Atlas</Typography>
            <GlassCard sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Word of the Day
                    </Typography>
                    <Typography variant="h5" component="div">
                        prout
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                    </Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </GlassCard>
            {/*<GamesList/>*/}
        </Container>
    );
}
export default HomePage