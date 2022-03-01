import React from 'react'
import './HomePage.css'

export default function SectionBanner() {
    return (
        <section className='banner-container'>
            <div className="banner-content-container">

                <div className="banner-content">
                    <div className="content-container">
                        <h1>Choose the best Healthier way of life</h1>
                        <p>Leading Brand for Organic Food</p>
                        <button className="button-effect">Shop Now<i className="fas fa-arrow-right"></i></button>
                    </div>
                </div>

                <img className='banner-img-pur' src="https://demo.casethemes.net/organio/wp-content/uploads/2021/03/slider-layer1.png" alt="" />
                <img className='banner-img-purple' src="https://demo.casethemes.net/organio/wp-content/uploads/2021/03/slider-layer2.png" alt="" />
            </div>
            <img className='banner-img-bottom' src="https://demo.casethemes.net/organio/wp-content/uploads/2021/03/slider-bg1-scaled.jpg" alt="" />
        </section>
    )
}
