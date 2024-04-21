'use client'
import {SWRConfig} from 'swr'
import {PropsWithChildren, ReactElement} from "react"
import ApiService from "@/services/ApiService";

export const SwrProvider = ({children}: Readonly<PropsWithChildren>): ReactElement =>
    <SWRConfig
        value={{
            fetcher: (url: string) => ApiService.fetch({url}).then(r => r.data),
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