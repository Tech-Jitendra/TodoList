import { types, Instance } from "mobx-state-tree"
import { PaginatedSchemaBase, BaseModelSchemaBase } from "../../api/endpoint.types"
/**
 * Dummy: Dummy model for demonstration
 */
import { i18nJSON } from "../i18n/schema"
export const Dummy = types.model({
    ...BaseModelSchemaBase,
    message: types.string,
    multiLanguageMessage: types.maybeNull(types.frozen<i18nJSON>()),
})
export interface DummyType extends Instance<typeof Dummy> {}

export const DummyPaginated = types.model({
    ...PaginatedSchemaBase,
    results: types.array(Dummy),
})
export interface DummyPaginatedType extends Instance<typeof DummyPaginated> {}
//.actions(generatedPaginatedActions<DummyType>(Dummy))
