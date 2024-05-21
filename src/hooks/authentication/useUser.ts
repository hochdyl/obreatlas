'use client'
import {useSWRConfig} from "swr";
import useSWRImmutable from "swr/immutable";
import {useCallback} from "react";
import SessionService from "@/services/SessionService";
import {useRouter} from "next/navigation";

const useUser = () => {
    const { mutate: configMutate } = useSWRConfig()
    const router = useRouter()
    const {data: user, error, isLoading, mutate} = useSWRImmutable<User>('/users/self')

    const logout = useCallback(async () => {
        SessionService.closeSession()
        configMutate(
            () => true,
            undefined,
            {revalidate: false}
        ).then(() => router.refresh())
    }, []);

    return {user, error, isLoading, mutate, logout}
}
export default useUser