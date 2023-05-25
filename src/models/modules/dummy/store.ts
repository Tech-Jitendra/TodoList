import { IAnyModelType, types, flow } from "mobx-state-tree"
import { withEnvironment } from "../../extensions/with-environment"

import {
    API_ENDPOINT,
    REQUEST_METHOD,
    PAGINATION_FILTERS,
    UTILS,
    PaginatedSchemaBase,
    TRAILING_SLASH,
} from "../../api/endpoint.types"
import * as SCHEMAS from "./schemas"
import { API_ENDPOINTS } from "./endpoints"
import globalKeyStore from "../../api/global-key-store"
import { i18nJSON } from "../i18n/schema"
/**
 * Model description here for TypeScript hints.
 */
const generateUtilityActions = <Type>(model: IAnyModelType) => {
    let generatedFunctions = {}
    return (self: any) => generatedFunctions
}
export const DummyStore = types
    .model({
        selectedDummy: types.maybeNull(SCHEMAS.Dummy),
        dummyPaginated: types.maybeNull(SCHEMAS.DummyPaginated),
    })
    .extend(withEnvironment)
    .actions((self) => ({
        getDummiesPaginated: flow(function* (page_number: number = 0) {
            let FILTERS = {}
            if (page_number > 0) FILTERS[PAGINATION_FILTERS.PAGE_NUMBER] = page_number
            const response = yield self.environment.api.call(API_ENDPOINTS.getDummies, FILTERS)
            switch (response.status) {
                case 200:
                    if (self.dummyPaginated) {
                        self.dummyPaginated.results.replace(response.data.results)
                    } else {
                        self.dummyPaginated = SCHEMAS.DummyPaginated.create(response.data)
                    }
                    return true
                default:
                    console.error("UNHANDLED RESPONSE")
                    return false
            }
        }),
        getDummy: flow(function* (id: string) {
            const response = yield self.environment.api.call(API_ENDPOINTS.getDummy, {}, { id: id })
            switch (response.status) {
                case 200:
                    self.selectedDummy = SCHEMAS.Dummy.create(response.data)
                    return true
                default:
                    console.error("UNHANDLED RESPONSE")
                    return false
            }
        }),
        createDummy: flow(function* (data: { message: string; multiLanguageMessage: i18nJSON }) {
            const response = yield self.environment.api.call(API_ENDPOINTS.createDummy, data)
            switch (response.status) {
                case 201:
                    self.selectedDummy = SCHEMAS.Dummy.create(response.data)
                    return true
                default:
                    console.error("UNHANDLED RESPONSE")
                    return false
            }
        }),
        editDummy: flow(function* (id: string, data: { message: string }) {
            const response = yield self.environment.api.call(API_ENDPOINTS.editDummy, data, {
                id: id,
            })
            switch (response.status) {
                case 200:
                    self.selectedDummy = SCHEMAS.Dummy.create(response.data)
                    return true
                default:
                    console.error("UNHANDLED RESPONSE")
                    return false
            }
        }),
        deleteDummy: flow(function* (id: string) {
            const response = yield self.environment.api.call(
                API_ENDPOINTS.deleteDummy,
                {},
                {
                    id: id,
                },
            )
            switch (response.status) {
                case 204:
                    //
                    return true
                default:
                    console.error("UNHANDLED RESPONSE")
                    return false
            }
        }),
    }))
