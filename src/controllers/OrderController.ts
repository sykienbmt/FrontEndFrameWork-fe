import axios from "axios"
import { authAxios } from ".";
import { backendUrl } from "../constraints";
import { Order } from "../models/Order";


class OrderController{

    async get(idUser:string):Promise<Order>{
        const data= await authAxios.put(backendUrl+'order/get',{idUser})
        return data.data
    }
    
    async list(page:number,perPage:number,search:string){
        const data = await authAxios.post(backendUrl+'admin/orders',{page,perPage,search})
        console.log(data.data);
        
        return data.data
    }

    async changeStatus(idOrder:string,status:string){
        const data = await authAxios.post(backendUrl+'admin/orders/edit',{idOrder,status})
        return data.data
    }
}


export const orderController = new OrderController()