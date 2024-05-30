'use client'
import React, {ReactElement} from "react";
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser";

const Header = (): ReactElement => {
    const {user, isLoading, logout} = useAuthenticatedUser()

    return (
        <header>
            {user &&
                <>
                    {user.username}
                    <button onClick={logout}>Logout</button>
                </>
            }
        </header>
    )
}
export default Header