import './AdminMenu.css'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AdminMenu() {
    const navigate =  useNavigate()

    const logOut = ()=>{
        localStorage.removeItem('accessToken');
        navigate('/login')
    }
    return (
        <nav className='nav-admin-container'>
            <div className="menu-info-admin">
                <img src="https://cdn-icons-png.flaticon.com/512/2329/2329865.png" alt="" />
                <h3>Organico</h3>
            </div>

            <ul className="menu-admin-lv1">
                <li className="menu-item-lv1">Home</li>
                <li className="menu-item-lv1"><Link to=''>Product</Link></li>
                <li className="menu-item-lv1"><Link to='category'>Category</Link></li>
                <li className="menu-item-lv1"><Link to='orders'>Order</Link></li>
                <li className="menu-item-lv1"><Link to='users'>Users</Link></li>
                <li className="menu-item-lv1"><Link to='/'>Back to Shop</Link></li>
                <li className="menu-item-lv1" onClick={logOut}>Logout</li>
            </ul>
        </nav>
    )
}
