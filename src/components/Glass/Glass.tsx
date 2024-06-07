import {styled} from '@mui/material/styles';
import {Card, CardProps, Paper, PaperProps} from "@mui/material";
import theme from "@/theme";

const glassProperties = {
    border: "1px solid rgba(255, 255, 255, 0.3)",
    backgroundColor: `${theme.palette.primary.main}20`,
    backdropFilter: "blur(6px)",
}

export const GlassCard = styled(Card)<CardProps>(() => glassProperties)
export const GlassPaper = styled(Paper)<PaperProps>(() => glassProperties)