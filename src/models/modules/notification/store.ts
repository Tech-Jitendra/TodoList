import { types, flow } from "mobx-state-tree"
import { withEnvironment } from "../../extensions/with-environment"
import * as SCHEMAS from "./schemas"
import { API_ENDPOINTS } from "./endpoints"

export const NotificationStore = types
    .model({
        notificationsPaginated: types.maybeNull(SCHEMAS.NotificationsPaginated),
    })
    .extend(withEnvironment)
    .actions((self) => ({
        getNotifications: flow(function* () {
            const response = yield self.environment.api.call(API_ENDPOINTS.getNotifications,{})
            console.log("notifications data and results: ",response)
            switch (response.status) {
                case 200:
                    self.notificationsPaginated = SCHEMAS.NotificationsPaginated.create(response.data)
                    return true
                default:
                    console.error("UNHANDLED ERROR")
                    break
            }
            return false
        }),
    }))
