import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './components/home/home';
import Product from './components/product/product';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { fetchProducts } from './api/products';


function App() {
  const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts().then(response => {
            setProducts(response.data);
        });
    }, []);
  return (
    <Router>
      <Routes>
        <Route element={<Home products={products}/>} path='/' />
        <Route element={<Product />} path='/product' />

      </Routes>
    </Router>
  );
}

export default App;
