import React from 'react'

export default function OrganicFood() {
    return (
        <section className='organic-container'>
            <div className="organic-content-page">
                <div className="organic-content">
                    <div className="organic-content-img">
                        <img src="https://demo.casethemes.net/organio/wp-content/uploads/2021/03/about-img2.jpg" alt="" />
                    </div>
                </div>
                <div className="organic-content-right">
                    <h3 className="organic-content-title">~ About us ~</h3>
                    <h1 className="organic-title">We believe in working with accredited farmers</h1>
                    <p className="organic-desc1">Organic Foods and Café is a family run company founded in 2004 that runs organic supermarkets</p>
                    <p className="organic-desc2">Organic means growing our food, which is to nourish us, without chemical aids during the growing process such as fertilisers, pesticides, fungcides, herbacides, larbicides etc</p>
                    <div className="organic-why">
                        <div className="why-organic">
                            <div className="why-organic-img">
                                <img src="https://demo.casethemes.net/organio/wp-content/uploads/2021/03/organic-food.png" alt="" />
                            </div>
                            <div className="organic-why-right">
                                <h3 className="organic-why-title">Why Organic?</h3>
                                <p className="organic-why-desc"><span>We're making room for self care today with plan.</span></p>
                            </div>
                        </div>
                        <div className="why-organic">
                            <div className="why-organic-img">
                                <img src="https://demo.casethemes.net/organio/wp-content/uploads/2021/03/organic-food2.png" alt="" />
                            </div>
                            <div className="organic-why-right">
                                <h3 className="organic-why-title">Speciality Produce</h3>
                                <p className="organic-why-desc"><span>We're making room for self care today with plan.</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
