import axios from "axios"
import { authAxios } from ".";
import { backendUrl } from "../constraints";
import { Category } from "../models/Category";


class CategoryController{

    async list(){
        return authAxios.get(backendUrl+'admin/category/get').then(res=>{
            return res.data as Category[]
        })
    }

    async edit(category:Category){
        return authAxios.post(backendUrl+'admin/category/edit',category).then(res=>{
            return res.data as Category[]
        })
    }

    async delete(idCategory:string){
        return authAxios.post(backendUrl+'admin/category/delete',{idCategory}).then(res=>{
            return res.data as Category[]
        })
    }
    
    // async add(product:Product):Promise<Product[]>{
    //     return axios.put('http://localhost:3333/products/add',product).then(res=>{
    //         return res.data;
    //     })
    // }
}


export const categoryController = new CategoryController()