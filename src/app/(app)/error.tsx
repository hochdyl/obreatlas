'use client'
import {useSWRConfig} from "swr";
import {useRouter} from "next/navigation";

type ErrorProps = {
    error: Error & {digest?: string}
    reset: () => void
}

const Error = ({error, reset}: ErrorProps) => {
    const router = useRouter()
    const {mutate} = useSWRConfig()

    const handleReset = () => {
        mutate(
            () => true,
            undefined,
            {revalidate: true}
        ).then(() => reset())
    }

    return (
        <div>
            <h2>Something went wrong!</h2>
            <p>{error.message}</p>
            <button onClick={() => router.push('/')}>Back to home</button>
            <button onClick={handleReset}>Try again</button>
        </div>
    )
}
export default Error