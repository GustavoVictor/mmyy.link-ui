import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserPage } from './pages/user';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/:nick" element={<UserPage />}>
          {
          // <Route index element={<Home />} />
          // <Route path="blogs" element={<Blogs />} />
          // <Route path="contact" element={<Contact />} />
          // <Route path="*" element={<NoPage />} />
          }
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
