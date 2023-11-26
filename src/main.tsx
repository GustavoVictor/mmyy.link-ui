import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserPage } from './pages-refact/user-page';
import Login from './pages/login';
import Register from './pages/register';
import { IndexPage } from './pages-refact/index-page';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/:nick' element={<UserPage />}/>
        <Route path='*' element={<Navigate to='/index' replace />}/>
        <Route path='/index' element={<IndexPage/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
