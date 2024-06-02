import ApiService from "@/services/ApiService";

const ROUTE_URL = 'protagonists'

export const createProtagonist = (gameSlug: string, data: CreateProtagonistFormData) => {
    return ApiService.fetch<Protagonist>({
        url: `${ROUTE_URL}/${gameSlug}/create`,
        method: "POST",
        data
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
        data
    })
}