import ApiService from "@/services/ApiService";
import getFormData from "@/utils/getFormData";

const ROUTE_URL = 'protagonists'

export const createProtagonist = (gameSlug: string, data: CreateProtagonistFormData) => {
    return ApiService.fetch<Protagonist>({
        url: `${ROUTE_URL}/${gameSlug}`,
        method: "POST",
        data: getFormData(data)
    })
}

export const chooseProtagonist = (protagonistId: number) => {
    return ApiService.fetch<Protagonist>({
        url: `${ROUTE_URL}/choose/${protagonistId}`
    })
}

export const editProtagonist = (protagonistId: number, data: CreateProtagonistFormData) => {
    return ApiService.fetch<Protagonist>({
        url: `${ROUTE_URL}/${protagonistId}`,
        method: "PUT",
        data
    })
}