import ApiService from "@/services/ApiService";
import getFormData from "@/utils/getFormData";

const ROUTE_URL = 'protagonists'

export const createProtagonist = (gameSlug: string, data: CreateProtagonistFormData) => {
    return ApiService.fetch<Protagonist>({
        url: `${gameSlug}/${ROUTE_URL}`,
        method: "POST",
        data: getFormData(data)
    })
}