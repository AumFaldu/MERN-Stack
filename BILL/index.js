import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Home,Layout } from './Frontend';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Add from './AddBill';
import Edit from './EditBill';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}></Route>
        <Route path='/Bill' element={<Home />}></Route>
        <Route path='/Bill/add' element={<Add />}></Route>
        <Route path='/Bill/:id' element={<Edit />}></Route>
      </Routes>
    </BrowserRouter>
);

reportWebVitals();
