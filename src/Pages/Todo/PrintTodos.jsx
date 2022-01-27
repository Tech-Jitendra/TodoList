import React from 'react'
// import '../../App.css';

const PrintTodos = ({ todo }) => {
    return (
            <div className='wraping txt-center'>
                <div className="card bg-light text-dark card-witdth">
                    <div className="card-body">
                        <h4 className="card-title">{todo.name}</h4>
                        <hr />
                        <p className="card-text">{todo.description}
                        </p>
                        <button className=" btn btn-danger" style={{float:"right"}}>Delete</button>
                    </div>
                </div>
            </div>
    )
}
export default PrintTodos