'use client'
import {createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useEffect, useState} from "react";
import {callApi, isSuccess} from "@/services/ApiService";

type AuthenticationContextType = {
    user: User
    setUser: Dispatch<SetStateAction<User>>
}

export const anonymousUser: User = {
    username: '',
    apiToken: ''
}

export const AuthenticationContext = createContext<AuthenticationContextType | null>(null)

export const AuthenticationProvider: FC<PropsWithChildren> = ({children}) => {
    const [user, setUser] = useState<User>(anonymousUser)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        callApi<User>({
            endpoint: 'self',
            method: 'GET',
        }, res => {
            if (isSuccess(res)) {
                setUser(() => res.data)
            }
            setLoading(false)
        })
    }, [])

    if (loading) {
        return <p>App loading..</p>
    }

    return (
        <AuthenticationContext.Provider value={{user, setUser}}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export const useAuthentication = () => {
    const authenticationContext = useContext(AuthenticationContext)

    if (!authenticationContext) {
        throw new Error(
            "useAuthentication has to be used within <AuthenticationContext.Provider>"
        );
    }

    return authenticationContext
}