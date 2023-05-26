import { Instance, types } from "mobx-state-tree"
import { PaginatedSchemaBase, BaseModelSchemaBase } from "../../api/endpoint.types"

export const Todos = types.model({
  name: types.string,
  image: types.maybeNull(types.string)
})

export interface TodosType extends Instance<typeof Todos> { }

export const TodosPaginated = types.model({
  ...PaginatedSchemaBase,
  results: types.array(Todos),
})

export interface TodosPaginatedType extends Instance<typeof TodosPaginated> { }