import React, { useState } from 'react'

const CreateTodo = props => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    function handleSubmit(e) {
        if (title==='' & description===""){
            alert("Please enter something")
        }
        else{
            alert("Data is submitted")
            console.log(title, description);
            e.preventDefault();
            // to save this task in the list
            props.saveTask(title, description)
            // to set the value null
            setTitle('');
            setDescription('');
        }
    }
    return (
        <div className='lnrgradient' >
            <div className='App App-header lnrgradient'>
            <form>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" id='title' name="title" value={title}
                        onChange={(e) => {setTitle(e.target.value)}} className="form-control" />
                </div><br />

                <div>
                    <label htmlFor="desc">Description</label>
                    <textarea name="description" value={description} id="desc"
                        onChange={(e) => setDescription(e.target.value)} rows="2" className="form-control" />
                </div><br />

                <div>
                    <button onClick={handleSubmit} className='btn btn-outline-primary text-dark'>Add your title</button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default CreateTodo;