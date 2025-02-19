import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import "./Signup.css"

function Signup() {
  let navigate=useNavigate()
  let [data,setData]=useState({
    name:"",
    email:"",
    password:""
  })
  let handleData=(e)=>{
   let{name,value}=e.target
   setData((prev)=>({...prev,[name]:value}))
  }
  let handleSubmit=async(e)=>{
    e.preventDefault()
    // console.log(data)
    
    // api
    let result=await fetch("http://localhost:8000/signup",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body:JSON.stringify(data)
    })
    result=await result.json()
    console.log(result)

    //login/signup navigate
    if(result.msg){
      alert(result.msg)
      navigate("/login")
    }
    else {
      if(result.token){
        setTimeout(()=>{
          alert(result.message)
          //set the user in localstorage
          localStorage.setItem("user",JSON.stringify(result.data))
          localStorage.setItem("token",JSON.stringify(result.token))
          navigate("/")
        },1000)
      }
    }

  }
  return (
    <>
      <div id="signupheading"><h1>SIGN UP FORM</h1></div>
      <form action="" onSubmit={handleSubmit} id="signupform">
        <div className="div">
          <label htmlFor="name">Enter Name</label>
          <input type="text" name="name" id="name" value={data.name} onChange={handleData}/>
        </div><br />
        <div className="div">
          <label htmlFor="email">Enter Email</label>
          <input type="email" name="email" id="email" value={data.email} onChange={handleData}/>
        </div><br />
        <div className="div">
          <label htmlFor="email">Enter Password</label>
          <input type="password" name="password" id="password" value={data.password} onChange={handleData}/>
        </div><br />
        <div className="div">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </>
  )
}

export default Signup

