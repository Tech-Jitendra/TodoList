import './App.css';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Home } from './Pages/Home';
import CreateTodo from './Pages/Todo/CreateTodo';
import { Header } from './Component/Header';
import { TodoList } from './Pages/Todo/TodoList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RootStoreType, RootStoreProvider, setupRootStore } from "./models";

// import { BrowserRouter as Router } from 'react-router-dom';

import { About } from './Pages/About';
import { NativeBaseProvider, theme } from 'native-base';
const config = {};
function App() {
  const [todos, setTodos] = useState([])

  // func to save task (this data is coming from createTodo)
  function saveTask(title, description) {
    let id;
    if (todos.length === 0) {
      id = 0
    }
    else { id = todos[todos.length - 1].id + 1; }

    let taskObj = {
      id: id,
      name: title,
      description: description
    }
    setTodos([...todos, taskObj])
    console.log(taskObj)
  }
  // let title = confirm('this')
  const [rootStore, setRootStore] = useState < RootStoreType | undefined > (undefined);

  useEffect(() => {
    (async () => {
      setupRootStore().then(setRootStore);
    })();
  }, []);
  return (
    <>
      <RootStoreProvider value={rootStore}>
        <NativeBaseProvider theme={theme} config={config}>
          <Router>
            <Header />
            <Routes>
              <Route path='/home' element={< Home />} />
              <Route path='/about' element={< About />} />
              <Route path='/create' element={<CreateTodo saveTask={saveTask} />} />
              <Route path='/print' element={<TodoList todos={todos} />} />
            </Routes>
          </Router>
        </NativeBaseProvider>
      </RootStoreProvider>
    </>
  );
}
export default App;
