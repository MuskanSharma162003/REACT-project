import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Nav from './Components/Nav';
import './App.css';
import Signup from './Components/Signup';
import Login from './Components/Login';
import PrivateComponent from './Components/PrivateComponent';
import AddProduct from './Components/AddProduct';
import Products from './Components/Products';
import Update from './Components/Update';

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        {/* Protected routes */}
        <Route element={<PrivateComponent />}>
          <Route path="/" element={<Products/>} />
          <Route path="/add" element={<AddProduct/>}/>
          <Route path="/update/:id" element={<Update/>}/>
        </Route>
        
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
