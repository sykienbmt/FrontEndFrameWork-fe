import { authAxios } from ".";
import { backendUrl } from "../constraints";
import { OrderInfo } from "../models/Order";
import { ItemCart, OrderProduct } from "../models/OrderProduct";
import { User } from "../models/User";


class CartController{

    async getCarts(idUser:string,idOrder:string){
        return authAxios.put(backendUrl+'cart/get',{idUser,idOrder}).then(res=>{
            return res.data
        })
    }
    
    async add(idUser:string,orderProduct:OrderProduct){
        return authAxios.put(backendUrl+'cart/add',{idUser,orderProduct}).then(res=>{
            return res.data;
        })
    }

    async update(idUser:string,orderProduct:OrderProduct){
        return authAxios.put(backendUrl+'cart/update',{idUser,orderProduct}).then(res=>{
            return res.data;
        })
    }

    async delete(idUser:string,idProduct:string,idOrder:string){
        return authAxios.put(`${backendUrl}cart/delete`,{idUser,idProduct,idOrder}).then(res=>{
            return res.data;
        })
    }

    async completeOrder(user:User,payment:string,itemCarts:ItemCart[]){
        return authAxios.put(`${backendUrl}cart/done`,{user,payment,itemCarts}).then(res=>{
            return res.data;
        })
    }

    async getOrders(idUser:string,page:number,perPage:number){
        
        return authAxios.put(backendUrl+'order/get',{idUser,page,perPage}).then(res=>{
            let orderInfo:OrderInfo[]=res.data.orderList
            let totalPage = Math.ceil(Number(res.data.totalOrder)/perPage)
            return {orderInfo,totalPage}
        })
    }
}


export const cartController = new CartController()