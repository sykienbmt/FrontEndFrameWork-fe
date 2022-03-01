import React from 'react'
import './AddressSection.css'
import { FcNext } from "react-icons/fc";
import { Link } from 'react-router-dom';

interface Props{
    page: string,
    home:string,
    current:string
}


export default function AddressSection(props:Props) {
    return (
        <div id='address-bar-container' >
            <div className="address-bar-mask">
                <div className="address-bar-content">
                    <h1>{props.page}</h1>
                    <p style={{display:'flex',alignItems:"center"}}>
                        <Link to={'/'}><span>{props.home} </span></Link>
                        <FcNext />
                        <span>{props.current}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
