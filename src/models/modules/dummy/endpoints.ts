import { ApiResponse } from "apisauce"
import {
    API_ENDPOINT,
    REQUEST_METHOD,
    PAGINATION_FILTERS,
    UTILS,
    PaginatedSchemaBase,
    TRAILING_SLASH,
} from "../../api/endpoint.types"
import * as SCHEMAS from "./schemas"

const TRANSFORMERS = {
    dummyPaginatedTransformer: (data) => ({
        ...data,
        count: parseInt(data.count),
        results: data.results.map((result) => {
            result.created_on = new Date(result.created_on)
            result.edited_on = new Date(result.edited_on)
            return result
        }),
    }),
    dummyTransformer: (data) => ({
        ...data,
        created_on: new Date(data.created_on),
        edited_on: new Date(data.edited_on),
    }),
}
//export const API_ENDPOINTS: Record<string, API_ENDPOINT> = {
export const API_ENDPOINTS = {
    getDummies: new API_ENDPOINT({
        url: "/dummy/",
        method: REQUEST_METHOD.GET,
        response: SCHEMAS.DummyPaginated,
        transformer: TRANSFORMERS.dummyPaginatedTransformer,
    }),
    getDummy: new API_ENDPOINT({
        url: "/dummy/{id}/",
        method: REQUEST_METHOD.GET,
        response: SCHEMAS.Dummy,
        transformer: TRANSFORMERS.dummyTransformer,
    }),
    createDummy: new API_ENDPOINT({
        url: "/dummy/",
        method: REQUEST_METHOD.POST,
        response: SCHEMAS.Dummy,
        transformer: TRANSFORMERS.dummyTransformer,
    }),
    editDummy: new API_ENDPOINT({
        url: "/dummy/{id}/",
        method: REQUEST_METHOD.PATCH,
        response: SCHEMAS.Dummy,
        transformer: TRANSFORMERS.dummyTransformer,
    }),
    deleteDummy: new API_ENDPOINT({
        url: "/dummy/{id}/",
        method: REQUEST_METHOD.DELETE,
        response: null,
        transformer: null,
    }),
}
