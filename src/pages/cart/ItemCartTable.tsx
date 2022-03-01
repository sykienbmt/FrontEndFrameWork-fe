import React, { useContext, useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { CartContext } from '../../contexts/CartContext';
import {ItemCart} from '../../models/OrderProduct'

interface Props{
    itemCart:ItemCart
}

type State={
    quantity:number
}

export default function ItemCartTable(props:Props) {
    const cartContext =  useContext(CartContext)

    const [state,setState] = useState<State>({quantity:props.itemCart.quantity})



    const onCLickPlus =()=>{
        setState({...state,quantity:state.quantity+1})
        cartContext.changeQuantity(props.itemCart.idProduct,state.quantity+1,props.itemCart.price)
    }

    const onCLickMinus =()=>{
        if(state.quantity>1){
            setState({...state,quantity:state.quantity-1})
            cartContext.changeQuantity(props.itemCart.idProduct,state.quantity-1,props.itemCart.price)
        }
    }

    return  <tr className="table-row-content">
                <td className="table-column">
                    <img src={props.itemCart.images[0].image} alt="" />
                </td>
                <td className="table-column-1">
                    <div className="item-cart-render">
                        <div className="item-cart-info">
                            <p className="item-cart-name">Name: {props.itemCart.nameProductLine}</p>
                            <small style={{display:'block'}} className="item-cart-price">Weight: {props.itemCart.weight} </small>
                            <small style={{display:'block'}} className="item-cart-price">Price:  $ {props.itemCart.price}</small>
                            <p className="item-cart-price small-table-end">Color: <span className='color-table-cart' style={{background:`${props.itemCart.color}`}}></span></p>
                        </div>
                    </div>
                </td>
                
                <td className='table-column-2'>
                    <div className='box-change-quantity'>
                        <button onClick={()=>onCLickMinus()}><i className="fas fa-minus"></i></button>

                        <input type="number" min={1} id="" value={state.quantity} onChange={e=>""}/>

                        <button onClick={()=>onCLickPlus()}><i className="fas fa-plus"></i></button>
                    </div>
                </td>
                <td className='table-column-3'>  $ {props.itemCart.quantity*props.itemCart.price}</td>
                <td className='table-column-4'> <RiDeleteBin6Line  fontSize={'22px'}  onClick={()=>cartContext.deleteItemCarts(props.itemCart.idProduct)}/> </td>
            </tr>
}
