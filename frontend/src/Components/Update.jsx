import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
const Update = () => {
  let navigate=useNavigate()
    let [data,setData]=useState({
        pName:"",
        pPrice:"",
        pDesc:"",
        pCategory:""
      })
    let params=useParams()

    const getApi=async()=>{
    let data=await fetch(`http://localhost:8000/updateprefill/${params.id}`,{
      headers:{
        authorization:JSON.parse(localStorage.getItem("token"))
      }
    })
    let res=await data.json()
    console.log(res)
    // console.log(setData.pName(res))
    setData({
        pName:res.pName,
        pPrice:res.pPrice,
        pDesc:res.pDesc,
        pCategory:res.pCategory
    })

    }
    useEffect(()=>{
        getApi()
    },[])

    
    
    let handleData=(e)=>{
     let{name,value}=e.target
     setData((prev)=>({...prev,[name]:value}))
    }
    let handleSubmit=async(e)=>{
        e.preventDefault()
        // console.log(data)
        let result=await fetch(`http://localhost:8000/updatedata/${params.id}`,{
          method:"PUT",
          headers:{
            "Content-Type":"application/json",
            "Accept":"application/json",
            authorization:JSON.parse(localStorage.getItem("token"))
          },
          body:JSON.stringify(data)
        })
        result=await result.json()
        console.log(result)
        if(result.message){
          navigate("/")
        }
    }
  return (
    <>
    <div id="signupheading"><h1>UPDATE PRODUCT</h1></div>
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
        <input type="submit" value="Update Product" />
      </div>
    </form>
    </>
    
  )
}

export default Update
