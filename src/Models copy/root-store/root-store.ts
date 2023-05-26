import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { TodosStore } from "../modules/newTodo/store"
/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
    todosStore: types.optional(TodosStore, {} as any),
})
/**
 * The RootStore instance.
 */
export interface RootStoreType extends Instance<typeof RootStoreModel> { }

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
