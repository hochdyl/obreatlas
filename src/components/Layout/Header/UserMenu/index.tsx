'use client'
import React, {ReactElement, useState, MouseEvent} from "react"
import {Box, Button} from "@mui/material"
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser"
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import {Logout} from "@mui/icons-material"

type UserMenuProps = {
    user: User
}

const UserMenu = ({user}: UserMenuProps): ReactElement => {
    const {logout} = useAuthenticatedUser()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = !!anchorEl

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)

    const handleClose = () => setAnchorEl(null)

    return (
        <Box sx={{display: "flex", flex: 1, justifyContent: "flex-end"}}>
            <Button
                id="account-button"
                variant="text"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {user.username}
            </Button>
            <Menu
                id="account-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{'aria-labelledby': 'account-button'}}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                sx={{mt: 1}}
            >
                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <Logout fontSize="small"/>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    )
}
export default UserMenu