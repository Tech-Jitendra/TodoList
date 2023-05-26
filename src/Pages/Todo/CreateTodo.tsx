import React, { useState, useEffect } from 'react'
import { useStores } from '../../models';

const CreateTodo = props => {
    const store = useStores()
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState("");


    const addList = () => {
        if (title === '' && description === "") {
            alert("Please enter something")
        }
        else {
            store.todosStore.createTodo(title).then((res) => {
                if (res.ok) {
                    alert("todos addeds")
                }
            })
        }
        setTitle("");
        setDescription("");
    };

    return (
        <div className='lnrgradient' >
            <div className='App App-header lnrgradient'>
                <form>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input type="text" id='title' name="title" value={title}
                            onChange={(e) => { setTitle(e.target.value) }} className="form-control" />
                    </div><br />

                    <div>
                        <label htmlFor="desc">Description</label>
                        <textarea name="description" value={description} id="desc"
                            onChange={(e) => setDescription(e.target.value)} rows={2} className="form-control" />
                    </div><br />

                    <div>
                        <button onClick={addList} className='btn btn-outline-primary text-dark'>Add your title</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateTodo;