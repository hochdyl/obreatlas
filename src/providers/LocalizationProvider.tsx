'use client'
import {PropsWithChildren, ReactElement} from "react"
import {LocalizationProvider as MuiLocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment'

const LocalizationProvider = ({children}: Readonly<PropsWithChildren>): ReactElement => {
    return (
        <MuiLocalizationProvider dateAdapter={AdapterMoment}>
            {children}
        </MuiLocalizationProvider>
    )
}
export default LocalizationProvider