import axios from "axios"
import { authAxios } from ".";
import { backendUrl } from "../constraints";
import { Category } from "../models/Category";
import { Color } from "../models/Color";
import { Weight } from "../models/Weight";


class ColorController{

    async list(){
        return authAxios.get(backendUrl+'admin/color/get').then(res=>{
            return res.data as Color[]
        })
    }

}


export const colorController = new ColorController()