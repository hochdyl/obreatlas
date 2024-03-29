'use client'
import {createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useEffect, useState} from "react";
import {callApi, isSuccess} from "@/services/ApiService";

type AuthenticationContextType = {
    user: User
    setUser: Dispatch<SetStateAction<User>>
}

export const AuthenticationContext = createContext<AuthenticationContextType | null>(null)

export const AuthenticationProvider: FC<PropsWithChildren> = ({children}) => {
    const [user, setUser] = useState<User | undefined | null>(null)

    useEffect(() => {
        callApi<User>({
            endpoint: 'user',
            method: 'POST',
        }, res => {
            if (isSuccess(res)) {
                return setUser(res.data)
            }
            return setUser(undefined)
        })
    }, [])

    return typeof user === null ? <p>App loading..</p> :
        <AuthenticationContext.Provider value={{user, setUser}}>
            {children}
        </AuthenticationContext.Provider>
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
