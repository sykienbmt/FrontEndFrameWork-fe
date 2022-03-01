import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { authAxios } from "../controllers";
import { cartController } from "../controllers/CartController";
import { orderController } from "../controllers/OrderController";
import { userController } from "../controllers/UserController";
import { Order } from "../models/Order";
import { ItemCart, OrderProduct } from "../models/OrderProduct";
import { User } from "../models/User";
import { UserContext } from "./UserContext";


interface CartContextProps{
    children: ReactNode
}

type CartFunction={
    itemCarts:ItemCart[],
    idOrder:string,
    cartCount:number,
    totalMoney:number,
    changeQuantity:(idProduct:string,quantityChange:number,price:number)=>void,
    deleteItemCarts:(id:string)=>void,
    addToCart:(idProduct:string,quantity:number,price:number)=>void,
    checkout:(user:User,payment:string)=>void
    // setCartCount:(number:number)=>void
}

const cartDefaultValue={
    itemCarts:[],
    idOrder:"",
    cartCount:0,
    totalMoney:0,
    changeQuantity:()=>{},
    deleteItemCarts:()=>{},
    addToCart:()=>{},
    checkout:()=>{}
    // setCartCount:()=>{}
}

export const CartContext = createContext<CartFunction>(cartDefaultValue)


const CartContextProvider = ({children}:CartContextProps)=>{
    const userContext = useContext(UserContext)

    const [state,setState]=useState<CartFunction>(cartDefaultValue)

    useEffect(()=>{
        if(userContext.user.idUser!==""){
            cartController.getCarts(userContext.user.idUser,state.idOrder).then(res=>{
                setState({...state,
                    itemCarts:res.itemCarts,
                    cartCount:res.count,
                    totalMoney:res.total,
                    idOrder:res.idOrder
                })
            })
        }
    },[userContext.user.idUser])

    
    const changeQuantity=(idProduct:string,quantityChange:number,price:number)=>{
        const orderProduct:OrderProduct={idOrder:state.idOrder,idProduct:idProduct,quantity:quantityChange,price:price}
        cartController.update(userContext.user.idUser,orderProduct).then(res=>{
            setState({...state,
                itemCarts:res.itemCarts,
                cartCount:res.count,
                totalMoney:res.total,
                idOrder:res.idOrder
            })
        })
    }

    const deleteItemCarts=(idProduct:string)=>{
        cartController.delete(userContext.user.idUser,idProduct,state.idOrder).then(res=>{
            setState({...state,
                itemCarts:res.itemCarts,
                cartCount:res.count,  
                totalMoney:res.total,
                idOrder:res.idOrder
            })
        })
        userContext.setMess("Remove item successfully !")
    }

    const addToCart=(idProduct:string,quantity:number,price:number)=>{
        const orderProduct:OrderProduct={idOrder:state.idOrder,idProduct:idProduct,quantity:quantity,price:price}
        cartController.add(userContext.user.idUser,orderProduct).then(res=>{
            setState({...state,
                itemCarts:res.itemCarts,
                cartCount:res.count,  
                totalMoney:res.total,
                idOrder:res.idOrder
            })
        })
        userContext.setMess("Add to cart successfully !")
    }

    const checkout=(user:User,payment:string)=>{
        cartController.completeOrder(user,payment,state.itemCarts).then(res=>{
            setState({...state,
                itemCarts:res.itemCarts,
                cartCount:res.count,
                totalMoney:res.total,
                idOrder:res.idOrder
            })
            
        })
        userContext.setMess("Checkout successfully !")
    } 


    const data:CartFunction={
        itemCarts:state.itemCarts,
        idOrder:state.idOrder,
        cartCount:state.cartCount,
        totalMoney:state.totalMoney,
        changeQuantity,
        deleteItemCarts,
        addToCart,
        checkout

        // setCartCount
    }

    return(
        <CartContext.Provider value={data}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider