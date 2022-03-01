import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { categoryController } from "../controllers/CategoryController";
import { productController } from "../controllers/ProductController";
import { wishlistController } from "../controllers/WishListController";
import { Category } from "../models/Category";
import { ProductLine } from "../models/ProductLine";
import { UserContext } from "./UserContext";


interface Props{
    children: ReactNode
}

interface WishListFunction{
    list:ProductLine[],
    addToWishList:(idProductLine:string)=>void
}

const defaultWLFunction:WishListFunction={
    list:[],
    addToWishList:()=>{}
}

export const WishListContext=createContext<WishListFunction>(defaultWLFunction)

const WishListContextProvider = ({children}:Props)=>{
    const userContext = useContext(UserContext)
    const [state,setState]= useState<WishListFunction>(defaultWLFunction)

    useEffect(() => {
        if(userContext.user.idUser!==""){
            wishlistController.list(userContext.user.idUser,1,100).then(res=>{
                setState(prev=>({...prev,list:res}))
            })
        }
    }, [userContext.user.idUser])


    const addToWishList = (idProductLine:string)=>{
        let index = state.list.findIndex(i=>i.idProductLine===idProductLine)
        if(index>=0){
            wishlistController.delete(userContext.user.idUser,idProductLine).then(res=>{
                setState(prev=>({...prev,list:res}))
            })
        }else{
            wishlistController.add(userContext.user.idUser,idProductLine).then(res=>{
                setState(prev=>({...prev,list:res}))
            })
        }
    }

    return(
        <WishListContext.Provider value={{list:state.list,addToWishList}}>
            {children}
        </WishListContext.Provider>
    )

}

export default WishListContextProvider