'use client'
import React, {ReactElement, useState} from "react"
import {Button} from "@mui/material"
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser"
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import {Logout} from "@mui/icons-material"
import {Box} from "@mui/system"

type UserMenuProps = {
    user: User
}

const UserMenu = ({user}: UserMenuProps): ReactElement => {
    const {logout} = useAuthenticatedUser()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = !!anchorEl

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    return (
        <Box sx={{display: "flex", flex: 1, justifyContent: "flex-end", gap: 2}}>
            <Button
                id="account-button"
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