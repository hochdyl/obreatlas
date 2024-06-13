'use client'
import {useSWRConfig} from "swr"
import useSWRImmutable from "swr/immutable"
import {useCallback} from "react"
import SessionService from "@/services/SessionService"
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

const useAuthenticatedUser = () => {
    const router = useRouter()
    const {mutate: configMutate} = useSWRConfig()
    const {data: user, isLoading, error, mutate} = useSWRImmutable<AuthenticatedUser>('/users/self')

    const logout = useCallback(async () => {
        SessionService.closeSession()
        toast.success('Successfully logged out')
        configMutate(
            () => true,
            undefined,
            {revalidate: true}
        ).then(() => router.replace('/'))
    }, [])

    return {user, isLoading, error, mutate, logout}
}
export default useAuthenticatedUser