import {Moment} from "moment";

export type GameFormData = {
    title: string
    slug: string
    startedAt: Moment
    closed?: boolean
}