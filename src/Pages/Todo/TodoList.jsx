import React from 'react'
import PrintTodos from './PrintTodos';

export const TodoList = (props) => {
    return (
        <div className='lnrgradient'>
            <div className="">
                {props.todos.length === 0 ? "No Todos to display" : props.todos.map((todo) => {
                    return (<PrintTodos todo={todo} />)
                })}
            </div>
        </div>
    )
}
