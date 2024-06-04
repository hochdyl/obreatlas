import ApiService from "@/services/ApiService";

const ROUTE_URL = 'metrics'

export const createMetric = (gameSlug: string, data: CreateMetricFormData) => {
    return ApiService.fetch<Metric>({
        url: `${ROUTE_URL}/${gameSlug}/create`,
        method: "POST",
        data
    })
}

export const editAllMetricsValues = (protagonistId: number, data: EditMetricValueFormData) => {
    return ApiService.fetch<Protagonist>({
        url: `${ROUTE_URL}/${protagonistId}/editAll`,
        method: "POST",
        data
    })
}