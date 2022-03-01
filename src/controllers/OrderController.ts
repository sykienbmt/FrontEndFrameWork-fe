import axios from "axios"
import { authAxios } from ".";
import { backendUrl } from "../constraints";
import { Order } from "../models/Order";


class OrderController{

    async get(idUser:string):Promise<Order>{
        const data= await authAxios.put(backendUrl+'order/get',{idUser})
        return data.data
    }
    
    async list(page:number,perPage:number){
        const data = await authAxios.post(backendUrl+'admin/orders',{page,perPage})
        console.log(data.data);
        
        return data.data
    }
}


export const orderController = new OrderController()