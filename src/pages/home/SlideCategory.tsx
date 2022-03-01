import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './SlideCategory.css'
import ItemCategory from "./slide/ItemCategory";


type State={
    listCategory: Cate[]
}


export default function SimpleSlider() {

    const [state,setState]=useState<State>({listCategory:listCategory})

    
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
                <ItemCategory key={index}  cate={item}/>
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

export interface Cate{
  alphabet:string,
  color:string;
  image:string;
  name:string;
  desc:string
}

const listCategory:Cate[]=[
  {
    alphabet:"V",
    color:"green",
    image:"https://demo.casethemes.net/organio/wp-content/uploads/2021/03/product-category1.png",
    name:"Vegetable",
    desc:"Purchasing from select family farmers who farm organically."
  },
  {
    alphabet:"F",
    color:"purple",
    image:"https://demo.casethemes.net/organio/wp-content/uploads/2021/03/product-category2.png",
    name:"Fresh Fruits",
    desc:"Purchasing from select family farmers who farm organically."
  },
  {
    alphabet:"N",
    color:"Brown",
    image:"https://demo.casethemes.net/organio/wp-content/uploads/2021/03/product-category3.png",
    name:"Nuts & dried food",
    desc:"Purchasing from select family farmers who farm organically."
  },
  {
    alphabet:"S",
    color:"Brown",
    image:"https://demo.casethemes.net/organio/wp-content/uploads/2021/03/product-category4.png",
    name:"Spices",
    desc:"Purchasing from select family farmers who farm organically."
  },
  {
    alphabet:"V",
    color:"Brown",
    image:"https://demo.casethemes.net/organio/wp-content/uploads/2021/03/product-category1.png",
    name:"Vegetable",
    desc:"Purchasing from select family farmers who farm organically."
  },
]