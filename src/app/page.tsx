'use client'
import Link from "next/link";
import {FC} from "react";
import {anonymousUser, useAuthentication} from "@/contexts/AuthenticationContext";
import {deleteSession} from "@/services/SessionService";
import {useRouter} from "next/navigation";

const Home: FC = () => {
    const {user, setUser} = useAuthentication()
    const router = useRouter()

    const logout = async () => {
        await deleteSession()
        setUser(anonymousUser)
        router.replace('/login')
    }

    return (
        <main>
            <Link href={'/register'}>Register</Link>
            <Link href={'/login'}>Login</Link>
            <p onClick={logout}>Logout</p>
            Fiche perso {user.username}
        </main>
    );
}
export default Home