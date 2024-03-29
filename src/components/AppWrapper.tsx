import {FC, PropsWithChildren} from "react";
import {AuthenticationProvider} from "@/contexts/AuthenticationContext";

const AppWrapper: FC<PropsWithChildren> = ({children}) => {
    return (
        <AuthenticationProvider>
            {children}
        </AuthenticationProvider>
    )
}
export default AppWrapper