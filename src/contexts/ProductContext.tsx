import React, { createContext, ReactNode, useEffect, useRef, useState } from 'react'
import { productController } from '../controllers/ProductController'
import { Pagination } from '../models/Pagination'
import { ProductLine } from '../models/ProductLine'

interface Props{
    children: ReactNode
}

interface ProductLineFunction{
    productLine:ProductLine,
    productLines:ProductLine[],
    pagination: Pagination,
    totalPage:number,
    changePage :({ selected }: any) => void
    changeSelectOption:(select:string) => void
    changeSearch:(name:string)=>void,
    changeCategory:(idCategory:string)=>void,
    changeRange:(range:number[])=>void,
    changePerPage:(perPage:number)=>void
}

const defaultProductLineFunction:ProductLineFunction={
    productLine: {
      idProductLine: "",
      nameProduct: "",
      idCategory: "",
      sell: 0,
      desc: "",
      products: [],
      pictures: []
    },
    productLines: [],
    pagination: { page: 1, perPage: 9, search: "", idCategory: "", select: "",from:0,to:1000 },
    totalPage:1,
    changePage :() => {},
    changeSelectOption:()=>{},
    changeSearch:()=>{},
    changeCategory:()=>{},
    changeRange:()=>{},
    changePerPage:()=>{}
}

export const ProductLineContext=createContext<ProductLineFunction>(defaultProductLineFunction)

const ProductLineContextProvider = ({children}:Props)=>{
    const [state,setState]= useState<ProductLineFunction>(defaultProductLineFunction)
    let first = useRef(true);

    useEffect(() => {
        // if(first.current){
        //     first.current=false
        //     productController.list(state.pagination).then(res => {
        //         setState({ ...state, totalPage: res.totalPage, productLines: res.productLines })
        //     })
        // }else{
        //     productController.list(state.pagination).then(res => {
        //         setState({ ...state, totalPage: res.totalPage, productLines: res.productLines })
        //     })
        // }
        productController.list(state.pagination).then(res => {
            setState({ ...state, totalPage: res.totalPage, productLines: res.productLines })
        })

    }, [state.pagination])

    const changeSelectOption = (select:string)=>{
        setState(prev=>({...prev,pagination:({...prev.pagination,select:select})}))
    }

    const changeSearch=(name:string)=>{ 
        setState(prev=>({...prev,pagination:({...prev.pagination,search:name})}))
    }

    const changeCategory=(category:string)=>{
        setState(prev=>({...prev,pagination:({...prev.pagination,idCategory:category})}))
    }
    
    const changeRange=(range:number[])=>{
        setState(prev=>({...prev,pagination:({...prev.pagination,from:range[0],to:range[1]})}))
    }

    const changePage = ({ selected }: any) => {
        setState({ ...state, pagination: { ...state.pagination, page: selected + 1 } })
    }

    const changePerPage=(number:number)=>{
        setState({ ...state, pagination: { ...state.pagination, perPage: number } })
    }


    const data:ProductLineFunction={
        productLine:state.productLine,
        productLines:state.productLines,
        pagination:state.pagination,
        totalPage:state.totalPage,
        changePage,
        changeSelectOption,
        changeSearch,
        changeCategory,
        changeRange,
        changePerPage
    }

    return(
        <ProductLineContext.Provider value={data}>
            {children}
        </ProductLineContext.Provider>
    )

}

export default ProductLineContextProvider

