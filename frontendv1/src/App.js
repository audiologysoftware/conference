import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Home from './pages/Home'
import Users from './components/user';
import Manuscripts from './components/manuscript';

import Validation from './pages/Validation'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/login';
import AdminDashboard from './components/AdminDashboard';
import ReviewAbstract from './components/ReviewAbstract';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<Users />} />
        <Route path="/manuscript" element = {<Manuscripts />} />
        <Route path="/validation" element = {<Validation />} /> 
        <Route path="/admindashboard" element = {<AdminDashboard />} />
        <Route path="/login" element = {<Login />} />
        <Route path="/reviewer/:id" element = {<ReviewAbstract />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
