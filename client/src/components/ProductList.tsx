import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import { useSearch } from "./SearchContext";
import "../styles/product.css";
import { getProducts } from "../utils/api";
import cartIcon from "../../public/cart.png"


interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  category_id: number;
  image_url?: string;
  stock_quantity: number;
  subCategoryId?: string; // Добавляем поле подкатегории
}

interface ProductListProps {
  category_id?: number;
  selectedCategory?: string;
  selectedSubcategory?: string;
  viewMode?: "grid" | "list";
  sortOption?: string;
  onProductsCountChange?: (count: number) => void;
  subCategoryId?: string;
  searchQuery?: string; 
}


export const ProductList: React.FC<ProductListProps> = ({
  category_id,
  selectedCategory,
  selectedSubcategory,
  viewMode = "grid",
  sortOption = "default",
  onProductsCountChange,
  subCategoryId,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { searchQuery } = useSearch(); // ✅ используешь только его

  const getSubcategoryNameById = (id: string): string => {
    const map: Record<string, string> = {
      "501": "Микроволновки",
      "502": "Холодильники",
      "503": "Телевизоры",
      "504": "Стиральные машины",
      "505": "Пылесосы",
      "506": "Утюги",
      // и т.д.
    };
    return map[id] || "Неизвестная подкатегория";
  };
  
  useEffect(() => {
    const hasCategory = category_id !== undefined && category_id !== null;
    const hasSubcategory = subCategoryId !== undefined && subCategoryId !== null && subCategoryId !== "";
    const hasSearch = searchQuery && searchQuery.trim() !== "";
  
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
  
        const data = await getProducts({ category_id, searchQuery, subCategoryId });
  
        const enrichedData = data.map((product: any) => ({
          ...product,
          subcategory: getSubcategoryNameById(product.subCategoryId),
        }));
  
        setProducts(enrichedData);
      } catch (err) {
        setError("Ошибка загрузки товаров");
        console.error("Ошибка загрузки товаров:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [category_id, subCategoryId, searchQuery]);
  
  
  useEffect(() => {
    let filtered = products;
  
    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.subCategoryId?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query)
      );
    } else {
      if (selectedCategory && selectedCategory !== "all") {
        filtered = filtered.filter(
          (product) => product.category_id === Number(selectedCategory)
        );
      }
  
      if (selectedSubcategory && selectedSubcategory.toLowerCase() !== "all") {
        filtered = filtered.filter(
          (product) =>
            product.subCategoryId?.toLowerCase() === selectedSubcategory.toLowerCase()
        );
      }
    }
  
    setFilteredProducts(filtered);
    if (onProductsCountChange) {
      onProductsCountChange(filtered.length);
    }
  }, [products, selectedCategory, selectedSubcategory, searchQuery, onProductsCountChange]);
  
  // Сортировка
  const getSortedProducts = () => {
    if (sortOption === "default") {
      return filteredProducts;
    }

    return [...filteredProducts].sort((a, b) => {
      switch (sortOption) {
        case "price_asc":
          if (a.price !== b.price) return a.price - b.price;
          return a.name.localeCompare(b.name, "ru");
        case "price_desc":
          if (a.price !== b.price) return b.price - a.price;
          return a.name.localeCompare(b.name, "ru");
        case "name_asc":
          return a.name.localeCompare(b.name, "ru", { numeric: true });
        case "name_desc":
          return b.name.localeCompare(a.name, "ru", { numeric: true });
        case "popular":
          if (a.stock_quantity !== b.stock_quantity)
            return b.stock_quantity - a.stock_quantity;
          return a.name.localeCompare(b.name, "ru");
        case "availability":
          if (a.stock_quantity > 0 && b.stock_quantity === 0) return -1;
          if (a.stock_quantity === 0 && b.stock_quantity > 0) return 1;
          return a.price - b.price;
        default:
          return 0;
      }
    });
  };

  const displayProducts = getSortedProducts();

  const handleAddToCart = (product: Product) => {
    console.log("Добавляем товар в корзину:", product);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image_url: product.image_url,
      description: product.description || "",
    });
  };

  if (loading) return <div className="loading">Загрузка товаров...</div>;
  if (error) return <div className="error">{error}</div>;
  if (displayProducts.length === 0) {
    const noProductsMessage = selectedSubcategory
      ? `Товары в категории не найдены`
      : "Товары не найдены";
    return <div className="no-products">{noProductsMessage}</div>;
  }

  return (
    <div
      className={`product-list ${
        viewMode === "list" ? "product-list-view" : "product-grid-view"
      }`}
    >
      {displayProducts.map((product) => (
        <div
          key={product.id}
          className={`product-card ${
            viewMode === "list" ? "product-card-list" : "product-card-grid"
          }`}
        >
          <div className="product-image-cell">
            {product.image_url && (
              <img
                src={product.image_url}
                alt={product.name}
                className="product-image-admin"
              />
            )}
          </div>
          <div className="product-info">
            {viewMode === "list" ? (
              <>
                <div className="product-list-info-right">
                  <div className="product-price">
                    {product.price.toLocaleString()} ₽
                  </div>
                  <div className="product-list-info-left">
                    <h3 className="product-name">{product.name}</h3>
                    {product.description && (
                      <p className="product-description">{product.description}</p>
                    )}
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock_quantity === 0}
                      className="add-to-cart-btn"
                    >
                      <img
                        src="/cart.png"
                        alt="cart"
                        className="cart-card-icon"
                      />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
         <Link to={`/product/${product.id}?type=popular`} className="product-name-link">
                <h3 className="product-name">{product.name}</h3>
                {product.description && (
                  <p className="product-description">{product.description}</p>
                )}
               
                <p>...подробнее</p> 
                </Link>
                <div className="cart-price-productStock">
                  <div className="product-price">
                    {product.price.toLocaleString()} ₽
                  </div>
                  <a
                    onClick={() => addToCart({
                        id: product.id.toString(),
                        name: product.name,
                        price: product.price,
                        image_url: product.image_url,
                        quantity: 1, 
                        description: product.description,
                      })}
                      className="add-to-cart-btn"
                      style={{ cursor: 'pointer' }}
                    >
                      <img src={cartIcon} alt="icon" className="product-details-cart-img" />
                    </a>
                </div>
                <Link to={`/product/${product.id}?type=popular`} className="product-name-link">
                <div className="contact-the-seller">Связаться с продавцом</div>
                </Link>
              </>
              
            )}
            
          </div>
        </div>
        
      ))}
    </div>
  );
};
