import { useState } from 'react'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import ProductPage from './pages/products/ProductPage';
import SingleProductPage from './pages/singleProduct/SingleProductPage';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/product" element={<ProductPage />} />
        <Route path="/product/:id" element={<SingleProductPage />} />
        <Route path="*" element={<ProductPage />} />
      </Routes>
    </div>
  );
}

export default App
