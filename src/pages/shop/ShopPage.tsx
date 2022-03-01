
import React, { useContext, useEffect, useState } from 'react'
import AddressSection from '../../components/AddressSection'
import './ShopPage.css'
import { Category } from '../../models/Category';
import { categoryController } from '../../controllers/CategoryController';
import LeftContent from './LeftContent';
import RightContent from './RightContent';
import { ProductLineContext } from '../../contexts/ProductContext';
import { UserContext } from '../../contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';


type State={
  categories: Category[]
}

export default function ShopPage() {
  const productLineContext=useContext(ProductLineContext)
  const orderContext =useContext(CartContext)
  
  const [state,setState]=useState<State>({
    categories:[]
  })

  useEffect(() => {
    window.scrollTo(0, 0);
    categoryController.list().then(res=>{
      setState({...state,categories:res})
    })
  }, [])


  return ( 
    <>
      <AddressSection page='SHOP' home='Home' current='Shop' />
      <div id='shop-page-container'>
          <div className="shop-page-content padding-container">
            <LeftContent />
            <RightContent categories={state.categories}/>
          </div>
      </div>
    </>
  )
}
