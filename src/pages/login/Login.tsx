import React, { useContext, useState } from 'react'
import GoogleLogin from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import { userController } from '../../controllers/UserController'
import { User } from '../../models/User'
import './Login.css'
const { v4: uuid } = require('uuid');

type State = {
    username: string,
    password: string,
    isRegister: boolean,
    rePass: string,
    errLogin: boolean,
    errRegMess:string,
}


const Login = () => {

    const [state, setState] = useState<State>({ 
        username: "", 
        password: "", 
        isRegister: false, 
        rePass: "", 
        errLogin: false ,
        errRegMess:"",
    })

    const userContext = useContext(UserContext)
    let navigate = useNavigate();

    const onCLickLogin = (e: any) => {
        e.preventDefault()
        userController.login(state.username, state.password).then(res => {
            console.log(res);
            if (res === false) {
                console.log("login fail");
                setState(prev => ({ ...prev, errLogin: true }))
            } else {
                console.log("done");
                navigate("/")
            }
        })
    }

    const onClickRegister= (e:any)=>{
        e.preventDefault()
        let isValid =false

        if(state.username==="" || state.password==="" || state.rePass===""){
            isValid=true
            setState(prev=>({...prev,errRegMess:"Please refill all information!"}))
            return
        }else if(state.password !== state.rePass){
            isValid=true
            setState(prev=>({...prev,errRegMess:"Password is not same!"}))
            return
        }

        if(isValid===false){
            console.log("register");
            setState(prev=>({...prev,errRegMess:""}))
            let user:User={address:"",email:"",idUser:uuid(),name:"",permission:"",phone:"",username:state.username,password:state.password}
            userController.create(user).then(res=>{
                if(res.success===false){
                    setState(prev=>({...prev,errRegMess:"Username is already exists!"}))
                    return
                }else{
                    userContext.setMess("Register successfully!")
                    setState(prev=>({...prev,isRegister:false,errLogin:false}))
                }
            })
        }
    }


    return (

        <section className='login-container'>
            <div className="background">
                <div className="shape" />
                <div className="shape" />
            </div>
            <form  autoComplete='false' style={state.isRegister == true ? { height: "620px" } : {}}>
                {state.isRegister ?
                    <div>
                        <h3>Register</h3>
                        <label htmlFor="username">Username</label>
                        <input type="text" 
                            onChange={e => setState({ ...state, username: e.target.value })}
                            value={state.username}
                            autoComplete='false'
                            placeholder="username" id="username" />
                        <label htmlFor="password">Password</label>
                        <input type="password" 
                            onChange={e => setState({ ...state, password: e.target.value })}
                            value={state.password}
                            autoComplete='false'
                            placeholder="Password" id="password" />
                        <label htmlFor="password">Re-Password</label>
                        <input type="password" 
                            onChange={e => setState({ ...state, rePass: e.target.value })}
                            value={state.rePass}
                            autoComplete='false'
                            placeholder="Re-pass" id="password" />
                        {state.errRegMess !== "" ?
                            <div style={{ position: 'relative', textAlign: 'center', width: '100%' }}>
                                <span style={{
                                    position: 'absolute', color: 'red', width: '100%', fontSize: '14px'
                                    , transform: "translate(-50%,-50%)",
                                    top: '20px',
                                    background: 'white'
                                }}>{state.errRegMess}</span>
                            </div> : ""
                        }

                        <button onClick={onClickRegister}>Register</button>
                        <p style={{ textAlign: "center", marginTop: '5px' }}>Ready have a account?
                            <span className='span-register'
                                onClick={() => 
                                    setState(prev => ({ ...prev, isRegister: !state.isRegister,username:"",password:"",rePass:"" }))
                                }
                                style={{ fontWeight: 'bold', cursor: 'pointer' }}>
                                Login
                            </span>
                        </p>
                    </div>
                    :
                    <div>
                        <h3>Login Here</h3>
                        <label htmlFor="username">Username</label>
                        <input type="text" 
                            onChange={e => setState({ ...state, username: e.target.value })} 
                            value={state.username}
                            placeholder="username" id="username" />
                        <label htmlFor="password">Password</label>
                        <input type="password" 
                            onChange={e => setState({ ...state, password: e.target.value })} 
                            value={state.password}
                            placeholder="Password" id="password" />
                        {state.errLogin === true ?
                            <div style={{ position: 'relative', textAlign: 'center', width: '100%' }}>
                                <span style={{
                                    position: 'absolute', color: 'red', width: '100%', fontSize: '14px'
                                    , transform: "translate(-50%,-50%)",
                                    top: '20px',
                                    background: 'white'
                                }}>Your username or password is incorrect</span>
                            </div> : ""
                        }
                        <button onClick={onCLickLogin}>Log In</button>
                        <p style={{ textAlign: "center", marginTop: '5px' }}>Don't have a account?
                            <span className='span-register'
                                onClick={()=>setState(prev => ({ ...prev, isRegister: !state.isRegister,username:"",password:"",rePass:"" }))}
                                style={{ fontWeight: 'bold', cursor: 'pointer' }}> Register</span>
                        </p>
                    </div>

                }
                <div className="social">
                    <div className="go">
                        <i className="fab fa-facebook" />  Google
                    </div>
                    <div className="fb"><i className="fab fa-facebook" />  Facebook</div>
                </div>
            </form>
        </section>

    )
}

export default Login
