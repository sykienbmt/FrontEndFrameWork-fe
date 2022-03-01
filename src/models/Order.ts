// import { OrderProduct, OrderProductShow } from "./OrderProduct";
// import { User } from "./User";

import { ItemCart } from "./OrderProduct";

export interface Order{
    idOrder:string,
    idUser:string,
    total:number,
    isTemporary:boolean
}

export interface OrderInfo extends Order{
    status:string,
    createAt:string,
    closeAt:string,
    email:string,
    name:string,
    phone:string,
    address:string,
    payment:string,
    itemCarts:ItemCart[]
}
