import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
    return (
        <div className="this">
            <div className="mrgn">
                <Link to='/home'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/create'>CreateTodo</Link>
                <Link to='/print'>PrintTodo</Link>
            </div>
        </div>
    )
};