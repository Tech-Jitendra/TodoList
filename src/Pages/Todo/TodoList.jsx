import React from 'react'
import { CardComponent } from "./../../Component/Card"
import { useStores } from '../../models';
import { useEffect } from 'react';
import { useState } from 'react';

export const TodoList = () => {
    const [data, setData] = useState([])
    const store = useStores()
    useEffect(() => {
        setData(store.todosStore.Todos)
    }, [])
    return (
        <div className='lnrgradient'>
            <div className="mx-5 d-flex gap-5 flex-wrap">
                {data.length === 0 ? "No Todos to display" : data.map((todo) => {
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
