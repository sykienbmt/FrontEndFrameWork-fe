import React from 'react';
import './Footer.css'
import { FaFacebookF,FaInstagram,FaBasketballBall,FaRegSmile,FaAngleRight } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { IoCall } from "react-icons/io5";


export default function Footer() {
  return <div className='footer-container' >
      <div className="container">
            <section className="section-1-mail-container">
                <div className="section-1-mail">
                    <div className="send-mail-img">
                        <img src="https://demo.casethemes.net/organio/wp-content/uploads/2021/03/mailchimp-image1.png" alt="" />
                    </div>
                    <div className="section-1-content">
                        <h2 className="title-section-1-mail">Subscribe to our Newsletter: </h2>
                        <div className="send-mail">
                            <input type="text" placeholder='Type your mail address...' />
                            <button>Subscribe</button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-2-info-container">
                <div className="section-2-info">
                    <div className="section-2-organico">
                        <div  className="section-2-img">
                            <img src="https://demo.casethemes.net/organio/wp-content/uploads/2021/03/logo-light.png" alt="" />
                        </div>
                        <p>We work with a passion of taking challenges and creating new ones in advertising sector.</p>
                        <div className="section-2-icon">
                            <FaFacebookF/> 
                            <FaInstagram/> 
                            <FaBasketballBall/> 
                            <FaRegSmile/>
                        </div>
                    </div>

                    <div className="section-2-link">
                        <h3>Links</h3>
                        <ul>
                            <li><FaAngleRight/> Home</li>
                            <li><FaAngleRight/> Services</li>
                            <li><FaAngleRight/> About Us</li>
                            <li><FaAngleRight/> Testimonials</li>
                            <li><FaAngleRight/> New</li>
                        </ul>
                    </div>

                    <div className="section-2-official">
                        <h3>Official info:</h3>
                        <div className="section-2-address">
                            <ul>
                                <li><span><GoLocation /></span><span>30 Commercial Road Fratton, Australia</span></li>
                                <li><span><IoCall/></span><span>1-888-452-1505</span></li>
                            </ul>
                        </div>
                        <h4>Open Hours</h4>
                        <p>Mon – Sat: 8 am – 5 pm,</p>
                        <p>Sunday: CLOSED</p>
                    </div>

                    <div className="section-2-instagram">
                        <h3>Instagram:</h3> 
                        <div className="section-2-image">
                            <img src="https://demo.casethemes.net/organio/wp-content/uploads/sb-instagram-feed-images/160592051_437679624012421_2157246266541466556_nthumb.jpg" alt="" />
                            <img src="https://demo.casethemes.net/organio/wp-content/uploads/sb-instagram-feed-images/160790142_520098882312680_7190864355709334403_nthumb.jpg" alt="" />
                            <img src="https://demo.casethemes.net/organio/wp-content/uploads/sb-instagram-feed-images/161271827_191172625791711_1225591762254058110_nthumb.jpg" alt="" />
                            <img src="https://demo.casethemes.net/organio/wp-content/uploads/sb-instagram-feed-images/160300357_262853852155134_4639421379710860544_nthumb.jpg" alt="" />
                            <img src="https://demo.casethemes.net/organio/wp-content/uploads/sb-instagram-feed-images/160824220_272293631058951_25353289917148256_nthumb.jpg" alt="" />
                            <img src="https://demo.casethemes.net/organio/wp-content/uploads/sb-instagram-feed-images/161432828_1556196047918593_925226802758570664_nthumb.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-3-info">
                <div className="section-3-content">
                    <p>© 2022  – CaseThemes. All rights reserved.</p>
                </div>
            </section>
      </div>
  </div>;
}
