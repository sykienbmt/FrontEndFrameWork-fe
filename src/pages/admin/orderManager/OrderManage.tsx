import { Box, TextField, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Modal, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { MdOutlineEditNote } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { orderController } from '../../../controllers/OrderController'
import { Order, OrderInfo } from '../../../models/Order'

interface State{
    order:OrderInfo,
    orders:OrderInfo[]
}


export default function OrderManage() {

    const [state,setState] =  useState<State>({
        order:{
            idUser:"",
            address:"",
            closeAt:"",
            createAt:"",
            email:"",
            idOrder:"",
            isTemporary:false,
            itemCarts:[],
            name:"",
            payment:"",
            phone:"",
            status:"",
            total:0
        },
        orders:[]
    })

    useEffect(()=>{
        orderController.list(1,50).then(res=>{
            setState(prev=>({...prev,orders:res.orderList}))
        })
    },[])


    const sumTotal = (order:OrderInfo)=>{
        let sum:number=0
        order.itemCarts.map(i=>{
            sum+= i.price*i.quantity
        })
        return sum
    }


  return (
    <Box className='category-admin-container'>
            <Box sx={{height:"10%",backgroundColor: "rgba(250 , 250, 250,.8 )",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px 3px rgb(238, 234, 234)",
                padding: '15px 15px 15px 15px'
            }}>
                <Box sx={{display:'flex',justifyContent:'space-between',}}>
                    <TextField id="standard-basic" label="Standard" variant="standard" />
                    <Button onClick={()=>{console.log("add")
                    }}>Add</Button>
                </Box>
            </Box>


            
            <Box sx={{height:"90%",p:"15px",backgroundColor: "rgba(250 , 250, 250,.8 )",
                        borderRadius: "10px",
                        boxShadow: "0px 0px 10px 3px rgb(238, 234, 234)"}}>
                List orders
{/* Table */}
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Id order</TableCell>
                            <TableCell align="left">Customer name</TableCell>
                            <TableCell align="left">Phone</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="center">Total</TableCell>
                            <TableCell align="center">Status</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>

                        {state.orders.length>0 && state.orders.map((row) => (
                            <TableRow
                            key={row.idOrder}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row.idOrder}</TableCell>
                                <TableCell component="th" scope="row">{row.name}</TableCell>
                                <TableCell align="left">{row.phone}</TableCell>
                                <TableCell align="left">{row.email}</TableCell>
                                <TableCell align="center">{sumTotal(row)}</TableCell>
                                <TableCell align='center'><Button>{row.status}</Button></TableCell>
                            </TableRow>
                        ))}

                        </TableBody>
                    </Table>
                    </TableContainer>
            </Box>

        </Box>
  )
}
