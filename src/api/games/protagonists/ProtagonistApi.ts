import ApiService from "@/services/ApiService";
import getFormData from "@/utils/getFormData";

const ROUTE_URL = 'protagonists'

export const createProtagonist = (gameSlug: string, data: CreateProtagonistFormData) => {
    console.log({...data, portrait: data.portrait?.[0]})
    return ApiService.fetch<Protagonist>({
        url: `${gameSlug}/${ROUTE_URL}`,
        method: "POST",
        data: getFormData({...data, portrait: data.portrait?.[0]})
    })
}