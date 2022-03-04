import React, { useContext } from 'react'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HomePage.css'
import OrganicFood from './OrganicFood'
import Section2 from './Section2'
import SectionBanner from './SectionBanner'
import SimpleSlider from './SlideCategory'
import SlideProduct from '../../components/slide/SlideProduct';
import { WishListContext } from '../../contexts/WishListContext';
import Slider from 'react-slick';

export default function HomePage() {
    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        
    };

    return (
        <div className='home-page-container'>
            <Slider {...settings}>
                <SectionBanner />
                <SectionBanner />
            </Slider>
            <Section2 />
            <OrganicFood />
            <SimpleSlider />
            <SlideProduct 
                numberShow={4} 
                pagination={{ page: 1, perPage: 8, search: "", idCategory: "", select: "sellDown",from:0,to:1000 }} 
                title='~ Best Seller ~'
                desc='All of our products are organic & fresh.'
            />
        </div>
    )
}
