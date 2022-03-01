import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAxios } from "../controllers";
import { userController } from "../controllers/UserController";
import { User } from "../models/User";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface UserContextProps{
    children: ReactNode
}

const userFunctionDefault:UserFunction={
    user:{idUser:"",email:"",username:"",permission:"",name:"",phone:"",address:"",password:""},
    status:"Login",
    setUser:()=>{},
    changeStatus:()=>{},
    setMess:()=>{},
    setErr:()=>{}
}

type UserFunction={
    user:User,
    status:string,
    setUser:(user:User)=>void,
    changeStatus:(status:string)=>void,
    setMess:(mess:string)=>void,
    setErr:(mess:string)=>void
}

export const UserContext= createContext<UserFunction>(userFunctionDefault)

const UserContextProvider = ({children}:UserContextProps)=>{
    const [state,setState]= useState<UserFunction>(userFunctionDefault)


    useEffect(() => {
        if(localStorage.getItem('accessToken')){
            userController.getMe().then(res=>{
                setState({...state,user:res})
            })
        }
    }, [])
    
    const changeStatus=(status:string)=>{
        setState({...state,status:status,user:userFunctionDefault.user})
        localStorage.removeItem('accessToken')
        authAxios.defaults.headers.common['Authorization'] = ""
    }

    const setUser=(user:User)=>{
        if(user.idUser!==""){
            setState({...state,user:user,status:"Logout"})
        }   
    }

    const setMess=(mess:string)=>{
        toast.success(mess, {  position: 'bottom-right', autoClose: 3000 })
    }

    const setErr=(mess:string)=>{
        toast.error(mess, {  position: 'bottom-right', autoClose: 3000 })
    }

    const userContextData:UserFunction = {
        user:state.user,
        status:state.status,
        setUser,
        changeStatus,
        setMess,
        setErr
    }
    
    return(
        <UserContext.Provider value={userContextData}>
            <ToastContainer />
            {children}
        </UserContext.Provider>
    )

}

export default UserContextProvider