'use client'
import {useSWRConfig} from "swr";
import useSWRImmutable from "swr/immutable";
import {useCallback} from "react";
import SessionService from "@/services/SessionService";
import {useRouter} from "next/navigation";

const useUser = () => {
    const router = useRouter()
    const {mutate: configMutate} = useSWRConfig()
    const {data: user, isLoading, error, mutate} = useSWRImmutable<AuthenticatedUser>('/users/self')

    const logout = useCallback(async () => {
        SessionService.closeSession()
        configMutate(
            () => true,
            undefined,
            {revalidate: false}
        ).then(() => router.replace('/'))
    }, []);

    return {user, isLoading, error, mutate, logout}
}
export default useUser