import {ReactElement} from "react";
import useAppVersions from "@/hooks/appVersions/useAppVersions";
import {useSWRConfig} from "swr";

const AppVersion = (): ReactElement => {
    const {mutate} = useSWRConfig()
    const {
        currentVersion,
        isUpdateAvailable
    } = useAppVersions()

    const handleUpdate = () => {
        mutate(
            () => true,
            undefined,
            {revalidate: false}
        ).then(() => location.reload())
    }

    return (
        <>
            <p>Version {currentVersion ? `${currentVersion.name} ${currentVersion.number}` : "SKELETON"}</p>
            {isUpdateAvailable &&
                <button onClick={() => handleUpdate()}>Update available</button>
            }
        </>
    )
}
export default AppVersion