import React, { useState } from 'react'
import "./Signup.css"
import { useNavigate } from 'react-router-dom'

function Login() {
  let navigate=useNavigate()
    let[email,setEmail]=useState("")
    let[password,setPassword]=useState("")
    let handleSubmit=async(e)=>{
        e.preventDefault()

      //  api
        let result=await fetch("http://localhost:8000/login",{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
          },
          body:JSON.stringify({email,password})
        })
        result=await result.json()
        console.log(result)


        // 
        if(result.msg){
          alert(result.msg)
        }
        else if(result.data.name){
          if(result.token){
            alert("login successfull")
            localStorage.setItem("user",JSON.stringify(result.data))
            localStorage.setItem("token",JSON.stringify(result.token))
            navigate("/")
          }
          
        }

        // console.log({email,password})
    }
  return (
    <div>
         <div id="signupheading" style={{fontSize:"16px"}}><h1>LOGIN FORM</h1></div>
       <form action="" onSubmit={handleSubmit} id="signupform">
        <div className="div">
          <label htmlFor="email" style={{fontSize:"16px"}}>Enter Email</label>
          <input type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div><br />
        <div className="div">
          <label htmlFor="email" style={{fontSize:"16px"}}>Enter Password</label>
          <input type="password" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div><br />
        <div className="div">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  )
}

export default Login
