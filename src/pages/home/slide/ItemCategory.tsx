import { Box, Button } from '@mui/material';
import React from 'react';
import { Cate } from '../SlideCategory';
import './ItemCategory.css'


interface Props{
    cate:Cate
}

export default function ItemCategory(props:Props) {

    const style ={
        ':hover':{
            color:`${props.cate.color}`
        }
    }

  return <Box className="category-item-container" sx={style}>
                <Box className="category-item-img" sx={style} >
                    <Box sx={{color:"#eeeeee",fontFamily:"Lora",':hover':{
                        color:`${props.cate.color}`
                    }}}>
                        {props.cate.alphabet}
                    </Box>
                    <img src={props.cate.image} alt="" />
                </Box>
                <div className="category-content-desc">
                    <h3 className="category-item-name">{props.cate.name}</h3>
                    <p className="category-item-desc">{props.cate.desc}</p>
                    <button className="button-effect" style={{background:"white",border:"2px solid green",color:"green"}}>Go now<i className="fas fa-arrow-right"></i></button>
                </div>
        </Box>
}
