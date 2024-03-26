import {createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useEffect, useState} from "react";

type AuthenticationContextType = {
    user: User
    setUser: Dispatch<SetStateAction<User>>
}

export const AuthenticationContext = createContext<AuthenticationContextType | null>(null)

export const AuthenticationProvider: FC<PropsWithChildren> = ({children}) => {
    const [user, setUser] = useState<User | null>(null)

    console.log(user)
    useEffect(() => {
        setUser({
            username: 'loaded',
            apiToken: '1234'
        })
    }, [])

    return !user ? <p>App loading..</p> :
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
