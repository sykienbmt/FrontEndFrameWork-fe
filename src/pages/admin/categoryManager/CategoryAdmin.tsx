import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { categoryController } from '../../../controllers/CategoryController'
import { Category } from '../../../models/Category'
import './CategoryAdmin.css'
import { MdOutlineEditNote } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useStyles } from './style'
import { UserContext } from '../../../contexts/UserContext'


interface State{
    category: Category,
    categories: Category[],
    errValid:string
}

export default function CategoryAdmin() {
    const [state,setState] = useState<State>({
        category:{idCategory:"",desc:"",name:""},
        categories:[],
        errValid:""
    })

    useEffect(()=>{
        categoryController.list().then(res=>{
            setState(prev=>({...prev,categories:res}))
        })
    },[])

    const userContext = useContext(UserContext)

    const styles = useStyles()

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onCLickOpenAdd=()=>{
        setState(prev=>({...prev,category:{idCategory:"",desc:"",name:""}}))
        handleOpen()
    }

    const onClickSetEdit=(item:Category)=>{
        console.log(item);
        setState(prev=>({...prev,category:item}))
        handleOpen()
    }
    
    const onClickAction=()=>{
        if(state.category.name ==="" || state.category.desc===""){
            setState(prev=>({...prev,errValid:"Pls refill all field"}))
        }else{
            setState(prev=>({...prev,errValid:""}))
            if (state.category.idCategory===''){
                userContext.setMess('Add Category done')
            }else{
                userContext.setMess('Edit Category done')
            }
            categoryController.edit(state.category).then(res=>{
                setState(prev=>({...prev,categories:res}))
            })
        }

        
    }

    const onClickDelete=(id:string)=>{
        categoryController.delete(id).then(res=>{
            setState(prev=>({...prev,categories:res}))
        })
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
                    <Button onClick={onCLickOpenAdd}>Add</Button>
                </Box>
            </Box>


            
            <Box sx={{height:"90%",p:"15px",backgroundColor: "rgba(250 , 250, 250,.8 )",
                        borderRadius: "10px",
                        boxShadow: "0px 0px 10px 3px rgb(238, 234, 234)"}}>
                List Category
{/* Table */}
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="left">Name category</TableCell>
                            <TableCell align="left">Desc</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>

                        {state.categories.map((row) => (
                            <TableRow
                            key={row.idCategory}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.idCategory}
                            </TableCell>
                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="left">{row.desc}</TableCell>
                            <TableCell align="center">
                                <MdOutlineEditNote className={styles.icon} onClick={()=>onClickSetEdit(row)}/>
                                <RiDeleteBin6Line className={styles.icon} onClick={()=>onClickDelete(row.idCategory)}/>
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
                    {state.category.idCategory===''? 'Add Category': "Edit Category"}
                </Typography>
                <TextField fullWidth label="Category name" id="fullWidth" sx={{marginTop:"15px"}} 
                    value={state.category.name}
                    onChange={e=>setState(prev=>({...prev,category:{...prev.category,name:e.target.value}}))} 
                    required
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    fullWidth
                    rows={3}
                    value={state.category.desc}
                    onChange={e=>setState(prev=>({...prev,category:{...prev.category,desc:e.target.value}}))} 
                    sx={{marginTop:"15px",marginBottom:"15px"}}
                    required
                />
                {state.errValid !== "" ?
                    <div style={{ position: 'relative', textAlign: 'center', width: '100%' }}>
                        <span style={{
                            position: 'absolute', color: 'red', width: '100%', fontSize: '14px'
                            , transform: "translate(-50%,-50%)",
                            top: '20px',
                            background: 'white',
                            fontWeight:"600"
                        }}>{state.errValid}</span>
                    </div> : ""
                }
                <Box sx={{textAlign:"right"}}>
                    <Button variant='outlined'
                        onClick={onClickAction}
                    >
                        {state.category.idCategory===''? 'Add': "Edit"}
                    </Button>
                </Box>
                </Box>
            </Modal>
        </Box>
    )
}
