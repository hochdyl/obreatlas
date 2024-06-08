'use client'
import React, {ReactElement} from "react"
import Link from "next/link"
import {Button, Container, Typography} from "@mui/material"

const NotFoundPage = (): ReactElement => {
    return (
        <Container sx={{
            display: "flex",
            flexFlow: "column nowrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            textAlign: "center"
        }}>
            <Typography variant="h1">404 Not found!</Typography>
            <Link href={'/'}>
                <Button variant="contained">Back to home</Button>
            </Link>
        </Container>
    )
}
export default NotFoundPage