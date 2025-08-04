import React from "react";
import { CartItem } from "../components/types";
import { useCart } from "../components/CartContext";
import "../styles/catalog.css"


type Props = {
  product: CartItem;
};

export const Catalog: React.FC<Props> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="catalog-page">
      <div style={{ border: "1px solid gray" }}>
        <h3>{product.name}</h3>
        <p>Цена: {product.price} ₽</p>
        <button
          onClick={() =>
            addToCart({
              ...product,
              quantity: 1,
              description: product.description ?? "",
            })
          }
        >
          Добавить в корзину
        </button>
      </div>
    </div>
  );
};      
