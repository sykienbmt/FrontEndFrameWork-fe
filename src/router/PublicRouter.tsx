import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CartContextProvider from '../contexts/CartContext';
import ProductLineContextProvider from '../contexts/ProductContext';
import UserContextProvider from '../contexts/UserContext';
import WishListContextProvider from '../contexts/WishListContext';

export default function PublicRouter() {
  return <>
  <UserContextProvider>
    <WishListContextProvider>
      <CartContextProvider>
        <ProductLineContextProvider>
        <Header />
        <div>
          <Outlet />
        </div>
        <Footer />
        </ProductLineContextProvider>
      </CartContextProvider>
    </WishListContextProvider>
  </UserContextProvider>
</>
}
