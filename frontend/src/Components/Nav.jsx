// npm i react-router-dom
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  let navigate=useNavigate()
  let auth=localStorage.getItem("user")
  let handleLogout=()=>{
    localStorage.clear()
    navigate("/signup")

  }
  return (
    <nav>
       {auth?<ul>
        <li><Link to="/">Product</Link></li>
        <li><Link to="/add">Add Product</Link></li>
        <li><Link to="/signup" onClick={handleLogout}>Logout</Link></li>
        <li> ({JSON.parse(auth).email})</li>
       </ul>:
       <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        </ul>}
        

      
    </nav>
  );
};

export default Nav;

