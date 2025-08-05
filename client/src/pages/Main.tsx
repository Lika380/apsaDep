import React, { useRef, useState, useEffect } from "react";
import iPhoneMain from '../images/iPhone.png';
import cartIcon from "../../public/cart.png"
import '../styles/Main.css';
import MainProjects from "../components/MainProjects";
import { Link } from "react-router-dom";
import { CategoryProduct } from "../utils/api"; 
import { useCart } from "../components/CartContext";
import { useSearch } from "../components/SearchContext";
import { API_BASE_URL } from "../config";

const slides = [
  { img: "https://i.postimg.cc/76BJk1WF/Frame_1529.jpg" },
  { img: 'https://i.postimg.cc/MHvMKMkv/Frame_1525.jpgg' },
  { img: 'https://i.postimg.cc/6qg77Wwz/Frame_1524.jpg' }
];

const cards = [
  { img: "https://i.postimg.cc/qBywFDXv/Frame-1502.png", btnCart: 'hgjhg', btnHeart: iPhoneMain, btnSearch: iPhoneMain, title: 'Ауадхара', p: "120₽" },
  { img: "https://i.postimg.cc/R0WQLgZ9/Frame-1503.png", btnCart: iPhoneMain, btnHeart: iPhoneMain, btnSearch: "https://i.postimg.cc/qBywFDXv/Frame-1502.png", title: 'Вино "Aчба Иашта"', p: "3400₽" },
  { img: "https://i.postimg.cc/R0WQLgZ9/Frame-1503.png", btnCart: iPhoneMain, btnHeart: iPhoneMain, btnSearch: iPhoneMain, title: 'MacBook Air ', p: "$65.00 USD" },
  { img: "https://i.postimg.cc/qBywFDXv/Frame-1502.png", btnCart: iPhoneMain, btnHeart: iPhoneMain, btnSearch: iPhoneMain, title: 'Apple Watch Ultra', p: "$65.00 USD" },
  { img: "https://i.postimg.cc/R0WQLgZ9/Frame-1503.png", btnCart: 'hgjhg', btnHeart: iPhoneMain, btnSearch: iPhoneMain, title: 'Apple AirPods Max', p: "$55.00 USD" },
  { img: "https://i.postimg.cc/qBywFDXv/Frame-1502.png", btnCart: iPhoneMain, btnHeart: iPhoneMain, btnSearch: iPhoneMain, title: 'iPhone 16 ', p: "$65.00 USD" },
];

const Main: React.FC = () => {
  const { searchQuery } = useSearch();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<string | null>(null);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null); // корректный тип

  const [offers, setOffers] = useState<Record<string, string>>({});

  const { addToCart } = useCart();
  

  const [popularCards, setPopularCards] = useState<Array<{
    id: number;
    name: string;
    price: string;
    image_url?: string;
    description?: string;
    instagram?: string;
    whatsapp?: string;
    website?: string;  
    type?: string; 
  }>>([]);

  const [category1Cards, setCategory1Cards] = useState<Array<{
    id: number;
    name: string;
    price: string;
    image_url?: string;
    description?: string;
    instagram?: string;
    whatsapp?: string;
    website?: string;  
    type?: string; 
  }>>([]);

  const [category2Cards, setCategory2Cards] = useState<Array<{
    id: number;
    name: string;
    price: string;
    image_url?: string;
    description?: string;
    instagram?: string;
    whatsapp?: string;
    website?: string; 
    type?: string;  
  }>>([]);

  const [category3Cards, setCategory3Cards] = useState<Array<{
    id: number;
    name: string;
    price: string;
    image_url?: string;
    description?: string;
    instagram?: string;
    whatsapp?: string;
    website?: string;  
    type?: string; 
  }>>([]);

  const [category4Cards, setCategory4Cards] = useState<Array<{
    id: number;
    name: string;
    price: string;
    image_url?: string;
    description?: string;
    instagram?: string;
    whatsapp?: string;
    website?: string;  
    type?: string; 
  }>>([]);

  const [category5Cards, setCategory5Cards] = useState<Array<{
    id: number;
    name: string;
    price: string;
    image_url?: string;
    description?: string;
    instagram?: string;
    whatsapp?: string;
    website?: string;  
    type?: string; 
  }>>([]);

  const filterCards = (cardsArray: typeof popularCards) => {
    if (!searchQuery || !searchQuery.trim()) return cardsArray;
    const query = searchQuery.toLowerCase();
    return cardsArray.filter(card =>
      card.name.toLowerCase().includes(query) ||
      (card.description && card.description.toLowerCase().includes(query))
    );
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


const [bakaleya, setBakaleya] = useState<CategoryProduct[]>([]);
const [milk, setMilk] = useState<CategoryProduct[]>([]);
const [juices, setJuices] = useState<CategoryProduct[]>([]);
const [frozen, setFrozen] = useState<CategoryProduct[]>([]);
const [beauty, setBeauty] = useState<CategoryProduct[]>([]);

const handleSubscribe = async (e: React.FormEvent) => {
  e.preventDefault();
  setSubscribeStatus(null);

  if (!email) {
    setSubscribeStatus('error');
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      setSubscribeStatus('success');
      setEmail('');
    } else {
      const data = await response.json();
      alert(data.error || 'Ошибка при подписке');
      setSubscribeStatus('error');
    }
  } catch (error) {
    console.error(error);
    setSubscribeStatus('error');
  }
};



//для категории 1
useEffect(() => {
  setLoading(true);
  fetch(`${API_BASE_URL}/api/category1`)
    .then(res => {
      if (!res.ok) throw new Error('Ошибка сети');
      return res.json();
    })
    .then(data => {
      if (!Array.isArray(data)) {
        throw new Error('Полученные данные не являются массивом');
      }
      setCategory1Cards(data.map(item => ({ ...item, type: "category1" })));
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    });
}, []);


useEffect(() => {
  fetch(`${API_BASE_URL}/api/main-offers`)
    .then(res => res.json())
    .then(data => {
      const obj: Record<string, string> = {};
      data.forEach((item: { id: string; text: string }) => {
        obj[item.id] = item.text;
      });
      setOffers(obj);
    })
    .catch(err => console.error(err));
}, []);

//для категории 2
useEffect(() => {
  setLoading(true);
  fetch(`${API_BASE_URL}/api/category2`)
    .then(res => {
      if (!res.ok) throw new Error('Ошибка сети');
      return res.json();
    })
    .then(data => {
      if (!Array.isArray(data)) {
        throw new Error('Полученные данные не являются массивом');
      }
      setCategory2Cards(data.map(item => ({ ...item, type: "category2" })));
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    });
}, []);


//для категории 3
useEffect(() => {
  setLoading(true);
  fetch(`${API_BASE_URL}/api/category3`)
    .then(res => {
      if (!res.ok) throw new Error('Ошибка сети');
      return res.json();
    })
    .then(data => {
      if (!Array.isArray(data)) {
        throw new Error('Полученные данные не являются массивом');
      }
      setCategory3Cards(data.map(item => ({ ...item, type: "category3" })));
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    });
}, []);


//для категории 4
useEffect(() => {
  setLoading(true);
  fetch(`${API_BASE_URL}/api/category4`)
    .then(res => {
      if (!res.ok) throw new Error('Ошибка сети');
      return res.json();
    })
    .then(data => {
      if (!Array.isArray(data)) {
        throw new Error('Полученные данные не являются массивом');
      }
      setCategory4Cards(data.map(item => ({ ...item, type: "category4" })));
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    });
}, []);


//для категории 5
useEffect(() => {
  setLoading(true);
  fetch(`${API_BASE_URL}/api/category5`)
    .then(res => {
      if (!res.ok) throw new Error('Ошибка сети');
      return res.json();
    })
    .then(data => {
      if (!Array.isArray(data)) {
        throw new Error('Полученные данные не являются массивом');
      }
      setCategory5Cards(data.map(item => ({ ...item, type: "category5" })));
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    });
}, []);


//для популярных
  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/popular`)
    .then(res => {
      if (!res.ok) throw new Error('Ошибка сети');
      return res.json();
    })
    .then(data => {
      if (!Array.isArray(data)) {
        throw new Error('Полученные данные не являются массивом');
      }
        setPopularCards(data.map(item => ({ ...item, type: "popular" })));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);


  // СКРОЛЛ СЛАЙДЕРА
  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;
  };

  useEffect(() => {
    handleScroll();
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (slider) slider.removeEventListener("scroll", handleScroll);
    };
  }, []);


  

  useEffect(() => {
    const timeout = setTimeout(() => {
      requestAnimationFrame(() => {

      });
    }, 20); 
  
    return () => clearTimeout(timeout);
  }, []);


  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => resetTimeout();
  }, [current]);
  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);
  const nextSlide = () => setCurrent((current + 1) % slides.length);

  
  popularCards.forEach(card => console.log("Карточка:", card));
  return (
    <main className="main">
    <div className="slider-container" style={{ position: 'relative', margin: '0 auto' }}>
      <button 
        onClick={prevSlide} 
        style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}
        aria-label="Previous Slide"
        className="main-sliderBtn main-sliderBtn-left"
      >
        ◀
      </button>
      

      <div className="slide" style={{ textAlign: 'center' }}>
        <img 
          src={slides[current].img} 
          style={{ width: '100%', height: 'auto', borderRadius: 8 }} 
        />
      </div>

      <button 
        onClick={nextSlide} 
        style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
        aria-label="Next Slide"
        className="main-sliderBtn main-sliderBtn-right"
      >
        ▶
      </button>
    </div>
  
      <section className="main-popular-section">
        <div className="popular-title">
          <h2>ПОПУЛЯРНОЕ</h2>
          <hr />
        </div>
      
<div className="main-popular-cards">
{popularCards.map((card) => (
  
  <div className="main-popular-card" key={card.id}>
      <div className="main-popular-card-img-buttons">
        <div className="main-popular-card-img-div">
          {card.image_url ? (
            <img
              src={card.image_url}
              alt={card.name}
              className="main-popular-card-img"
            />
          ) : (
            <div style={{ width: '100%', height: '250px', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Нет изображения</div>
          )}
        </div>
        <div className="main-popular-card-buttons">
        <Link to={`/product/${card.id}`} state={{ type: "popular" }} className="main-popular-card-button">
  ...
</Link>
          <a
      onClick={() => addToCart({
        id: card.id.toString(),
        name: card.name,
        price: parseFloat(card.price),
        image_url: card.image_url,
        quantity: 1, 
        description: card.description,
        type: card.type || "default", 
      })}
      className="main-popular-card-button"
      style={{ cursor: 'pointer' }}
    >
      <img src={cartIcon} alt="icon" className="main-popular-card-button-img" />
    </a>
        </div>
      </div>
      <div className="main-popular-card-info">
      <Link to={`/product/${card.id}`} state={{ type: "popular" }}  className="product-name-link">
      <h3 className="product-name">{card.name}</h3>
      <p className="product-description">{card.price} ₽</p>
        </Link>
</div>

    </div>
  ))}
</div>
<div className="mainProjects-block">
<MainProjects />
</div>
</section>


<section className="main-top-selling-section">
  {/* для category1 */}<div className="top-selling-title">
  <h2>{offers["promo1"]}</h2>
  <hr />
  </div>
  <div className="main-top-selling-cards">
  {category1Cards.map((card) => (
    <div className="main-top-selling-card" key={card.id}>
      <div className="main-top-selling-card-img-buttons">
        <div className="main-top-selling-card-img-div">
          {card.image_url ? (
            <img
              src={card.image_url}
              alt={card.name}
              className="main-top-selling-card-img"
            />
          ) : (
            <div style={{ width: '100%', height: '250px', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Нет изображения</div>
          )}
        </div>
        <div className="main-top-selling-card-buttons">
        <Link to={`/product/${card.id}`} state={{ type: "category1" }} className="main-top-selling-card-button">
  ...
</Link>
          <a
      onClick={() => addToCart({
        id: card.id.toString(),
        name: card.name,
        price: parseFloat(card.price),
        image_url: card.image_url,
        quantity: 1, 
        description: card.description,
        type: card.type || "default",
      })}
      className="main-top-selling-card-button"
      style={{ cursor: 'pointer' }}
    >
      <img src={cartIcon} alt="icon" className="main-top-selling-card-button-img" />
    </a>
        </div>
      </div>
      <div className="main-top-selling-card-info">
        <Link to={`/product/${card.id}`} state={{ type: "category1" }}  className="product-name-link">
          <h4 className="product-name">{card.name}</h4>
          {card.description && (
            <p className="product-description">{card.description}</p>
          )}
        </Link>
        <p>{card.price} ₽</p>
      </div>
    </div>
  ))}
</div>
 </section>

 <section className="main-top-selling-section">


{/* для category2 */}

<div className="top-selling-title">
  <h2>{offers["promo2"]}</h2>
  <hr />
</div>
<div className="main-top-selling-cards">
{category2Cards.map((card) => (
  <div className="main-top-selling-card" key={card.id}>
    <div className="main-top-selling-card-img-buttons">
      <div className="main-top-selling-card-img-div">
        {card.image_url ? (
          <img
            src={card.image_url}
            alt={card.name}
            className="main-top-selling-card-img"
          />
        ) : (
          <div style={{ width: '100%', height: '250px', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Нет изображения</div>
        )}
      </div>
      <div className="main-top-selling-card-buttons">
      <Link to={`/product/${card.id}`} state={{ type: "category2" }} className="main-top-selling-card-button">
  ...
</Link>
          <a
      onClick={() => addToCart({
        id: card.id.toString(),
        name: card.name,
        price: parseFloat(card.price),
        image_url: card.image_url,
        quantity: 1, 
        description: card.description,
        type: card.type || "default",
      })}
      className="main-top-selling-card-button"
      style={{ cursor: 'pointer' }}
    >
      <img src={cartIcon} alt="icon" className="main-top-selling-card-button-img" />
    </a>
      </div>
    </div>
    <div className="main-top-selling-card-info">
<Link to={`/product/${card.id}`} className="product-name-link">
  <h4 className="product-name">{card.name}</h4>
  {card.description && (
    <p className="product-description">{card.description}</p>
  )}
</Link>
<p>{card.price} ₽</p>
</div>

  </div>
))}
</div>
</section>
<section className="main-top-selling-section">


  {/* для category3 */}
  <div className="top-selling-title">
  <h2>{offers["promo3"]}</h2>
  <hr />
</div>
<div className="main-top-selling-cards">
  {category3Cards.map((card) => (
    <div className="main-top-selling-card" key={card.id}>
      <div className="main-top-selling-card-img-buttons">
        <div className="main-top-selling-card-img-div">
          {card.image_url ? (
            <img
              src={card.image_url}
              alt={card.name}
              className="main-top-selling-card-img"
            />
          ) : (
            <div style={{ width: '100%', height: '250px', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Нет изображения</div>
          )}
        </div>
        <div className="main-top-selling-card-buttons">
        <Link to={`/product/${card.id}`} state={{ type: "category3" }} className="main-top-selling-card-button">
  ...
</Link>
          <a
      onClick={() => addToCart({
        id: card.id.toString(),
        name: card.name,
        price: parseFloat(card.price),
        image_url: card.image_url,
        quantity: 1, 
        description: card.description,
        type: card.type || "default",
      })}
      className="main-top-selling-card-button"
      style={{ cursor: 'pointer' }}
    >
      <img src={cartIcon} alt="icon" className="main-top-selling-card-button-img" />
    </a>
        </div>
      </div>
      <div className="main-top-selling-card-info">
  <Link to={`/product/${card.id}`} className="product-name-link">
    <h4 className="product-name">{card.name}</h4>
    {card.description && (
      <p className="product-description">{card.description}</p>
    )}
  </Link>
  <p>{card.price} ₽</p>
</div>

    </div>
  ))}
</div>
 </section>
 <section className="main-top-selling-section">


  {/* для category4 */}
  <div className="top-selling-title">
  <h2>{offers["promo4"]}</h2>
  <hr />
</div>
      
<div className="main-top-selling-cards">
  {category4Cards.map((card) => (
    <div className="main-top-selling-card" key={card.id}>
      <div className="main-top-selling-card-img-buttons">
        <div className="main-top-selling-card-img-div">
          {card.image_url ? (
            <img
              src={card.image_url}
              alt={card.name}
              className="main-top-selling-card-img"
            />
          ) : (
            <div style={{ width: '100%', height: '200px', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Нет изображения</div>
          )}
        </div>
        <div className="main-top-selling-card-buttons">
        <Link to={`/product/${card.id}`} state={{ type: "category4" }} className="main-top-selling-card-button">
  ...
</Link>
          <a
      onClick={() => addToCart({
        id: card.id.toString(),
        name: card.name,
        price: parseFloat(card.price),
        image_url: card.image_url,
        quantity: 1, 
        description: card.description,
        type: card.type || "default",
      })}
      className="main-top-selling-card-button"
      style={{ cursor: 'pointer' }}
    >
      <img src={cartIcon} alt="icon" className="main-top-selling-card-button-img" />
    </a>
        </div>
      </div>
      <div className="main-top-selling-card-info">
  <Link to={`/product/${card.id}`} className="product-name-link">
    <h4 className="product-name">{card.name}</h4>
    {card.description && (
      <p className="product-description">{card.description}</p>
    )}
  </Link>
  <p>{card.price} ₽</p>
</div>

    </div>
  ))}
</div>
 </section>
 <section className="main-top-selling-section">


  {/* для category5 */}
  <div className="top-selling-title">
  <h2>{offers["promo5"]}</h2>
  <hr />
</div>
<div className="main-top-selling-cards">
  {category5Cards.map((card) => (
    <div className="main-top-selling-card" key={card.id}>
      <div className="main-top-selling-card-img-buttons">
        <div className="main-top-selling-card-img-div">
          {card.image_url ? (
            <img
              src={card.image_url}
              alt={card.name}
              className="main-top-selling-card-img"
            />
          ) : (
            <div style={{ width: '100%', height: '250px', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Нет изображения</div>
          )}
        </div>
        <div className="main-top-selling-card-buttons">
        <Link to={`/product/${card.id}`} state={{ type: "category5" }} className="main-top-selling-card-button">
  ...
</Link>
          <a
      onClick={() => addToCart({
        id: card.id.toString(),
        name: card.name,
        price: parseFloat(card.price),
        image_url: card.image_url,
        quantity: 1, 
        description: card.description,
        type: card.type || "default",
      })}
      className="main-top-selling-card-button"
      style={{ cursor: 'pointer' }}
    >
      <img src={cartIcon} alt="icon" className="main-top-selling-card-button-img" />
    </a>
        </div>
      </div>
      <div className="main-top-selling-card-info">
  <Link to={`/product/${card.id}`} className="product-name-link">
    <h4 className="product-name">{card.name}</h4>
    {card.description && (
      <p className="product-description">{card.description}</p>
    )}
  </Link>
  <p>{card.price} ₽</p>
</div>

    </div>
  ))}
</div>
 </section>
     
      <section className="main-submit-promotions">
        <div className="main-submit-promotions-content">
          <div className="main-promotions">
            <h3>Не нашли ничего <br /> интересного?</h3>
            <a href="/catalog">Смотреть все товары <span className="main-promotions-arrow">⮕</span></a>
          </div>
          <div className="main-submit">
            <div className="main-submit-content">
            <div className="main-newsletter">
              <h4 className="main-heading">Хотите стать частью платформы?</h4>
              <p className="main-newsletter-desc">
                Отправляйте e-mail, мы с Вами свяжемся!
              </p>
              <form className="main-newsletter-form" onSubmit={handleSubscribe}>
                <div className="main-form-group">
                  <input
                    type="email"
                    className="main-newsletter-input"
                    placeholder="Ваш email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="submit" className="main-newsletter-button">
                    Отправить
                  </button>
                </div>
   
                {subscribeStatus === 'error' && (
                  <p className="main-newsletter-error">Пожалуйста, введите email</p>
                )}

              </form>
            </div>
            <div className="main-submit-img">
              <img src="#" alt="" />
            </div>
          </div>
          </div>
        </div>
      </section>


    </main>
  );
};

export default Main;
