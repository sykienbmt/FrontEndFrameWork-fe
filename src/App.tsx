import React from 'react';
import './App.css';
import HomePage from './pages/home/HomePage';
import {BrowserRouter,Routes,Route, Outlet} from "react-router-dom";
import Login from './pages/login/Login';
import ProductAdmin from './pages/admin/productManager/ProductAdmin';
import Error404 from './pages/404/Error404';
import CategoryAdmin from './pages/admin/categoryManager/CategoryAdmin';
import ShopPage from './pages/shop/ShopPage';
import ProductDetail from './pages/productDetail/ProductDetail';
import UserContextProvider from './contexts/UserContext';
import Cart from './pages/cart/Cart';
import OrderPage from './pages/order/OrderPage';
import PublicRouter from './router/PublicRouter';
import PrivateRouter from './router/PrivateRouter';
import WishList from './pages/wishList/WishList';
import OrderManage from './pages/admin/orderManager/OrderManage';
import UsersManager from './pages/admin/userManager/userManger';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          
          <Route path="/login" element={
            <UserContextProvider>
              <Login />
            </UserContextProvider>
          } />

          <Route path="/admin" element={<PrivateRouter />} >
            <Route path="" element={<ProductAdmin />} />
            <Route path="category" element={<CategoryAdmin />} />
            <Route path="orders" element={<OrderManage />} />
            <Route path="users" element={<UsersManager />} />
          </Route>

          <Route path="/" element={<PublicRouter />} >
              <Route path="" element={<HomePage />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="product" element={<ShopPage />} />
              <Route path="cart" element={<Cart />} />
              <Route path="order" element={<OrderPage />} />
              <Route path="wishlist" element={<WishList />} />
              <Route path="*" element={<Error404 />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
