import React from 'react'
import './Section2.css'

export default function Section2() {
    return (
        <div className='section-2-container'>
            <div className="section-2-content">
                <div className="section-2-item section-2-item1">
                    <div>
                        <h3>Get 10% off on Vegetables</h3>
                        <p>Shop our selection of organic fresh vegetables in a discounted price. 10% off on all vegetables</p>
                        <button className="button-effect">Shop Now<i className="fas fa-arrow-right"></i></button>
                    </div>
                    <img src="https://demo.casethemes.net/organio/wp-content/uploads/2021/03/banner-fixed1.png" alt="" className="section-2-img-back" />
                    <img src="https://demo.casethemes.net/organio/wp-content/uploads/2021/03/banner-animate1.png" className="section-2-img-front" />

                </div>
                <div className="section-2-item section-2-item2">
                    <div>
                        <h3>Get garden fresh fruits</h3>
                        <p>Shop our selection of organic fresh vegetables in a discounted price. 10% off on all vegetables</p>
                        <button className="button-effect">Shop Now<i className="fas fa-arrow-right"></i></button>
                    </div>
                    <img src="https://demo.casethemes.net/organio/wp-content/uploads/2021/03/banner-fixed2.png" alt="" className="section-2-img-back" />
                    <img src="https://demo.casethemes.net/organio/wp-content/uploads/2021/03/banner-animate2.png" className="section-2-img-front" />
                </div>
            </div>
        </div>
    )
}
