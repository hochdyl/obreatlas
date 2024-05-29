'use client'
import React, {ReactElement} from "react";
import useUser from "@/hooks/authentication/useUser";

const Header = (): ReactElement => {
    const {user, isLoading, logout} = useUser()

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