'use client'
import useSWRImmutable from "swr/immutable";

const useSession = () => {
    const {data: user, error, isLoading} = useSWRImmutable<User>('/users/self')

    return {user, error, isLoading}
}
export default useSession