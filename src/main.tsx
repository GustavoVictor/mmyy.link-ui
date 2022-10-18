import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserPage } from './pages/user';
import Login from './pages/login';
import Register from './pages/register';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/:nick' element={<UserPage />}/>
        <Route path='*' element={<Navigate to='/login' replace />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
