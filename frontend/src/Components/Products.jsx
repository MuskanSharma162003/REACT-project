import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


function Products() {
  let [api, setApi] = useState([])
  let getApi = async () => {
    let res = await fetch("http://localhost:8000/getproduct",{
      headers:{
        authorization:JSON.parse(localStorage.getItem("token"))
      }
    })
    let data = await res.json()
    console.log(data)
    setApi(data)
  }
  useEffect(() => {
    getApi()
  }
    , [])
  let handleDelete = async (id) => {
    let data = await fetch(`http://localhost:8000/deleteproduct/${id}`, {
      method: "DELETE",
      headers:{authorization:JSON.parse(localStorage.getItem("token"))}
    })
    let response = await data.json()
    if (response.message) {
      getApi()
    }
  }
  let handleSearch = async (e) => {
    let key = e.target.value
    // console.log(key)
    if (key) {
      let data = await fetch(`http://localhost:8000/search/${key}`,{
        headers:{
          authorization:JSON.parse(localStorage.getItem("token"))
        }
      })
      let response = await data.json()
      if (response) {
        setApi(response)
      }
    }
    else {
      getApi()
    }

  }
  return (
    <div className="product">
      <h1>Products</h1>
      <div style={{ display: "flex", justifyContent: "center", height: "4vh", width: "100%" }}><input type="search" name="search" id="search" onChange={handleSearch} placeholder='Search...............' /></div>
      <table className="product-table">
        <thead>
          <tr>
            <th>S No.</th>
            <th>Product Name</th>
            <th>Product Description</th>
            <th>Product Category</th>
            <th>Product Price</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {api.length > 0 ? (
            api.map((val, ind) => (
              <tr key={ind}>
                <td>{ind + 1}</td>
                <td>{val.pName}</td>
                <td>{val.pDesc}</td>
                <td>{val.pCategory}</td>
                <td>{val.pPrice}</td>
                <td><button onClick={() => { handleDelete(val._id) }}>delete</button></td>
                <td><button><Link to={`/update/${val._id}`}>Update</Link></button></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7"><h3 style={{textAlign:"center"}}>No Product Found</h3></td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  )
}

export default Products
