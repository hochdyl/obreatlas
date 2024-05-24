'use client'
import React, {PropsWithChildren, ReactElement} from "react"
import useUser from "@/hooks/authentication/useUser";
import PageLoading from "@/components/ui/PageLoading";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const AppLayout = ({children}: Readonly<PropsWithChildren>): ReactElement => {
    const {user, isLoading, error} = useUser()

    if (error) throw new Error(error.message)
    if (isLoading || !user) return <PageLoading/>

    return (
        <>
            <NavBar/>
            <main>
                {children}
            </main>
            <Footer/>
        </>
    );
}
export default AppLayout