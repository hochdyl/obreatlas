import React, {ReactElement} from "react";
import useUser from "@/hooks/authentication/useUser";

const NavBar = (): ReactElement => {
    const {user, logout} = useUser()

    return (
        <nav>
            navbar - connected as {user ? `${user.username}` : "SKELETON"} <button onClick={logout}>Logout</button>
        </nav>
    )
}
export default NavBar