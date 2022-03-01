import React, { useContext, useEffect, useState } from 'react';
import { WishListContext } from '../../contexts/WishListContext';
import { ProductLine } from '../../models/ProductLine';
import ItemProduct from '../shop/ItemProduct';
import './WishList.css'


export default function WishList() {

    const wishListContext = useContext(WishListContext)

  return <div className='wish-list-container'>
            <section className="wish-list-content">
                <h1 style={{marginTop:"25px"}}>Wish List</h1>
                <div className="wish-list">
                    {wishListContext.list.length>0 && wishListContext.list.map(item=>{
                        return <ItemProduct key={item.idProductLine} productLine={item}  />
                    })}
                </div>
            </section>
        </div>;
}
