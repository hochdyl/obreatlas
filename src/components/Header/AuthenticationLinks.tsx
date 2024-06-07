'use client'
import React, {ReactElement} from "react";
import Link from "next/link";
import {Button} from "@mui/material";
import {Box} from "@mui/system";

const UserMenu = (): ReactElement => {
    return (
        <Box sx={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
            gap: 2
        }}>
            <Link href={'/login'}>
                <Button
                    variant="contained"
                    size="medium">
                    Login
                </Button>
            </Link>
            <Link href={'/register'}>
                <Button
                    variant="text"
                    size="medium">
                    Register
                </Button>
            </Link>
        </Box>
    )
}
export default UserMenu