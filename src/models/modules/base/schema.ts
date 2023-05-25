import { types } from "mobx-state-tree"
export const BaseModel = types.model("BaseModel").props({
  id: types.identifier,
  created_on: types.Date,
  edited_on: types.Date,
  _data: types.maybeNull(types.string),
})
