import {Moment} from "moment";

export type CreateGameFormData = {
    title: string
    slug: string
    startedAt: Moment
}