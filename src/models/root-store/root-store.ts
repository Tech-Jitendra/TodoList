import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { DummyStore } from "../modules/dummy/store"
import { i18nStore } from "../modules/i18n/store"
import { UserStore } from "../modules/user/store"
import { NotificationStore } from "../modules/notification/store"
import { SettingsStore } from "../modules/settings/store"
import { TodosStore }  from "../modules/newTodo/store"
/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
    userStore: types.optional(UserStore, {} as any),
    dummyStore: types.optional(DummyStore, {} as any),
    i18nStore: types.optional(i18nStore, {} as any),
    notificationStore: types.optional(NotificationStore, {} as any),
    settingsStore: types.optional(SettingsStore, {} as any),
    TodosStore: types.optional(TodosStore, {} as any),
})
/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
