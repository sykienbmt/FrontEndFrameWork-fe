import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { MdOutlineEditNote } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useStyles } from '../categoryManager/style'
import {User} from '../../../models/User'
import { userController } from '../../../controllers/UserController'



interface State{
    user: User,
    users: User[]
}

export default function UserManager() {
    const [state,setState] = useState<State>({
        user:{idUser:"",address:"",email:"",name:"",permission:"",phone:"",username:""},
        users:[]
    })

    useEffect(()=>{
        userController.list().then(res=>{
            console.log(res);
            
            setState(prev=>({...prev,users:res}))
        })
    },[])

    const styles = useStyles()

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onCLickOpenAdd=()=>{
        setState(prev=>({...prev,user:{idUser:"",address:"",email:"",name:"",permission:"",phone:"",username:""}}))
        handleOpen()
    }

    const onClickEdit=(item:User)=>{
        console.log(item);
        setState(prev=>({...prev,user:item}))
        handleOpen()
    }
    
    const onClickAction=()=>{
        console.log(state.user);
        
        userController.edit(state.user).then((res)=>{
            setState(prev=>({...prev,users:res}))
        })
    }

    const onClickDelete=(id:String)=>{

    }

    return (
        <Box className='category-admin-container'>
            <Box sx={{height:"10%",backgroundColor: "rgba(250 , 250, 250,.8 )",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px 3px rgb(238, 234, 234)",
                padding: '15px 15px 15px 15px'
            }}>
                <Box sx={{display:'flex',justifyContent:'space-between',}}>
                    <TextField id="standard-basic" label="Search" variant="standard" />
                    <Button onClick={onCLickOpenAdd}>Add</Button>
                </Box>
            </Box>


            
            <Box sx={{height:"90%",p:"15px",backgroundColor: "rgba(250 , 250, 250,.8 )",
                        borderRadius: "10px",
                        boxShadow: "0px 0px 10px 3px rgb(238, 234, 234)"}}>
{/* Table */}
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="left" sx={{width:"20%"}}>Username</TableCell>
                            <TableCell align="left" sx={{width:"10%"}}>Name</TableCell>
                            <TableCell align="left" sx={{width:"25%"}}>Email</TableCell>
                            <TableCell align="left" sx={{width:"20%"}}>Address</TableCell>
                            <TableCell align="left" sx={{width:"10%"}}>Phone</TableCell>
                            <TableCell align="center" sx={{width:"15%"}}>Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>

                        {state.users.length>0 && state.users.map((row) => (
                            <TableRow key={row.idUser}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row"  >{row.username} </TableCell>
                            <TableCell align="left">{row.name}  </TableCell>
                            <TableCell align="left">{row.email}  </TableCell>
                            <TableCell align="left">{row.address}  </TableCell>
                            <TableCell align="left">{row.phone} </TableCell>
                            <TableCell align="center" >
                                <MdOutlineEditNote className={styles.icon} onClick={()=>onClickEdit(row)}/>
                                <RiDeleteBin6Line className={styles.icon}/>
                            </TableCell>
                            </TableRow>
                        ))}

                        </TableBody>
                    </Table>
                    </TableContainer>
            </Box>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={styles.modal}>


                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {state.user.idUser===''? 'Add User': "Edit User"}
                </Typography>

                <TextField fullWidth label="Username" id="fullWidth" sx={{marginTop:"15px"}}
                    defaultValue={state.user.username}
                    onChange={e=>setState(prev=>({...prev,user:{...prev.user,username:e.target.value}}))}
                />

                <TextField fullWidth label="Name" id="fullWidth" sx={{marginTop:"15px"}}
                    defaultValue={state.user.name}
                    onChange={e=>setState(prev=>({...prev,user:{...prev.user,name:e.target.value}}))} 
                />
                <TextField fullWidth label="Email" id="fullWidth" sx={{marginTop:"15px"}}
                    defaultValue={state.user.email}
                    onChange={e=>setState(prev=>({...prev,user:{...prev.user,email:e.target.value}}))} 
                />
                <TextField fullWidth label="Address" id="fullWidth" sx={{marginTop:"15px"}}
                    defaultValue={state.user.address}
                    onChange={e=>setState(prev=>({...prev,user:{...prev.user,address:e.target.value}}))} 
                />
                <TextField fullWidth label="Phone" id="fullWidth" sx={{marginTop:"15px"}}
                    defaultValue={state.user.phone}
                    onChange={e=>setState(prev=>({...prev,user:{...prev.user,phone:e.target.value}}))} 
                />

                <Box sx={{textAlign:"right",mt:"10px"}}>
                    <Button variant='outlined'
                        onClick={onClickAction}
                    >
                        {state.user.idUser===''? 'Add': "Edit"}
                    </Button>
                </Box>
                </Box>
            </Modal>

        </Box>
    )
}
