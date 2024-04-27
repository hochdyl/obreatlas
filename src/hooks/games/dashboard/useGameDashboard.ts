'use client'
import useSession from "@/hooks/users/useSession";

const useGameDashboard = () => {
    const {user, error, isLoading} = useSession()

    return {user, error, isLoading}
}
export default useGameDashboard