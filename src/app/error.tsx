'use client'
import {useSWRConfig} from "swr";
import Link from "next/link";

type ErrorProps = {
    error: Error & { digest?: string }
    reset: () => void
}

const ErrorPage = ({error, reset}: ErrorProps) => {
    const {mutate} = useSWRConfig()

    const handleReset = () => {
        mutate(() => true)
            .then(() => reset())
    }

    return (
        <div>
            <h2>Something went wrong!</h2>
            <p>{error.message}</p>
            <Link href={'/'}>Back to home</Link>

            <button onClick={handleReset}>Try again</button>
        </div>
    )
}
export default ErrorPage