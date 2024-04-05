/* This component will render below 3 component 
    1. products Page
    2. product details page 
    3. placing the order component 
*/
import Productspage from "../products/productspage";
import ProductDetailPage from "../productDetailPage/productDetailPage";
import SignUpForm from "../../common/SignUpForm";
import SignInForm from "../../common/SignInForm";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import productStore from "../product-store/product-store";
import { useSelector } from "react-redux";

export default function ShoppingCartFlow() {
    const navigate = useNavigate();
    function navigateToProductDetail(productId) {
        navigate(`/ProductDetail/${productId}`);
    }

    return (
        <div>
            <Routes>
                <Route exact path='/' element={<SignInForm />} />
                <Route exact path='/signup' element={<SignUpForm />} />
                <Route exact path='/products' element={<Productspage navigateToProductDetail={navigateToProductDetail} />} />
                <Route exact path='/ProductDetail/:productId' element={<ProductDetailPage />} />
            </Routes>

        </div>
    )
}