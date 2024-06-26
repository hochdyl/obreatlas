'use client'
import useSWR from "swr"
import {useEffect, useRef, useState} from "react"

const useAppVersions = () => {
    const {data: versions} = useSWR<AppVersion[]>('/app-versions')
    const [currentVersion, setCurrentVersion] = useState<AppVersion | undefined>(undefined)
    const [updateAvailable, setUpdateAvailable] = useState<boolean>(false)
    const oldVersionsData = useRef(versions)

    useEffect(() => {
        if (versions) {
            if (!currentVersion) {
                setCurrentVersion(versions[0])
            }
            if (oldVersionsData.current && versions[0].id !== oldVersionsData.current[0].id) {
                setUpdateAvailable(true)
            }
        }
        oldVersionsData.current = versions
    }, [versions])

    return {versions, currentVersion, updateAvailable}
}
export default useAppVersions