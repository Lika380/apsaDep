import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { api, tokenUtils } from "../utils/api";
import "../styles/productDetails.css";
import { useCart } from "../components/CartContext";
import cartIcon from "../../public/cart.png";
import { useAuth } from "../hooks/useAuth";
import WA from '../images/WA.png';
import IG from '../images/IG.png';
import { API_BASE_URL } from "../config";

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  stock_quantity: number;
  instagram?: string;
  whatsapp?: string;
  website?: string;
  subCategory?: string;
}

interface Review {
  id: number;
  user_id: number;
  user_identifier: string; // email или телефон
  text: string;
  created_at: string;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");

  const location = useLocation();
const searchParams = new URLSearchParams(location.search);
const type = (location.state as any)?.type || "products";

useEffect(() => {
  (async () => {
    setLoading(true);
    try {
      const data = await api.getProductByType(type || "", id!);
      setProduct(data);
      setError(null);
    } catch {
      setError("Ошибка загрузки товара");
    } finally {
      setLoading(false);
    }
  })();
}, [id, type]);

  

  // Загрузка отзывов с использованием api.getReviews
  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoadingReviews(true);
      try {
        const data = await api.getReviews(id);
        setReviews(data);
      } catch {
        setReviews([]);
      } finally {
        setLoadingReviews(false);
      }
    })();
  }, [id]);

  const normalizeInstagramUrl = (inst?: string) => {
    if (!inst) return null;
    if (inst.startsWith("http://") || inst.startsWith("https://")) {
      return inst;
    }
    return `https://instagram.com/${inst.replace(/^@/, "")}`;
  };

  // Отправка нового отзыва
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setReviewMessage("Чтобы оставить отзыв, нужно войти в аккаунт.");
      return;
    }
    if (!reviewText.trim()) return;

    try {
      const token = tokenUtils.getToken();

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          productId: id,
          text: reviewText.trim(),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Ошибка отправки отзыва");
      }

      const newReview = await res.json();

      setReviews((prev) => [
        {
          id: newReview.reviewId,
          user_id: user.id,
          user_identifier: user.email || user.phone || "Вы",
          text: reviewText.trim(),
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);

      setReviewText("");
      setReviewMessage("Спасибо за отзыв!");
    } catch (error: any) {
      setReviewMessage(error.message || "Ошибка при отправке отзыва");
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (error || !product) return <div>{error || "Товар не найден"}</div>;

  const handleDeleteReview = async (reviewId: number) => {
    if (!window.confirm("Удалить этот отзыв?")) return;

    try {
      const token = tokenUtils.getToken();

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/api/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Ошибка при удалении отзыва");
      }

      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    } catch (err: any) {
      alert(err.message || "Ошибка удаления отзыва");
    }
  };

  return (
    <div className="product-details">
        <h2 className="product-card-name">Карточка товара</h2>
      <div className="product-details-content">
        <div className="product-detail-img">
          {product.image_url && <img src={product.image_url} alt={product.name} style={{ maxWidth: 600 }} />}
        </div>
        <div className="product-detail-info">
          <div className="product-detail-info-content">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <div className="product-detail-info-price-cart">
              <p className="product-detail-info-price">
                <strong>Цена:</strong> {product.price.toLocaleString()} ₽
              </p>
            </div>
            <button
                onClick={() => {
                  if (product) {
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image_url: product.image_url,
                      quantity: 1,
                      description: product.description || "",
                      type: "popular", 
                    });
                  }
                }}
                className="product-details-cart-button"
                style={{ cursor: "pointer", background: "none", border: "none" }}
              >
               Добавить в корзину
              </button>
            <div className="contact-buttons">
              <p>Связаться с продавцом</p>
              {product.website && (
                <a
                  href={product.website.startsWith("http") ? product.website : `https://${product.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-website"
                >
                  Cайт
                </a>
              )}

              {product.instagram && (
                <a href={normalizeInstagramUrl(product.instagram) || "#"} target="_blank" rel="noopener noreferrer">
                      <img src={IG} alt="iconIG" className="cart-footer-icon" />
                </a>
              )}

              {product.whatsapp && (
                <a
                  href={`https://wa.me/${product.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <img src={WA} alt="iconWA" className="cart-icon-wa" />
                </a>
              )}
            </div>

            
          </div>
          
        </div>
        
      </div>
      <div className="reviews-section">
              <h3>Отзывы</h3>

              {user ? (
                <form onSubmit={handleReviewSubmit} className="reviews-section-input">
                  <textarea
                    placeholder="Ваш отзыв..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                    rows={4}
                    
                  />
                  <button type="submit">Отправить отзыв</button>
                  {reviewMessage && <p>{reviewMessage}</p>}
                </form>
              ) : (
                <p>
                  Чтобы оставить отзыв, <a href="/login">войдите в аккаунт</a>.
                </p>
              )}

              {loadingReviews ? (
                <p>Загрузка отзывов...</p>
              ) : (
                <div className="reviews-list" style={{ marginTop: 20 }}>
                  {reviews.length === 0 && <p>Отзывов пока нет.</p>}
                  {reviews.map((r) => (
                    <div key={r.id} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
                      <p>
                        <strong>{r.user_identifier}</strong> <em>({new Date(r.created_at).toLocaleString()})</em>
                      </p>
                      <p>{r.text}</p>

                      {user?.role === "admin" && (
                        <button
                          onClick={() => handleDeleteReview(r.id)}
                          style={{
                            background: "transparent",
                            color: "red",
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                            fontSize: "0.9em",
                          }}
                        >
                          Удалить
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
         </div>
    </div>
  );
};

export default ProductDetails;
