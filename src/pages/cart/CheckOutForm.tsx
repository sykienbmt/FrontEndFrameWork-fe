import React, { useContext, useState } from 'react';
import './CheckOutForm.css'
import { TextField } from '@mui/material';
import { CartContext } from '../../contexts/CartContext';
import { UserContext } from '../../contexts/UserContext';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { User } from '../../models/User';
import ItemPayment from './ItemPayment';


type State={
  user:User,
  payment:string,
  note:string
}

export default function CheckOutForm() {
  const userContext = useContext(UserContext)
  const cartContext = useContext(CartContext)

  const [state,setState] = useState<State>({user:userContext.user,payment:'COD',note:""})

  const textField={
    mt:"15px"
  }

  const styleRadio={
    width:"100%",
    border:"1px solid #ddd",
    borderRadius:"25px",
    mt:"15px"
  }

  console.log('payment',state.payment );
  

  return <div style={{display:"flex"}}>
    <div className='payment-container' >
      <div className="user-information-container">
        <h2>Delivery Address</h2>
        <TextField sx={textField} 
          label="Email" 
          variant="outlined" 
          defaultValue={state.user.email}
          onChange={e=>setState({...state,user:{...state.user,email:e.target.value}})}
        />
        <TextField 
          sx={textField} 
          label="Full name" 
          variant="outlined" 
          defaultValue={state.user.name}
          onChange={e=>setState({...state,user:{...state.user,name:e.target.value}})}
        />
        <TextField 
          sx={textField} 
          label="Phone Number" 
          variant="outlined" 
          defaultValue={state.user.phone}
          onChange={e=>setState({...state,user:{...state.user,phone:e.target.value}})}
        />
        <TextField 
          sx={textField} 
          label="Address" 
          variant="outlined" 
          defaultValue={state.user.address}
          onChange={e=>setState({...state,user:{...state.user,address:e.target.value}})}
        />
        <TextField sx={textField} 
          label="Note"
          multiline
          rows={4}
          onChange={e=>setState({...state,note:e.target.value})}
        />
      </div>

      <div className="choose-shipping-container">
        <FormControl sx={{width:'100%'}}>
        <FormLabel id="demo-radio-buttons-group-label">Your payment</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={state.payment}
          onChange={e=>setState({...state,payment:e.target.value})}
          name="radio-buttons-group"
          
        >
          <FormControlLabel sx={styleRadio} value="COD" control={<Radio />} label="Payment with COD" />
          <FormControlLabel sx={styleRadio} value="Banking" control={<Radio />} label="Payment with Banking" />
          <FormControlLabel sx={styleRadio} value="Momo" control={<Radio />} label="Payment with MoMo" />
        </RadioGroup>
      </FormControl>

      </div>
    </div>
    <div className="list-cart-payment-container">
        <h2 style={{marginBottom:"15px"}}>Your Cart</h2>
        <div style={{padding:"10px"}}  className="payment-cart-container">
          <div>
          {cartContext.itemCarts.map(item=>{
            return <ItemPayment key = {item.idProduct} item={item} />
          })}
          </div>
        </div>
        <p className='total-page-payment'><span></span>Total: <span>${cartContext.totalMoney}</span></p>
        <div className="button-done-payment" style={{width:"100%",textAlign:"right",paddingTop:"25px",paddingRight:"20px"}}>
          <button className="btn-payment-done btn-green" onClick={()=>cartContext.checkout(state.user,state.payment)}>Complete</button>
        </div>
    </div>
  </div>
  ; 
}
