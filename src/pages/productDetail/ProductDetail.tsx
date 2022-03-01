
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddressSection from '../../components/AddressSection'
import { productController } from '../../controllers/ProductController'
import { ProductLine } from '../../models/ProductLine'
import { Weight } from '../../models/Weight'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import './ProductDetail.css'
import BasicTabs from './TabComponent'
import ProductOption from './ProductOption'
import SlideProduct from '../../components/slide/SlideProduct'

type State={
    productLine:ProductLine,
    weights:Weight[]
    tabValue:number
}

export default function ProductDetail() {

    const [state,setState]= useState<State>({productLine:{
        idProductLine: "",
        nameProduct: "",
        idCategory: "",
        sell: 0,
        desc: "",
        products: [],
        pictures: [],},
        weights:[],
        tabValue:0
    })

    const {id}=useParams()

    useEffect(() => {
        const loadProductLine =()=>{
            if(id){
                productController.get(id).then(res=>{
                    setState({...state,productLine:res})
                })
            }
        }
        loadProductLine()
    }, [])

    

    return (
        <>
            <AddressSection page='PRODUCT DETAIL' home='Home' current='Product Detail' />
            {state.productLine.idProductLine!==""?  <div className='product-detail-container padding-container' >
                <ProductOption productLine={state.productLine}/>
                
                <div className="tab-container" style={{width:"1200px",margin:"auto",padding:"20px"}}>
                    <BasicTabs />
                </div>

            </div>  : <></> }
            <SlideProduct 
                numberShow={4} 
                pagination={{ page: 1, perPage: 7, search: "", idCategory: `${state.productLine.idCategory}`, select: "",from:0,to:1000 }} 
                title='~ Related Product ~'
                desc=''
            />
        </>
    )
}
