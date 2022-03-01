import axios from "axios"
import { authAxios } from ".";
import { backendUrl } from "../constraints";
import { Category } from "../models/Category";
import { ProductLine } from "../models/ProductLine";


class WishlistController{

    async list(idUser:string,page:number,perPage:number){
        return authAxios.put(backendUrl+'wishlist/get',{idUser,page,perPage}).then(res=>{
            return res.data.productLines as ProductLine[]
        })
    }

    async add(idUser:string,idProductLine:string){
        return authAxios.put(backendUrl+'wishlist/add',{idUser,idProductLine}).then(res=>{
            return res.data.productLines as ProductLine[]
        })
    }

    async delete(idUser:string,idProductLine:string){
        return authAxios.put(backendUrl+'wishlist/delete',{idUser,idProductLine}).then(res=>{
            return res.data.productLines as ProductLine[]
        })
    }
    
}


export const wishlistController = new WishlistController()