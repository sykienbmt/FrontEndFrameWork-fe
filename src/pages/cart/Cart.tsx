import React, { useContext, useState } from 'react'
import AddressSection from '../../components/AddressSection'
import { CartContext } from '../../contexts/CartContext'
import './Cart.css'
import { BsFillCartXFill } from "react-icons/bs";
import CartItemForm from './CartItemForm'
import CheckOutForm from './CheckOutForm'


type State={
    isShowPayment:boolean
}

export default function Cart() {
    const [state,setState]=useState<State>({isShowPayment:false})
    const cartContext =  useContext(CartContext)
    
    return (
        <>
            <AddressSection page='CART' home='Home' current='Your Cart'/>
            <div className='cart-page-container' style={{background:'white'}}>
                {cartContext.cartCount>0? <div className="cart-page-content">
                    <div className="process-container">

                    </div>
                    <div className="cart-content-container">
                        {state.isShowPayment? <CheckOutForm/>: <CartItemForm />}
                    </div>

                    <div className="button-change-payment">
                        <button className='btn-green btn-to-shop' 
                            onClick={()=>setState({...state,isShowPayment:!state.isShowPayment})}
                            >
                            <i className="fas fa-arrow-left"></i>{state.isShowPayment===true? `Back to cart` : `Back to Shop ` } 
                        </button>
                        <button className={state.isShowPayment===true? 'display-none': 'change-payment btn-green'} onClick={()=>setState({...state,isShowPayment:!state.isShowPayment})}>
                            Checkout
                            <i className="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div> : 
                <div className='cart-null-container'>
                    <BsFillCartXFill style={{fontSize:"120px"}}/>
                    <h1 style={{textAlign:"center"}}>Your cart is Empty !</h1>
                </div>
                }
                
            </div>
        </>
    )
}
