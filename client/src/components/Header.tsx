import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // добавили useLocation
import { useCart } from "./CartContext";
import { useSearch } from "./SearchContext";
import "../components/Header.css";
import "../styles/loginModal.css";
import { AuthPage } from "../components/AuthPage";
import { UserDropdown } from "../components/UserDropdown";
import { useAuth } from "../hooks/useAuth";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getItemsCount } = useCart();
  const { searchQuery, setSearchQuery } = useSearch();
  const navigate = useNavigate();
  const location = useLocation(); // текущий путь
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { isAuthenticated } = useAuth();


  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);
  



  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate("/catalog");
  };

  // Проверяем текущий путь
  const showSearch =
    location.pathname === "/catalog" || location.pathname === "/cartPage";

  return (
    <header className={`header ${isScrolled ? "header-scrolled" : ""}`}>
      <nav className="header-nav">
        <div className="header-content">
          <a href="/" className="logo">ApsaMarket</a>

          {showSearch && (
            <form className="header-search-form" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Поиск по товарам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="header-search-input"
              />
              <button type="submit">
                <img src="/search.png" alt="search" className="header-search-icon" />
              </button>
            </form>
          )}

      <button
        className={`mobile-menu-btn ${isMobileMenuOpen ? "active" : ""}`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Меню"
      >
        <span></span><span></span><span></span>
      </button>


          <div className="headerAction">
            <a href="/cartPage" className="actionIcon">
              <img src="/cart.png" alt="cart" className="header-icon" />
              {getItemsCount() > 0 && (
                <span className="icon-badge">{getItemsCount()}</span>
              )}
            </a>
            <a href="/catalog" className="catalog">Каталог</a>
            <a href="#" className="header-phone">+7 (940) 900-14-16</a>
            <div className="authBtn">
              {isAuthenticated ? (
                <UserDropdown />
              ) : (
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="actionIcon-btn"
                >
                  Войти
                </button>
              )}
              <AuthPage isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
            </div>
          </div>
        </div>
      </nav>
      <div
  className={`mobileMenu ${isMobileMenuOpen ? "active" : ""}`}
  ref={mobileMenuRef}
>
  <div className="mobileMenu-inner">
    <button
      className="close-mobile-menu"
      aria-label="Закрыть меню"
      onClick={() => setIsMobileMenuOpen(false)}
    >
      ✕
    </button>

    <nav className="mobileMenu-list">
    <a href="/" onClick={() => setIsMobileMenuOpen(false)}>
        Главная
      </a>
      <a href="/catalog" onClick={() => setIsMobileMenuOpen(false)}>
        Каталог
      </a>
      <a href="/cartPage" onClick={() => setIsMobileMenuOpen(false)}>
        Корзина {getItemsCount() > 0 && <span className="icon-badge">{getItemsCount()}</span>}
      </a>
        
      {isAuthenticated ? (
        <UserDropdown />
      ) : (
        <button
          onClick={() => {
            setIsAuthOpen(true);
            setIsMobileMenuOpen(false);
          }}
          className="actionIcon-btn"
        >
          Войти
        </button>
      )}
     
    </nav>
  </div>
</div>
    </header>
  );
};

export default Header;
