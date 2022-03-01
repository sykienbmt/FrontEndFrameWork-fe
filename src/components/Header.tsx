import './Header.css'
import React, { useContext, useState } from 'react'
import {  FaCartArrowDown,FaMapMarkedAlt, FaPhoneAlt, FaUser,FaHeart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { CartContext } from '../contexts/CartContext';
import { ProductLineContext } from '../contexts/ProductContext';
import { MdClear } from "react-icons/md";
import { WishListContext } from '../contexts/WishListContext';

type State={
  search:string
}

export default function Header(){
  const userContext = useContext(UserContext)
  const cartContext = useContext(CartContext)
  const productContext = useContext(ProductLineContext)
  const wishlistContext = useContext(WishListContext)
  const [state,setState] = useState<State>({search:""})

  const navigate = useNavigate()

  const onClickLogout = ()=>{
    localStorage.removeItem('accessToken')
    navigate('/login');
  }

  const searchInHeaders =()=>{
    productContext.changeSearch(state.search)
    navigate('/product');
  }

  const categoryInHeaders = (e:any)=>{
    productContext.changeCategory(e)
    navigate('/product');
  }

  return (
    <div id='header-container'>
      <div className="header-top">
        <span>Welcome  <span style={{color:'orange'}}>{userContext.user.username}</span>  to our Organic store Organico!</span>
        <div className="header-top-right">
          <ul className='header-location'>
            <li>
              <FaMapMarkedAlt className='icon-header-top'/>
              <p>Store location</p>
            </li>
            <li>
              <FaPhoneAlt className='icon-header-top'/>
              (+84)-963740255
            </li>
          </ul>
        </div>
      </div>
      <div className="nav-menu-container">
        <nav className="header-bottom">
          <div className="nav-menu">
            <ul className="menu-lv1">
              <li className="item-lv1"><Link to={''}><span>Home</span></Link></li>
              <li className="item-lv1"><Link to={'product'}><span>Shop </span></Link><i className="fas fa-angle-down"></i>
                <ul className="menu-lv2">
                  <li className="item-lv2" onClick={()=>categoryInHeaders("1")}  >Vegetable</li>
                  <li className="item-lv2" onClick={()=>categoryInHeaders("2")} >Fresh Fruits</li>
                  <li className="item-lv2" onClick={()=>categoryInHeaders("3")} >Nature</li>
                  <li className="item-lv2" onClick={()=>categoryInHeaders("4")}  >Nuts & dried food</li>
                  <li className="item-lv2" onClick={()=>categoryInHeaders("5")}  >Grocery & Frozen</li>
                  <li className="item-lv2" onClick={()=>categoryInHeaders("6")}  >Food</li>
                  <li className="item-lv2" onClick={()=>categoryInHeaders("7")} >Spices</li>
                </ul>
              </li>
              <li className="item-lv1"><span>About Us</span></li>
              <li className="item-lv1"><span>News</span> </li>
              <li className="item-lv1"><span>Contact</span></li>
            </ul>
          </div>
          <div></div>
          <div className="nav-icon">
            <img src="https://demo.casethemes.net/organio/wp-content/themes/orgio/assets/images/logo-mobile.png" alt="" />
          </div>
          <div></div>
          <div className="nav-menu-right">
            <div className="search-box">
              <div className="input-button">
                <input 
                  value={state.search} 
                  onChange={e=>setState(prev=>({...prev,search:e.target.value}))} 
                  type="text" 
                  placeholder="Search here ..." 
                />
                {state.search.length>0? 
                <MdClear className='svg-search-user' onClick={()=>{
                  setState(prev=>({...prev,search:""}));
                  productContext.changeSearch("")
                }} /> 
                :""}
                <button onClick={searchInHeaders}>Search</button>
              </div>
            </div>
            <div className="user-info">
              <Link to='wishlist'>
                <div className="cart-icon cart-icon-left">
                  <FaHeart className="cart-icon-child"/>
                  <div className="number-in-cart">
                    {wishlistContext.list.length>0 ? wishlistContext.list.length : "0" }
                  </div>
                </div>
              </Link>
              <Link to='cart'>
                <div className="cart-icon cart-icon-left">
                  <FaCartArrowDown className="cart-icon-child"/>
                  <div className="number-in-cart">
                    {cartContext.cartCount}
                  </div>
                </div>
              </Link>
              <div className="cart-icon user-icon-right">
                <FaUser className="cart-icon-child"/>
                <div className="menu-user-container">
                  <ul className="menu-user-content">
                    {userContext.user.permission==='admin'?
                    <Link to={'/admin'}><li className="menu-user">Admin Page</li></Link>
                    : <Link to={'order'}><li className="menu-user">Your Order</li></Link>
                    }
                    <li className="menu-user" onClick={()=>onClickLogout()}>Logout</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      
    </div>
  )
}

