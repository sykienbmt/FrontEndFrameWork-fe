import axios from "axios";
import { authAxios } from ".";
import { backendUrl } from "../constraints";
import Image from "../models/Image";
import { Pagination } from "../models/Pagination";
import { Product } from "../models/Product";
import { ProductLine } from "../models/ProductLine";
// import { Pagination } from "../model/Pagination";
// import { Product } from "../model/Product";




class ProductController{

    async add(productLine:ProductLine):Promise<ProductLine[]>{
        return authAxios.post(backendUrl+'product/add',productLine).then(res=>{
            return res.data;
        })
    }

    async get(idProductLine:string):Promise<ProductLine>{
        return authAxios.post(backendUrl+'product/get',{idProductLine}).then(res=>{
            return res.data;
        })
    }

    async updateImage(image:Image):Promise<ProductLine>{
        return authAxios.post(backendUrl+'product/update/image',image).then(res=>{
            return res.data;
        })
    }

    async updateProduct(product:Product):Promise<ProductLine>{
        console.log(product);
        
        return authAxios.put(backendUrl+'product/update',product).then(res=>{
            return res.data;
        })
    }

    async updateProductLine(productLine:ProductLine){
        return authAxios.post(backendUrl+'product/update/productLine',productLine).then(res=>{
            return res.data;
        })
    }

    async deleteImage(idImage:string){
        return authAxios.post(backendUrl+'product/delete/image',{idImage}).then(res=>{
            return res.data;
        })
    }

    async deleteProduct(idProduct:string){
        return authAxios.post(backendUrl+'product/delete',{idProduct}).then(res=>{
            return res.data;
        })
    }

    async deleteProductLine(idProductLine:string){
        return authAxios.post(backendUrl+'product/delete/productLine',{idProductLine}).then(res=>{
            return res.data;
        })
    }


    async detail(idProductLine:String){
        return authAxios.get(`http://localhost:3333/product/detail/${idProductLine}`).then(res=>{
            return res.data as ProductLine
        })
    }

    async list(pagination:Pagination){
        return authAxios.put(backendUrl+'product/list', pagination).then(res=>{
            let productLines:ProductLine[]=res.data.productLines
            let totalPage = Math.ceil(res.data.total/ pagination.perPage)
            return {productLines,totalPage}
        })
    }

}

export const productController = new ProductController();