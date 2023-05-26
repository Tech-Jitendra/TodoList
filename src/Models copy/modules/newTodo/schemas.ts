import { Instance, types } from "mobx-state-tree"
import { PaginatedSchemaBase, BaseModelSchemaBase } from "../../api/endpoint.types"

export const Action = types.model({
    label: types.string,
    target_external_url: types.string,
    target_internal_url: types.string,
})


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