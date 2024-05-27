import ApiService from "@/services/ApiService";
import getFormData from "@/utils/getFormData";

const ROUTE_URL = 'protagonists'

export const createProtagonist = (gameSlug: string, data: CreateProtagonistFormData) => {
    return ApiService.fetch<Protagonist>({
        url: `${ROUTE_URL}/${gameSlug}/create`,
        method: "POST",
        data: getFormData(data)
    })
}

export const chooseProtagonist = (protagonistId: number) => {
    return ApiService.fetch<Protagonist>({
        url: `${ROUTE_URL}/${protagonistId}/choose`
    })
}

export const editProtagonist = (protagonistId: number, data: EditProtagonistFormData) => {
    return ApiService.fetch<Protagonist>({
        url: `${ROUTE_URL}/${protagonistId}/edit`,
        method: "POST",
        data: getFormData(data)
    })
}