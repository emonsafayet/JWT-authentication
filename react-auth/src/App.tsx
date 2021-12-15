import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";

import Login from './pages/Login';
import Nav from './components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';

function App() {
  const [name,setName]= useState('');
   
    useEffect(() => {
      (
          async()=>{
              const response= await fetch('http://localhost:28800/api/user',{
                  headers:{'Content-Type':'application/json'},
                  credentials:"include",
              });
              const content = await response.json();
              setName(content.name);
          }
      )();
      
  });


  return (
    <div className="App">
       <BrowserRouter> 
      <Nav/>
      {/* sign in/up form */}
      <main className="form-signin">
       
            <Routes>
              {/* <Route  path='/'  element={()=> <Home name={name}/>} /> */}
              <Route  path='/Login' element={<Login/>}/>
              <Route  path='/Register' element={<Register/>}/>  
          </Routes>         
      </main>
    </BrowserRouter>
    </div>
  );
}

export default App;
