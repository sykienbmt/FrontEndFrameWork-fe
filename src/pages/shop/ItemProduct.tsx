import React, { useContext, useEffect, useState } from 'react'
import { ProductLine } from '../../models/ProductLine'
import { FaStar,FaRegEye,FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ProductOption from '../productDetail/ProductOption';
import { WishListContext } from '../../contexts/WishListContext';
const { v4: uuid } = require("uuid");

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    bgcolor: 'background.paper',
    border: '2px solid #76A822',
    boxShadow: 24,
    p: 4,
};

interface Props{
    productLine:ProductLine
}

type State={
    isOpenModal:boolean,
    isInWishList:boolean
}


export default function ItemProduct(props:Props) {
    const wishListContext=useContext(WishListContext)

    const [state,setState] = useState<State>({isOpenModal:false,isInWishList:false})
    
    const handleOpen = () => setState({...state,isOpenModal:true});
    const handleClose = () => setState({...state,isOpenModal:false});

    useEffect(()=>{
        if(wishListContext.list.length>0){
            let index = wishListContext.list.findIndex(i=>i.idProductLine===props.productLine.idProductLine)
            if(index>=0){
                setState(prev=>({...prev,isInWishList:true}))
            }
        }
    },[wishListContext.list])


    const onClickLike =()=>{
        setState(prev=>({...prev,isInWishList:!state.isInWishList}))
        wishListContext.addToWishList(props.productLine.idProductLine)
    }

    return (
        <div className="product-line-transition">
            <div className='product-line-item-container'>
                <div className='product-line-svg1'>
                    <FaHeart style={state.isInWishList? {color:"green"} : {color:"#E1ECCB"} } 
                        onClick={onClickLike}
                    />
                </div>
                <div className='product-line-svg2'>
                <Link to={`/product/${props.productLine.idProductLine}`} >
                    <FaRegEye />

                </Link>
                </div>
                <div className="product-line-item">
                    <div className="product-line-image">
                        <img src={props.productLine.pictures[0].image} alt="" />
                    </div>
                    <h3 className=''>{props.productLine.nameProduct}</h3>
                    <p>
                        <span className='product-line-price-show'>
                        ${props.productLine.products[0].price} {props.productLine.products.length>1? `- ${props.productLine.products[props.productLine.products.length-1].price}`: ""}
                        </span>
                    </p>
                    <div className="product-line-star">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                    </div>
                </div>
                <Modal
                    open={state.isOpenModal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <ProductOption productLine={props.productLine} key={uuid()}/>
                    </Box>
                </Modal>
                <button className='add-to-cart-shop btn-green' onClick={handleOpen}>Add to Cart <i className="fas fa-arrow-right"></i></button>
            </div>
        </div>
    )
}
