import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import './Error404.css'

export default function Error404() {
    return (
        <div className='err-404-container'>
            <div className="err-404-content">
                <div className="err-404-image">
                    <img src="https://demo.casethemes.net/organio/wp-content/themes/orgio/assets/images/image-404.png" alt="" />
                </div>
                <h1>Page Not Found</h1>

                <p>Something went wrong, looks like this page doesn't exist anymore.</p>
                <Link to={'/'}><Button id='button-404'>Back to Home</Button></Link>
            </div>
        </div>
    )
}
