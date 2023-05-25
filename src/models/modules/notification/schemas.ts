import { Instance, types } from "mobx-state-tree"
import { PaginatedSchemaBase, BaseModelSchemaBase } from "../../api/endpoint.types"

export const Action = types.model({
    label: types.string,
    target_external_url: types.string,
    target_internal_url: types.string,
})


export const Notification = types.model({
    ...BaseModelSchemaBase,
    title: types.string,
    image: types.maybeNull(types.string),
    message: types.maybeNull(types.string),
    target_user: types.string,
    is_read: types.boolean,
    notification_type: types.string,
    actions: types.maybeNull(types.array(Action)),
    content_type: types.integer,
    object_id: types.integer,
})

export interface NotificationsType extends Instance<typeof Notification> { }

export const NotificationsPaginated = types.model({
    ...PaginatedSchemaBase,
    results: types.array(Notification),
})

export interface NotificationsPaginatedType extends Instance<typeof NotificationsPaginated> { }