import axios, { AxiosError } from "axios"
import { backendUrl } from "../constraints";
import { User } from "../models/User";
// import { Order } from "../model/Order";
// import { User } from "../model/User";
import { authAxios} from "./index";


class UserController{
    
    async login(username:string,password:string){
        return axios.put(backendUrl+'login',{username,password}).then(res=>{
            console.log(res);
            if(res.data.success===false){
                return false
            }else{
                const token = res.data.accessToken;
                localStorage.setItem('accessToken',token)
                authAxios.defaults.headers.common['Authorization'] ="Bearer "+ token
                return parseJwt(token)
            }
        })
    }

    async create(user:User){
        return authAxios.post(backendUrl+'register',user).then(res=>{
            console.log(res===undefined);
            if(res===undefined){
                return {success:false,mess:"Username is already exists!"}
            }
            return {success:true,data:res}
        })
    }
    
    
    async isAdmin(){
        return authAxios.get(backendUrl+'admin').then(res=>{
            return res.data
        })
    }

    async getMe(){
        return authAxios.get(backendUrl+'getMe').then(res=>{
            return res.data as User
        })
    }

    async list(){
        return authAxios.get(backendUrl+'users').then(res=>{
            return res.data
        })
    }

    async edit(user:User){
        return authAxios.post(backendUrl+'users/edit',user).then(res=>{
            return res.data
        })
    }

    async delete(idUser:string){
        console.log(idUser);
        return authAxios.post(backendUrl+'users/delete',{idUser}).then(res=>{
            return res.data
        })
    }
}

const parseJwt =(token:string)=> {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export const userController = new UserController()