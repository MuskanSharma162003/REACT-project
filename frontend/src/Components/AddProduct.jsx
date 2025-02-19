import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function AddProduct() {
    let navigate=useNavigate()
    
    let [data,setData]=useState({
      pName:"",
      pPrice:"",
      pDesc:"",
      pCategory:""
    })
    let userId=JSON.parse(localStorage.getItem("user"))._id
    let handleData=(e)=>{
     let{name,value}=e.target
     setData((prev)=>({...prev,[name]:value,userId}))
    }

    
    // console.log(userId)
    let handleSubmit=async(e)=>{
        e.preventDefault()
        // console.log(data)

        let result=await fetch("http://localhost:8000/addproduct",{
            method:"POST",
            headers:{
              "Content-Type":"application/json",
              "Accept":"application/json",
              authorization:JSON.parse(localStorage.getItem("token"))
            },
            body:JSON.stringify(data)
          })
          result=await result.json()
          console.log(result)
         if(result.msg){
            alert(result.msg)
            navigate("/")
         }
         else{
            alert(result._message)
         }
    }
  return (
    <>
    <div id="signupheading"><h1>ADD PRODUCTS</h1></div>
    <form action="" onSubmit={handleSubmit} id="signupform">
      <div className="div">
        <label htmlFor="pName">Product Name</label>
        <input type="text" name="pName" id="pName" value={data.pName} onChange={handleData}/>
      </div><br />
      <div className="div">
        <label htmlFor="pPrice">Product Price</label>
        <input type="text" name="pPrice" id="pPrice" value={data.pPrice} onChange={handleData}/>
      </div><br />
      <div className="div">
        <label htmlFor="pDesc">Product Description</label>
        <textarea name="pDesc" id="pDesc" value={data.pDesc} onChange={handleData}></textarea>
      </div><br />
      <div className="div">
        <label htmlFor="pCategory">Product Category</label>
        <input type="text" name="pCategory" id="pCategory" value={data.pCategory} onChange={handleData}/>
      </div><br />
      <div className="div">
        <input type="submit" value="Add Product" />
      </div>
    </form>
  </>
  )
}

export default AddProduct
