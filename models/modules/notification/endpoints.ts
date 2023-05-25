
import {
    API_ENDPOINT,
    REQUEST_METHOD,
} from "../../api/endpoint.types"
import * as SCHEMAS from "./schemas"


const TRANSFORMERS = {
    notificationTransformer: (data) => ({
        ...data,
        created_on: new Date(data.created_on),
        edited_on: new Date(data.edited_on),
    }),
    notificationPaginatedTransformer: (data) => ({
        ...data,
        count: parseInt(data.count),
        results: data.results.map(TRANSFORMERS.notificationTransformer)
    }),

}
export const API_ENDPOINTS = {
    getNotifications: new API_ENDPOINT({
        url: "/api/notification/",
        method: REQUEST_METHOD.GET,
        response: SCHEMAS.Notification,
        transformer: TRANSFORMERS.notificationPaginatedTransformer,
    })

}


