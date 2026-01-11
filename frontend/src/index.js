import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import './index.css';

import HomePage from './landing_page/home/HomePage';
import SignUp from "./landing_page/signup/SignUp";
import LoginPage from "./landing_page/login/LoginPage";
import AboutPage from "./landing_page/about/AboutPage";
import ProductPage from "./landing_page/product/ProductPage";
import PricingPage from "./landing_page/pricing/PricingPage";
import SupportPage from "./landing_page/support/SupportPage";

import Navbar from './landing_page/Navbar';
import Footer from './landing_page/Footer';
import NotFound from './landing_page/NotFound';

import { AuthProvider } from "./authContext";
import ProtectedRoute from "./ProtectedRoute";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
  <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />

        
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </AuthProvider>
);
