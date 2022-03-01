import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ProductLineContextProvider from '../contexts/ProductContext';
import UserContextProvider from '../contexts/UserContext';
import { userController } from '../controllers/UserController';
import AdminMenu from '../pages/admin/menu/AdminMenu';

type State={
    isAdmin:boolean
}

export default function PrivateRouter() {
    const [state,setState]=useState<State>({isAdmin:false})
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(localStorage.getItem('accessToken')){
            userController.isAdmin().then(res=>{
                setState(prev=>({...prev,isAdmin:true}))
            })
        }else{
            navigate('/login')
        }
    },[])

    
    return <>
        {state.isAdmin===true? 
        <UserContextProvider>
        <ProductLineContextProvider>
            <div id='admin-container'>
            <div className="admin-content">
                <AdminMenu />
                <Outlet /> 
            </div>
            </div>
        </ProductLineContextProvider>
        </UserContextProvider>
        : ""}
    </>
}
