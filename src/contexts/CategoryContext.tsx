import React, { createContext, ReactNode, useEffect, useState } from "react";
import { categoryController } from "../controllers/CategoryController";
import { Category } from "../models/Category";


interface Props{
    children: ReactNode
}

interface CategoryFunction{
    category:Category,
    categories:Category[]
}

const defaultCategoryFunction:CategoryFunction={
    category:{idCategory:"",desc:"",name:""},
    categories:[]
}

export const CategoryContext=createContext<CategoryFunction>(defaultCategoryFunction)

const CategoryContextProvider = ({children}:Props)=>{
    const [stateCategory,setStateCategory]= useState<CategoryFunction>(defaultCategoryFunction)

    useEffect(() => {
        categoryController.list().then(res=>{
            setStateCategory({...stateCategory,categories:res})
        })
    }, [])

    return(
        <CategoryContext.Provider value={{category:stateCategory.category,categories:stateCategory.categories}}>
            {children}
        </CategoryContext.Provider>
    )

}

export default CategoryContextProvider