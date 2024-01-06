import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { AboutEverthing } from './About';
import { Header } from "./../Component/Header";
import CreateTodo from "./Todo/CreateTodo"
import { TodoList } from "./Todo/TodoList"
import { observer } from 'mobx-react-lite';

const Home = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/about' element={<AboutEverthing />} />
                <Route path='/create' element={<CreateTodo />} />
                <Route path='/print' element={<TodoList />} />
            </Routes>
        </>
    )
}

export default observer(Home);
