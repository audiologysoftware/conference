import React from 'react';
import Home from './pages/Home'
import Users from './components/user';
import Manuscripts from './components/manuscript';

import Validation from './pages/Validation'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<Users />} />
        <Route path="/manuscript" element = {<Manuscripts />} />
        <Route path="/validation" element = {<Validation />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
