// pages/CartPage.tsx
import React from "react";
import { Cart } from "../components/Cart";
import '../styles/cartPage.css'

export default function CartPage() {
  return (
    <div className="cartPage">
        <div className="cartPageContent">
            <h2>Корзина</h2>
            <Cart />
        </div>
    </div>
  );
}
