import React, {ReactElement, useState} from "react";
import {LoadingButton} from "@mui/lab";
import {chooseProtagonist} from "@/api/protagonists/ProtagonistApi";
import {toast} from "react-toastify";
import useGame from "@/hooks/games/useGame";
import {SxProps} from "@mui/material";

type ChooseProtagonistButtonProps = {
    sx?: SxProps
}

const ChooseProtagonistButton = ({sx}: ChooseProtagonistButtonProps): ReactElement => {
    const {protagonist, mutate} = useGame()
    const [loading, setLoading] = useState(false)

    const handleChooseProtagonist = () => {
        if (protagonist) {
            setLoading(true)

            chooseProtagonist(protagonist.id)
                .then(() => {
                    mutate().then(() => toast.success('You now own this protagonist'))
                })
                .catch(() => {
                    toast.success('An error happened when choosing this protagonist')
                })
                .finally(() => setLoading(false))
        }
    }

    return (
        <LoadingButton
            sx={sx}
            loading={loading}
            onClick={handleChooseProtagonist}
            variant="contained"
            size="large"
        >
            Choose
        </LoadingButton>
    )
}
export default ChooseProtagonistButton
