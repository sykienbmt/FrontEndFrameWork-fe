import { Button, Fab } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { FaStar, FaShoppingCart } from 'react-icons/fa'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import { FaHeart } from "react-icons/fa";
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import { weightController } from '../../controllers/WeightController'
import { ProductLine } from '../../models/ProductLine'
import { Weight } from '../../models/Weight'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './ProductDetail.css'
import { Carousel } from 'react-responsive-carousel'
import { CartContext } from '../../contexts/CartContext';
import { Product } from '../../models/Product';
import { WishListContext } from '../../contexts/WishListContext';
const { v4: uuid } = require('uuid');



type State = {
   productLine: ProductLine,
   idWeight: string,
   weights: Weight[],
   quantity: number,
   tabValue: number,
   product: Product,
   idColor: string,
   listColor: string[],
   isLike: boolean
}

interface Props {
   productLine: ProductLine
}

export default function ProductOption(props: Props) {
   const cartContext = useContext(CartContext)
   const wishListContext = useContext(WishListContext)

   const [state, setState] = useState<State>({
      productLine: props.productLine,
      idWeight: "0",
      weights: [],
      quantity: 1,
      tabValue: 0,
      product: {
         idProduct: "",
         idProductLine: "",
         idWeight: "",
         idColor: "",
         price: 0
      },
      idColor: "",
      listColor: [],
      isLike: false
   })

   useEffect(() => {
      weightController.list().then(res => {
         setState(prev => ({ ...prev, weights: res }))
      })
      //setColor
      let listColor: string[] = []
      state.productLine.products.map(a => listColor.push(a.idColor))
      listColor = Array.from(new Set(listColor))
      setState(prev => ({ ...prev, listColor: listColor, idColor: listColor[0], product: state.productLine.products[0] }))
   }, [])

   useEffect(() => {
      if (wishListContext.list.length > 0) {
         let index = wishListContext.list.findIndex(i => i.idProductLine === props.productLine.idProductLine)
         if (index >= 0) {
            setState(prev => ({ ...prev, isLike: true }))
         }
      }
   }, [wishListContext.list])

   const findNameCategory = (idWeight: string) => {
      let name: string = ""
      if (state.weights.length > 0) {
         const index = state.weights.findIndex(a => a.idWeight === idWeight)
         if (state.weights[index]) {
            name = state.weights[index].name
         }
      }
      return name
   }

   const findPrice = (idProduct: string) => {
      let price: number = 0
      const index = state.productLine.products.findIndex(a => a.idProduct === idProduct)

      if (state.productLine.products[index]) {
         price = state.productLine.products[index].price
      }
      return price
   }

   const onClickPlus = () => {
      setState({ ...state, quantity: state.quantity + 1 })
   }

   const onCLickMinus = () => {
      if (state.quantity > 1) {
         setState({ ...state, quantity: state.quantity - 1 })
      }
   }


   const onClickAddToCart = () => {

      if (state.product.idProduct === '') {
         alert(`pls choose `)
      } else {
         cartContext.addToCart(state.product.idProduct, state.quantity, state.product.price)
      }
   }

   const onClickLike = () => {
      setState(prev => ({ ...prev, isLike: !state.isLike }))
      wishListContext.addToWishList(props.productLine.idProductLine)
   }


   return (
      <div className="product-detail-page">

         {/* Product Image slide */}
         <div className="product-left-container padding-container">
            <div className="detail-image-show">
               <Carousel showStatus={false}>
                  {state.productLine.pictures.map(item => {
                     return <div key={item.idPicture}>
                        <img src={item.image} />
                     </div>
                  })}
               </Carousel>
            </div>
         </div>
         <div className="product-right-container padding-container">
            <div className="detail-right-content">
               <h1>{state.productLine.nameProduct}</h1>
               <Fab aria-label="like"
                  id='add-to-wishlist'
                  sx={state.isLike ? { border: "2px solid orange", boxShadow: "0 0 10px 3px #fadb86" } : { border: "2px solid #a6e429" }}
                  onClick={onClickLike}
               >
                  <FaHeart style={state.isLike ? { fontSize: "24px", color: "orange" } : { fontSize: "24px", color: "#a6e429" }} />
               </Fab>
               <div className="product-line-star">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <p> (2 customer reviews)</p>

               </div>
               {/* Price-show */}
               <h2> $ {state.productLine.products[0].price} {state.productLine.products.length > 1 ? ` - $ ${state.productLine.products[state.productLine.products.length - 1].price}` : ""} </h2>

               {/* List color show */}
               <p className="detail-desc">{state.productLine.desc}</p>
               <h3>Color: </h3>
               <div className='list-color-container'>
                  {state.listColor.length > 0 && state.listColor.map(item => {
                     return (
                        <div className={item === state.idColor ? 'choose-color-container-choose' : 'choose-color-container'} key={uuid()}
                           onClick={() => setState({ ...state, idColor: item })}
                        >
                           <div className="choose-color-inside" style={{ background: `${item}` }} >
                           </div>
                        </div>
                     )
                  })}
               </div>

               {/* List Weight show */}
               <h3>Weight: {state.weights.length > 0 ? `${findNameCategory(state.idWeight)}` : ""} </h3>
               <div className="group-button-detail">
                  {state.productLine.products.length > 0 ? state.productLine.products.map(item => {
                     if (item.idColor === state.idColor) {
                        return <button key={item.idProduct}
                           className={state.product.idProduct === item.idProduct ? "btn-price-active" : "btn-price-none"}
                           onClick={() => setState({ ...state, idWeight: item.idWeight, product: item })}
                        >
                           {state.weights.length > 0 ? `${findNameCategory(item.idWeight)}` : ""}
                        </button>
                     }
                  }) : ""}
               </div>
               {/* Price total */}
               <h2 className='price-now-detail'>$ {findPrice(state.product.idProduct)}</h2>

               {/* Quantity select */}
               <div className="change-quantity-container">
                  <div className="change-quantity-detail">
                     <AiOutlineMinusCircle onClick={onCLickMinus} />
                     <input type="number" min={1} value={state.quantity}
                        onChange={e => setState({ ...state, quantity: Number(e.target.value) })}
                        className="select-quantity-detail" />
                     <AiOutlinePlusCircle onClick={onClickPlus} />
                  </div>
                  <Button variant="contained" sx={{
                     background: "#76A822", size: "large"
                     , height: "45px"
                     , ':hover': {
                        bgcolor: '#EFB343',
                        color: 'white',
                     }
                  }}
                     startIcon={<FaShoppingCart />}
                     onClick={() => onClickAddToCart()}
                  >
                     Add to cart
                  </Button>
               </div>

               <div className="wish-list-button">
                  <Button variant="contained" sx={{
                     background: "white", size: "large"
                     , height: "45px"
                     , color: "#76A712"
                     , border: "2px solid #76A712"
                     , borderRadius: "10px"
                     , boxShadow: "none"
                     , ':hover': {
                        bgcolor: '#76A712',
                        color: 'white',

                     }
                  }} startIcon={<CompareArrowsOutlinedIcon />}>
                     Compare to
                  </Button>
               </div>
            </div>
         </div>
      </div>
   )
}
