import { types } from "mobx-state-tree";

export const todoList = types.model({
  name : types.string,
  id : types.maybeNull(types.string)
})
