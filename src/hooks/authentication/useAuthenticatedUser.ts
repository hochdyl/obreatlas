'use client'
import {useSWRConfig} from "swr"
import useSWRImmutable from "swr/immutable"
import {useCallback} from "react"
import SessionService from "@/services/SessionService"

const useAuthenticatedUser = () => {
    const {mutate: configMutate} = useSWRConfig()
    const {data: user, isLoading, error, mutate} = useSWRImmutable<AuthenticatedUser>('/users/self')

    const logout = useCallback(async () => {
        SessionService.closeSession()
        configMutate(
            () => true,
            undefined,
            {revalidate: false}
        ).then(() => window.location.reload())
    }, [])

    return {user, isLoading, error, mutate, logout}
}
export default useAuthenticatedUser