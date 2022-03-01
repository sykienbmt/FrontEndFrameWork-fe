import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import './BestSeller.css'
import { Pagination } from '../../models/Pagination';
import { ProductLine } from '../../models/ProductLine';
import { productController } from '../../controllers/ProductController';
import ItemProduct from '../../pages/shop/ItemProduct';

type State={
    pagination:Pagination,
    listSeller: ProductLine[]
}

interface Props{
    pagination:Pagination
    numberShow:number
    title:string,
    desc:string
}

export default function SlideProduct(props:Props) {

    const [state,setState] = useState<State>({
        pagination: props.pagination,
        listSeller:[]
    })

    useEffect(()=>{
        productController.list(props.pagination).then(res=>{
            console.log(res);
            setState(prev=>({...prev,listSeller:res.productLines}))
        })
    },[])

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: props.numberShow,
        slidesToScroll: 1,
        nextArrow:<SampleNextArrow /> , 
        prevArrow:<SamplePrevArrow />
    };

  return <section className='best-seller-container'>
        <div className="best-seller" >
            <div className="best-seller-title">
                <p className="best-seller-product">
                    {props.title}
                </p>
                <h1 className="best-seller-desc">
                    {props.desc}
                </h1> 
            </div>
            <Slider {...settings}>
                {state.listSeller.length>0 && state.listSeller.map((item,index)=>{
                return <div style={{paddingBottom:"25px"}} key={index}>
                    <ItemProduct key={index} productLine={item} />
                    </div>
                    })}
            </Slider>
      </div>
  </section>;
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
