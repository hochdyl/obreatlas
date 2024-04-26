'use client'
import useSWRImmutable from "swr/immutable";

const useUser = () => {
    const {data: user, error, isLoading} = useSWRImmutable<User>('/users')

    return {user, error, isLoading}
}
export default useUser