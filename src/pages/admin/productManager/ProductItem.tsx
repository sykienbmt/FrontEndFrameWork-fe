import React, { useState } from 'react'
import { ProductLine } from '../../../models/ProductLine'
import { AiFillEdit } from "react-icons/ai";
import { FcDeleteDatabase } from "react-icons/fc";

interface Props{
    productLine:ProductLine,
    setProductLineEdit:(productLine:ProductLine)=>void,
    deleteProductLine:(idProductLine:string)=>void
}

type State={
    productLine:ProductLine
}
export default function ProductItem(props:Props) {

    const [state,setState]=useState<State>({productLine:props.productLine})
    
    return (
        <>
         <div className="product-item-show" style={{position:"relative"}}>

            <AiFillEdit onClick={()=>props.setProductLineEdit(props.productLine)} className='icon-admin-edit'/>

            <FcDeleteDatabase onClick={()=>props.deleteProductLine(props.productLine.idProductLine)} className='icon-admin-delete'/>

            <div className="product-image-manager">
                <img src={props.productLine.pictures[0].image} alt="" style={{width:"150px",height:"150px"}} />
            </div>
            <h3 className="product-name-manager">{props.productLine.nameProduct}</h3>

            <div className="product-price-container-manager">
                <h4 className="product-price-manager"> ${props.productLine.products[0].price} {props.productLine.products.length>1 ? `- $${props.productLine.products[props.productLine.products.length-1].price}` : ""}</h4>
            </div>
        </div>
        </>
    )
       
}
