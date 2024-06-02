import ApiService from "@/services/ApiService";

const ROUTE_URL = 'metrics'

export const editMetrics = (protagonistId: number, data: EditMetricsFormData) => {
    return ApiService.fetch<Protagonist>({
        url: `${ROUTE_URL}/${protagonistId}/edit`,
        method: "POST",
        data
    })
}