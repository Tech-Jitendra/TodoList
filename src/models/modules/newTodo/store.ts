import { types, flow } from "mobx-state-tree";
import { withEnvironment } from "../../extensions/with-environment";
import * as SCHEMAS from "./schemas";
import { ACTION_RESPONSES } from "../../api/endpoint.types";

export const TodosStore = types
  .model({
    todosPaginated: types.maybeNull(SCHEMAS.TodosPaginated),
    Todos: types.array(SCHEMAS.Todos),
    completedTodos: types.array(SCHEMAS.Todos),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    removeTodo: flow(function* (val: number) {
      self.Todos.splice(val, 1);
      return ACTION_RESPONSES.success;
    }),
    createTodo: flow(function* (val: { name: string; description: string }) {
      self.Todos.push({
        name: val.name,
        description: val.description,
      });
      return ACTION_RESPONSES.success;
    }),
  }))
  .actions((self) => ({
    completeTodo: flow(function* (val: string, id: number) {
      self.completedTodos.push({
        name: val,
      });
      self.removeTodo(id);
      return ACTION_RESPONSES.success;
    }),
  }));
