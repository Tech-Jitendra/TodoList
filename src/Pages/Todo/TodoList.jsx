import React from 'react'
import PrintTodos from './PrintTodos';
import { CardComponent } from "./../../Component/Card"

export const TodoList = (props) => {
    return (
        <div className='lnrgradient'>
            <div className="">
                {props.todos.length === 0 ? "No Todos to display" : props.todos.map((todo) => {
                    return (
                        <CardComponent
                            title={todo.name}
                            description={todo.description}
                        />
                    )
                })}
            </div>
        </div>
    )
}
