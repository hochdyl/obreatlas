'use client'
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

const useUser = () => {
    const {data: user, error, isLoading, mutate} = useSWRImmutable<User>('/users/self')

    return {user, error, isLoading, mutate}
}
export default useUser