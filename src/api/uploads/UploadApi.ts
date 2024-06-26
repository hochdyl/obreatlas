import axios, {AxiosProgressEvent} from "axios";
import SessionService from "@/services/SessionService";

const ROUTE_URL = '/uploads'

export const upload = (file: File, onUploadProgress?: (e: AxiosProgressEvent) => void) => {
    const axiosInstance = axios.create({
        baseURL: process.env.API_URL,
        headers: {
            Accept: 'application/json',
            "Content-Type": 'multipart/form-data',
            Authorization: `Bearer ${SessionService.getSession()}`
        }
    })

    let formData = new FormData()
    formData.append("file", file)

    return axiosInstance<SuccessResponse<Upload>>({
        url: `${ROUTE_URL}/upload`,
        data: formData,
        method: "POST",
        onUploadProgress
    })
}