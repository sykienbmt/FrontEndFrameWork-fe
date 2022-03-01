import React from 'react';
import { ItemCart } from '../../models/OrderProduct';
import { Product } from '../../models/Product';


interface Props{
    item:ItemCart
}


export default function ItemPayment(props:Props) {

  return <div className="payment-item-order">
            <div className='payment-item-order-img'>
                <img src={props.item.images[0].image} alt="" />
                <div className="item-quantity-payment">
                    {props.item.quantity}
                </div>
                <div className="color-table-cart color-item-payment" style={{background:`${props.item.color}`}}></div>
            </div>
            <p key ={props.item.idProduct} className=''>
                    <span>{props.item.nameProductLine} ({props.item.weight}) </span> 
                    <span>$ {props.item.quantity*props.item.price}</span>
            </p>
        </div>
}
