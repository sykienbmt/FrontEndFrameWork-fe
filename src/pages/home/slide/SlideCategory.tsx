import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './SlideCategory.css'
import { Button } from "@mui/material";
import {FcNext} from 'react-icons/fc'
import { Category } from "../../../models/Category";
import { categoryController } from "../../../controllers/CategoryController";


type State={
    listCategory: Category[]
}


export default function SimpleSlider() {

    const [state,setState]=useState<State>({listCategory:[]})

    useEffect(() => {
        categoryController.list().then(res => {
            setState({ ...state, listCategory: res.slice(0,5)})
        })
    }, [])
    
    console.log(state.listCategory);
    
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };


  return (

    <section className="slider-container">
      <div className="slider-content">
      <div className="best-seller-title">
          <p className="best-seller-product">
            ~ Categories ~
          </p>
          <h1 className="best-seller-desc">
          We believe in working with accredited farmers
          </h1>
      </div>
        <Slider {...settings}>
        {state.listCategory.length>0 && state.listCategory.map((item,index)=>{
            return (
                <div key={index} className="category-item-container">
                    <div className="category-item-home">
                      <div className="category-item-img">
                          <img src="https://freshfruitvietnam.vn/upload/images/2020/01/1578036091-single_product1-5.Chomchom.png" alt="" />
                      </div>
                      <h3 className="category-item-name">{item.name}</h3>
                      <p className="category-item-desc">{item.desc}</p>
                      <Button variant="contained" size="small">
                          Small
                      </Button>
                    </div>
                </div>
            )
        })}
      </Slider>
      </div>
    </section>

  );
}

function SampleNextArrow(props:any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "flex",alignItems:"center",margin:"auto",width:"40px",height:"40px",borderRadius:"25px",zIndex:3,justifyContent:"center",backgroundColor:"rgb(131, 235, 28)" }}
        onClick={onClick}
      />
    );
}
  
  function SamplePrevArrow(props:any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "flex",alignItems:"center",margin:"auto",width:"40px",height:"40px",borderRadius:"25px",zIndex:3,justifyContent:"center",backgroundColor:"rgb(131, 235, 28)" }}
        onClick={onClick}
      />
    );
}