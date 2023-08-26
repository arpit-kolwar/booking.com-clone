import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './register.css'
import axios from 'axios'
import { useState } from 'react'

function Register() {

const [data,setData] =useState({
    username:"",
    email:"",
    password:""
})

const handleOnChange =(e)=>{

    setData((prev)=>({...prev,[e.target.id]: e.target.value }))
}

const navigate = useNavigate()

const handleRegister =async(e)=>{
    e.preventDefault()

    try {
        await axios.post("/auth/register",data)
        navigate('/login')
         
    } catch (error) {
        console.log(error);
    }

}


  return (
    <div className='register'>
        <div className='register-container'>
            <h2>REGISTER</h2>
            <input type="text" id='username' onChange={handleOnChange} className='username' placeholder='username'/>
            <input type="email" id='email' onChange={handleOnChange} className='email' placeholder='email'/>
            <input type="password" id='password' onChange={handleOnChange} className='password' placeholder='password' />
            <button className='rButton' onClick={handleRegister}> Register </button>
           
            <Link to={'/login'}>
            <h4>Already registered </h4> 
            </Link>
        </div> 
    </div>
  )
}

export default Register