import {styled} from '@mui/material/styles'
import {Card, CardProps, Paper, PaperProps} from "@mui/material"
import glassStyleProps from "@/utils/glassStyleProps";

export const GlassCard = styled(Card)<CardProps>(() => glassStyleProps)
export const GlassPaper = styled(Paper)<PaperProps>(() => glassStyleProps)