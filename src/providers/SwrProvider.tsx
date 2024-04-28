'use client'
import {SWRConfig} from 'swr'
import {PropsWithChildren, ReactElement} from "react"
import ApiService from "@/services/ApiService";
import {useRouter} from "next/navigation";

export const SwrProvider = ({children}: Readonly<PropsWithChildren>): ReactElement => {
    const router = useRouter()

    return (
        <SWRConfig
            value={{
                fetcher: (url: string) => ApiService.fetch({url}).then(r => r),
                onError: (error, key) => {
                    if (error.isAxiosError && error.response && error.response.status === 401) {
                        console.log('ptit toast la aussi pour le redirect')
                        router.refresh()
                    }
                },
                onErrorRetry: (error, key, config, revalidate, {retryCount}) => {
                    // Never retry on 401 nor 404
                    if (error.status === 401 || 404) return

                    // Only retry up to 3 times
                    if (retryCount >= 3) return

                    // Retry after 5 seconds
                    setTimeout(() => revalidate({retryCount}), 5000)
                }
            }}>
            {children}
        </SWRConfig>
    )
}