'use client'
import useSWR from "swr";

// Todo: Delete this
const useUser = () => {
    const {data: user, error, isLoading} = useSWR<SuccessResponse<User>>('/self')

    return {
        user,
        isLoading,
        error
    }
}
export default useUser