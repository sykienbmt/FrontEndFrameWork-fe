import React, { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import './CartTable.css'
import ItemCartTable from './ItemCartTable';



export default function CartItemForm() {

    const cartContext = useContext(CartContext)

    

    return <div className="table-item-cart">
            <table className="show-list fade">
                <tbody>
                    <tr className="table-title">
                        <th><p>Image</p></th>
                        <th><p>Product info</p></th>
                        <th><p>Quantity</p></th>
                        <th><p>Subtotal</p></th>
                        <th><p>Remove</p></th>
                    </tr>
                    
                    {cartContext.itemCarts.length>0 && cartContext.itemCarts.map(item=><ItemCartTable key={item.idProduct}
                        itemCart={item} 
                        // onChangeQuantity={onChangeQuantity}
                        // onClickDeleteItemCarts={onClickDeleteItemCarts}
                    />)}
                    
                    <tr className="table-row">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className='table-column-2'>Total</td>
                        <td className='table-column-3'><span>$ {cartContext.totalMoney}</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
}
