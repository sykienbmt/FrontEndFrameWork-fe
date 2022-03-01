import axios from "axios"
import { authAxios } from ".";
import { Category } from "../models/Category";
import { Weight } from "../models/Weight";


class WeightController{

    async list(){
        return authAxios.get('/admin/weight/get').then(res=>{
            return res.data as Weight[]
        })
    }

}


export const weightController = new WeightController()