'use client'
import useSWR from "swr";

// Todo: Delete this
const useUser = () => {
    const {data, error, isLoading} = useSWR<SuccessApiResponse<User>>('/self')

    return {
        user: data,
        isLoading,
        isError: error
    }
}
export default useUser