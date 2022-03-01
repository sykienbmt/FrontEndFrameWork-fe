import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { idText } from 'typescript';
import { UserContext } from '../../contexts/UserContext';
import { cartController } from '../../controllers/CartController';
import {OrderInfo} from '../../models/Order'
import ItemOrderList from './ItemOrderList';
import './OrderPage.css'
const { v4: uuid } = require("uuid");

interface State{
    listOrder:OrderInfo[],
    page:number,
    totalPage:number,
    perPage:number
}

export default function OrderPage() {
    const userContext = useContext(UserContext)

    const [state,setState] = useState<State>({
        listOrder:[],
        page:1,
        totalPage:2,
        perPage:2
    })

    
    useEffect(() => {
        if(userContext.user.idUser!==""){
            cartController.getOrders(userContext.user.idUser,state.page,state.perPage).then(res=>{
                setState({...state,listOrder:res.orderInfo,totalPage:res.totalPage})
            })
        }
    }, [userContext.user.idUser,state.page])
    

    const changePage = ({ selected }: any) => {
        setState({ ...state, page:selected+1})
    }
    
    
    return (
        <section id="order-history-container" >
            <div className="order-history">
                <h2 className="order-history-title">Order History</h2>
                {state.listOrder.length>0 ? state.listOrder.map(item=><ItemOrderList key={uuid()} itemOrder={item}/>)
                : <div className='order-null'>
                    <img src="https://www.svgrepo.com/show/301679/choices-order.svg" style={{width:"250px"}} alt="" />
                    <h3>You do not have any orders yet</h3>
                    <h3>Please back to shop and buy something</h3>
                    <Link to={'/shop'}><Button id='button-order-null'>Back to Shop</Button></Link>
                </div>
                }
            </div>
            {state.listOrder.length>0? <ReactPaginate
              previousLabel="Previous"
              nextLabel="Next"
              pageCount={state.totalPage}
              onPageChange={changePage}
              containerClassName='paginationBtn'
              previousClassName='previousBtn'
              nextLinkClassName='nextBtn'
              disabledClassName='paginationDisable'
              activeClassName='paginationActive'
            />: ""}

        </section>
    )
}