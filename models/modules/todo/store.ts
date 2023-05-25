import { types ,onSnapshot } from "mobx-state-tree";
import { todoList } from "./schema";

const todo = types
  .model({
    tododata: types.array(todoList),
  })
  .actions((self) => ({
    addTodo(val: string) {
      self.tododata.push({
        name: val,
      });
    },
    removeTodo(val: string) {
      // const data = JSON.stringify(self.tododata);
      //  data.filter((item) => item.id !== val)
      self.tododata.splice(
        self.tododata.findIndex((a) => a.name === val),
        1
      );
    },
  }));


export const TODO = todo.create({});

// onSnapshot(TODO, (snapshot) => {
//   localStorage.setItem('todoStoreSnapshot', JSON.stringify(snapshot));
// });

// const savedSnapshot = localStorage.getItem('todoStoreSnapshot');
// if (savedSnapshot) {
//   const snapshot = JSON.parse(savedSnapshot);
//   TODO.replace(snapshot);
// }
