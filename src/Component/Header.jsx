import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
    return (
        <nav
            className="navbar 
        navbar-expand-lg 
        bg-body-tertiary 
        bg-primary shadow 
        container my-5
        rounded position-sticky
        ">
            <div className="container-fluid">
                <a className="navbar-brand text-light" href="#">Navbar</a>
                <button className="navbar-toggler"
                    type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className='nav-link active' to='/home'>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to='/about'>About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/create'>CreateTodo</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/print'>PrintTodo</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
};