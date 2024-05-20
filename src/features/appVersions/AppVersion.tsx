import {ReactElement} from "react";
import useAppVersions from "@/hooks/appVersions/useAppVersions";
import {useSWRConfig} from "swr";

const AppVersion = (): ReactElement => {
    const {
        versions,
        currentVersion,
        isUpdateAvailable,
        error,
        isLoading
    } = useAppVersions()
    const {mutate} = useSWRConfig()

    const handleUpdate = () => {
        mutate(
            () => true,
            undefined,
            {revalidate: false}
        ).then(() => location.reload())
    }

    if (isLoading) return <></>
    if (error) return <p>Error..</p>

    return (
        <>
            <p>Version {currentVersion?.name} {currentVersion?.number}</p>
            {isUpdateAvailable &&
                <button onClick={() => handleUpdate()}>Update available</button>
            }
        </>
    )
}
export default AppVersion