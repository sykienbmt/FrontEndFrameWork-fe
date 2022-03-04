import React, { useEffect, useState } from 'react'
import { Box, TextField, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Modal, Typography, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { MdOutlineEditNote } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { orderController } from '../../../controllers/OrderController'
import { Order, OrderInfo } from '../../../models/Order'
import { FaClipboardList } from "react-icons/fa";
import { useStyles } from './style'
import { ItemCart } from '../../../models/OrderProduct'
import ReactPaginate from 'react-paginate'

interface State {
    order: OrderInfo,
    orders: OrderInfo[],
    search:string,
    itemCarts:ItemCart[],
    totalPage:number
}


export default function OrderManage() {
    const style = useStyles()

    const [state, setState] = useState<State>({
        order: {
            idUser: "",
            address: "",
            closeAt: "",
            createAt: "",
            email: "",
            idOrder: "",
            isTemporary: false,
            itemCarts: [],
            name: "",
            payment: "",
            phone: "",
            status: "",
            total: 0
        },
        totalPage:1,
        orders: [],
        search:"",
        itemCarts:[]
    })

    const [openDetail,setOpenDetail] = useState(false)
    const showPopupDetail = (itemCarts:ItemCart[]) => {
        setState(prev=>({...prev,itemCarts:itemCarts}))
        setOpenDetail(true)
    }; 

    console.log(state.itemCarts);
    
    const handleClose = () => setOpenDetail(false);

    useEffect(() => {
        orderController.list(1, 9,"").then(res => {
            setState(prev => ({ ...prev, orders: res.orderList }))
        })
    }, [])


    const sumTotal = (order: OrderInfo) => {
        let sum: number = 0
        order.itemCarts.map(i => {
            sum += i.price * i.quantity
        })
        return sum
    }

    const [status, setStatus] = React.useState('');

    const onClickSearch = () => {
        orderController.list(1, 9,state.search).then(res => {
            setState(prev => ({ ...prev, orders: res.orderList }))
        })
    };
    const changePage = ({ selected }: any) => {
    }

    return (
        <Box className='category-admin-container'>
            <Box sx={{
                height: "10%", backgroundColor: "rgba(250 , 250, 250,.8 )",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px 3px rgb(238, 234, 234)",
                padding: '15px 15px 15px 15px'
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'left', }}>
                    <TextField id="standard-basic" label="" variant="standard" 
                        onChange={e=>setState(prev=>({...prev,search:e.target.value}))}
                    />
                    <Button onClick={onClickSearch}>Search</Button>
                </Box>
            </Box>

            <Box sx={{
                height: "90%", p: "15px", backgroundColor: "rgba(250 , 250, 250,.8 )",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px 3px rgb(238, 234, 234)"
            }}>
                {/* Table */}
                <Box sx={{height:"85%"}}>
                <TableContainer component={Paper} >
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

                            {state.orders.length > 0 && state.orders.map((row) => (
                                <TableRow
                                    key={row.idOrder}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row"><FaClipboardList className={style.icon} onClick={()=>showPopupDetail(row.itemCarts)}/> {row.idOrder.slice(0,20)+"..."}</TableCell>
                                    <TableCell component="th" scope="row">{row.name}</TableCell>
                                    <TableCell align="left">{row.phone}</TableCell>
                                    <TableCell align="left">{row.email}</TableCell>
                                    <TableCell align="center">$ {sumTotal(row)}</TableCell>

                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={row.status}
                                            onChange={e=>{
                                                orderController.changeStatus(row.idOrder,e.target.value).then(res=>{
                                                    setState(prev=>({...prev,orders:res.orderList}))
                                                })
                                            }}
                                            label="Status"
                                        >
                                            <MenuItem value={'pending'}>Pending</MenuItem>
                                            <MenuItem value={'preparing'}>Preparing</MenuItem>
                                            <MenuItem value={'transfer'}>Transfer</MenuItem>
                                            <MenuItem value={'done'}>Done</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
                </Box>

                <div className="admin-pagination-product-container" style={{height:"15%"}}>
                    <ReactPaginate
                    previousLabel="Previous"
                    nextLabel="Next"
                    pageCount={state.totalPage}
                    onPageChange={changePage}
                    containerClassName='paginationBtn'
                    previousClassName='previousBtn'
                    nextLinkClassName='nextBtn'
                    disabledClassName='paginationDisable'
                    activeClassName='paginationActive'
                />
                </div>
            </Box>
            


            <Modal
                open={openDetail}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={style.modal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Order Detail
                    </Typography>
                    <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 400 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Weight</TableCell>
                            <TableCell align="left">Color</TableCell>
                            <TableCell align="left">Quantity</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Total</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>

                        {state.itemCarts.length>0 && state.itemCarts.map((row) => (
                            <TableRow
                            key={row.idProduct}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                <img src={row.images[0].image} alt="" style={{width:"50px",height:"50px"}} />
                            </TableCell>
                            <TableCell align="left">{row.nameProductLine}</TableCell>
                            <TableCell align="left">{row.weight}</TableCell>
                            <TableCell align="left">
                                <div style={{width:"20px",height:"20px",borderRadius:"50%",background:row.color}}></div>
                            </TableCell>
                            <TableCell align="left">{row.quantity}</TableCell>
                            <TableCell align="left">{row.price}</TableCell>
                            <TableCell align="right" sx={{fontWeight:"500"}}>${row.price*row.quantity}</TableCell>
                            </TableRow>
                        ))}

                        </TableBody>
                    </Table>
                    </TableContainer>

                </Box>
            </Modal>                          
        </Box>
    )
}