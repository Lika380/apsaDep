import { useCart } from "../components/CartContext";
import { useSearch } from "../components/SearchContext";
import "../styles/cart.css";
import { Link } from "react-router-dom";

export const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const { searchQuery } = useSearch();

  const filteredCart = cart.filter(item => {
    if (!searchQuery || !searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      (item.description && item.description.toLowerCase().includes(query))
    );
  });

  return (
    <div className="cartBlock">
      {filteredCart.length === 0 ? (
        <div className="empty-cart">
          <p>Корзина пуста</p>
          <p>Добавьте товары для оформления заказа</p>
        </div>
      ) : (
        <div className="cartCards">
          <div className="cartCardContent">
            {filteredCart.map((item) => {
  console.log("cart item:", item); 
        return (
          <div key={item.id} className="cartCard">
            <div className="product-image-cell">
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="cartItemImage"
                />
              )}
            </div>
            <div className="cartItemInfo">
              <div className="cart-title">
                <Link to={`/product/${item.id}`}
                  state={{ type: item.type || "default" }}
                  className="product-name-link"
                >
                  <h3 className="product-name">{item.name}</h3>
                  {item.description && (
                    <p className="product-description">{item.description}</p>
                  )}
                  <p>...подробнее</p> 
                </Link>
              </div>
              <div className="cart-price">
                <p className="cartItemPrice">{item.price.toLocaleString()} ₽</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="cartDeleteBtn"
                >
                  –
                </button>
              </div>
              <Link to={`/product/${item.id}`}  state={{ type: item.type || "default" }} className="product-name-link">
                <div className="cart-contact-the-seller">Связаться с продавцом</div>
              </Link>
            </div>
          </div>
        );
      })}
      
          </div>
        </div>
      )}
    </div>
  );
};
