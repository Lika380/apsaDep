import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { api } from "../utils/api";
import "../styles/admin.css";
import ProjectsAdmin from "./ProjectsAdmin";
import PopularAdmin from "./PopularAdmin";
import Category1Admin from "./category1";
import Category2Admin from "./category2";
import Category3Admin from "./category3";
import Category4Admin from "./category4";
import Category5Admin from "./category5";
import { productData } from "../components/product/productData";
import { categoriesList } from "../components/product/productData";
import { categoryMapping } from "../components/product/productData";
import { subCategories } from "../components/product/productData";



interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  category_id: string;
  image_url?: string;
  stock_quantity: number;
  subcategory?: string; 
  instagram?: string;
  whatsapp?: string;
  website?: string; // если нужно
  mainCategory?: string;
  subCategory?: string;
  subCategoryId?: string; 
}

interface AddProductData {
  name: string;
  description?: string;
  price: number;
  category_id: string;
  
  image_url?: string;
  stock_quantity: number;
  instagram?: string;
  whatsapp?: string;
  website?: string;
  subcategory?: string;
  subCategoryId?: string; 
  
}

interface TabType {
  id: string;
  name: string;
  icon: string;
  subCategoryId?: string; 
}


const tabs: TabType[] = [
  { id: "dashboard", name: "Dashboard", icon: "📊" },
  { id: "products", name: "Товары", icon: "📦" },
  { id: "project", name: "проекты", icon: "🍞" },
  { id: "popular", name: "популярное", icon: "🍞" },
  { id: "category1", name: "Бакалея", icon: "🍞" },
  { id: "category2", name: "Молочная продукция", icon: "🥛" },
  { id: "category3", name: "Соки", icon: "🧃" },
  { id: "category4", name: "Замороженные продукты", icon: "❄️" },
  { id: "category5", name: "Красота / спорт / одежда", icon: "💄" },
  { id: "subscribers", name: "Подписчики", icon: "📧" }, 
  { id: "messages", name: "Сообщения", icon: "📩" },
];

const categoryMap: Record<string, number> = {
    televizory: 1,
    smartfony: 2,
    noutbuki: 3,
    audiotekhnika: 4,
    tekhnikaKukhnya: 5,
    tekhnikaDom: 6,
    krasotaZdorovye: 7,
    umnyDom: 8,
    posuda: 9,
    igrySoft: 10,
    hobbiRazvlecheniya: 11,
    sportTovary: 12,
    fotoVideo: 13,
    autoelektronika: 14,
    stroitelstvoRemont: 15,
    dachaSadOgorod: 16,
    tovaryDlyaDetey: 17,
    odezhdaObuv: 18,
    kantselyariya: 19,
    knigi: 20,
    muzykalnyeInstrumenty: 21,
    yuvelirnyeIzdelia: 22,
    puteshestviyaTurizm: 23,
    zootovary: 24,
    produktyPitania: 25,
  };

  interface AddProductModalProps {
    show: boolean;
    onClose: () => void;
    onSave: (product: AddProductData) => void;
    categories: { id: string; name: string; icon: string }[];  // категории с id:string
  }
  
  const AddProductModal: React.FC<AddProductModalProps> = ({ show, onClose, onSave, categories }) => {
    const [formData, setFormData] = useState<AddProductData & {
      mainCategory: string;
      subCategory: string;
    }>({
      name: '',
      description: '',
      price: 0,
      image_url: '',
      stock_quantity: 0,
      website: '',
      instagram: '',
      whatsapp: '',
      category_id: '',
      mainCategory: '',
      subCategory: '',
    });
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
    
      // Находим main категорию
      const mainCat = productData.find((m) => m.title === formData.mainCategory);
      if (!mainCat) {
        alert("Выберите основную категорию");
        return;
      }
    
      // Находим подкатегорию внутри main
      const subCat = mainCat.items.find((i) => i.title2 === formData.subCategory);
      if (!subCat) {
        alert("Выберите подкатегорию");
        return;
      }
    
      const category_id = mainCat.category_id.toString();
      const subCategoryId = subCat.subCategoryId.toString();
    
      // Отправляем в onSave все нужные данные, включая subCategoryId
      onSave({ ...formData, category_id, subCategoryId });
    
      onClose();
    
      // Очистка формы
      setFormData({
        name: '',
        description: '',
        price: 0,
        image_url: '',
        stock_quantity: 0,
        website: '',
        instagram: '',
        whatsapp: '',
        category_id: '',
        mainCategory: '',
        subCategory: '',
        subCategoryId: '',  // добавь если нужно
      });
    };
    
  
    if (!show) return null;
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h3>Добавить товар</h3>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>
          <form onSubmit={handleSubmit} className="modal-form">
            {/* Существующие поля */}
            <div className="form-group">
              <label>Название товара:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Описание:</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Цена (₽):</label>
              <input
                type="number"
                min={0}
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                required
              />
            </div>
            <div className="form-group">
              <label>URL изображения:</label>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Количество на складе:</label>
              <input
                type="number"
                min={0}
                value={formData.stock_quantity}
                onChange={(e) => setFormData({ ...formData, stock_quantity: Number(e.target.value) })}
                required
              />
            </div>
  
            {/* Новые поля */}
            <div className="form-group">
              <label>Веб-сайт:</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://example.com"
              />
              </div>
            <div className="form-group">
              <label>Instagram (ссылка):</label>
              <input
                type="url"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                placeholder="https://instagram.com/..."
              />
            </div>
            <div className="form-group">
              <label>WhatsApp (номер):</label>
              <input
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                placeholder="+79999999999"
              />
            </div>
  
   {/* Основная категория */}
   <div className="form-group">
              <label>Основная категория:</label>
              <select
                value={formData.mainCategory}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    mainCategory: e.target.value,
                    subCategory: '',
                  })
                }
                required
              >
                <option value="">Выберите категорию</option>
                {productData.map((main) => (
                  <option key={main.title} value={main.title}>
                    {main.title}
                  </option>
                ))}
              </select>
            </div>
  
           {/* Подкатегория */}
{formData.mainCategory && (
  <div className="form-group">
    <label>Подкатегория:</label>
    <select
      value={formData.subCategoryId || ""}
      onChange={(e) => {
        const selectedSubCatId = e.target.value;
        const selectedSubCat = productData
          .find(main => main.title === formData.mainCategory)
          ?.items.find(item => item.subCategoryId.toString() === selectedSubCatId);
        setFormData({
          ...formData,
          subCategoryId: selectedSubCatId,
          subCategory: selectedSubCat ? selectedSubCat.title2 : "",
        });
      }}
      required
    >
      <option value="">Выберите подкатегорию</option>
      {productData
        .find(main => main.title === formData.mainCategory)
        ?.items.map(item => (
          <option key={item.subCategoryId} value={item.subCategoryId.toString()}>
            {item.title2}
          </option>
        ))}
    </select>
  </div>
)}

            <div className="modal-actions">
              <button type="button" className="btn-cancel" onClick={onClose}>
                Отмена
              </button>
              <button type="submit" className="btn-save">
                Сохранить
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };



  

interface EditProductModalProps {
  show: boolean;
  product: Product | null;
  onClose: () => void;
  onSave: (product: Product) => void;
  categories: { id: string; name: string }[];
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  show,
  product,
  onClose,
  onSave,
  categories,
}) => {
  const [formData, setFormData] = useState<Omit<Product, "id"> & {
    mainCategory: string;
    subCategory: string;
  }>({
    name: "",
    description: "",
    price: 0,
    category_id: "",
    image_url: "",
    stock_quantity: 0,
    website: "",
    instagram: "",
    whatsapp: "",
    mainCategory: "",
    subCategory: "",
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const mainCat = productData.find((m) => m.title === formData.mainCategory);
    if (!mainCat) {
      alert("Выберите основную категорию");
      return;
    }
  
    const subCat = mainCat.items.find((i) => i.title2 === formData.subCategory);
    if (!subCat) {
      alert("Выберите подкатегорию");
      return;
    }
    const category_id = mainCat.category_id.toString();
    const subCategoryId = subCat.subCategoryId.toString();
    
    const updatedProduct: Product = {
      ...formData,
      category_id,
      subCategoryId,  // добавь, если нужен
      id: product?.id || '',
    };
    
    onSave(updatedProduct);
    onClose();
  };  
  
  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        mainCategory: product.mainCategory || "",
        subCategory: product.subCategory || "",

      });
    }
  }, [product]);
  const handleSave = () => {
    if (!product) return;
  
    const { mainCategory, subCategory, ...rest } = formData;
  
    const main = productData.find((m) => m.title === mainCategory);
    const sub = main?.items.find((s) => s.title2 === subCategory);
  
    const category_id = main?.category_id?.toString() || "";
    const sub_category_id = sub?.subCategoryId?.toString() || "";
  
    if (!category_id || !sub_category_id) {
      alert("Выберите корректную категорию и подкатегорию");
      return;
    }
  
    const updatedProduct: Product = {
      ...rest,
      id: product.id,
      category_id,
      subCategoryId: sub_category_id,
    };
  
    onSave(updatedProduct);
    onClose();
  };
  


  if (!show || !product) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Редактировать товар</h3>

        <label>Название:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />

        <label>Описание:</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        <label>Цена:</label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: parseFloat(e.target.value) })
          }
        />

        <label>Основная категория:</label>
        <select
          value={formData.mainCategory}
          onChange={(e) =>
            setFormData({
              ...formData,
              mainCategory: e.target.value,
              subCategory: "",
            })
          }
        >
          <option value="">Выберите категорию</option>
          {productData.map((main) => (
            <option key={main.title} value={main.title}>
              {main.title}
            </option>
          ))}
        </select>

        {formData.mainCategory && (
          <>
            <label>Подкатегория:</label>
            <select
  value={formData.subCategoryId || ""}
  onChange={(e) => {
    const selectedSubCatId = e.target.value;
    const selectedSubCat = productData
      .find(main => main.title === formData.mainCategory)
      ?.items.find(item => item.subCategoryId.toString() === selectedSubCatId);
    setFormData({
      ...formData,
      subCategoryId: selectedSubCatId,
      subCategory: selectedSubCat ? selectedSubCat.title2 : "",
    });
  }}
>
  <option value="">Выберите подкатегорию</option>
  {productData
    .find(main => main.title === formData.mainCategory)
    ?.items.map(item => (
      <option key={item.subCategoryId} value={item.subCategoryId.toString()}>
        {item.title2}
      </option>
    ))}
</select>

          </>
        )}

        <label>Фото (URL):</label>
        <input
          type="text"
          value={formData.image_url}
          onChange={(e) =>
            setFormData({ ...formData, image_url: e.target.value })
          }
        />

        <label>В наличии (шт):</label>
        <input
          type="number"
          value={formData.stock_quantity}
          onChange={(e) =>
            setFormData({
              ...formData,
              stock_quantity: parseInt(e.target.value),
            })
          }
        />

        <label>Instagram:</label>
        <input
          type="text"
          value={formData.instagram}
          onChange={(e) =>
            setFormData({ ...formData, instagram: e.target.value })
          }
        />

        <label>WhatsApp:</label>
        <input
          type="text"
          value={formData.whatsapp}
          onChange={(e) =>
            setFormData({ ...formData, whatsapp: e.target.value })
          }
        />

        <label>Сайт:</label>
        <input
          type="text"
          value={formData.website}
          onChange={(e) =>
            setFormData({ ...formData, website: e.target.value })
          }
        />

        <div className="modal-actions">
          <button onClick={handleSave}>Сохранить</button>
          <button onClick={onClose}>Отмена</button>
        </div>
      </div>
    </div>
  );
};



  
export const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  //для названии блоков с товарами в main.tsx
  const [offers, setOffers] = useState<Record<string, string>>({});


  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [loadingCategoryProducts, setLoadingCategoryProducts] = useState(false);
  const [errorCategoryProducts, setErrorCategoryProducts] = useState<string | null>(null);

//для подписки в разделе [хотите стать спонсором ]
  const [subscribers, setSubscribers] = useState<{id: number; email: string}[]>([]);
const [loadingSubscribers, setLoadingSubscribers] = useState(false);
const productCategories = tabs.filter(tab => tab.id.startsWith("category"));

//для формы обратной связи в контактах 
const [messages, setMessages] = useState<
  { id: number; name: string; email: string; subject?: string; message: string; created_at: string }[]
>([]);
const [loadingMessages, setLoadingMessages] = useState(false);


//для названии категории
const offerKeys = ['promo1', 'promo2', 'promo3', 'promo4', 'promo5'];


//для формы обратной связи в контактах 
const loadMessages = async () => {
  
  setLoadingMessages(true);
  try {
    const res = await fetch('http://localhost:3001/api/messages');
    const data = await res.json();
    setMessages(data);
  } catch (e) {
    console.error(e);
  } finally {
    setLoadingMessages(false);
  }
};

useEffect(() => {
  if (activeTab === 'messages') {
    loadMessages();
  }
}, [activeTab]);

const handleDeleteMessage = async (id: number) => {
  try {
    const res = await fetch(`http://localhost:3001/api/messages/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Ошибка удаления сообщения');
    setMessages(prev => prev.filter(m => m.id !== id));
  } catch (e) {
    console.error(e);
  }
};


//для подписки в разделе [хотите стать спонсором ]
const loadSubscribers = async () => {
  setLoadingSubscribers(true);
  try {
    const res = await fetch('http://localhost:3001/api/subscribers');
    const data = await res.json();
    setSubscribers(data);
  } catch (e) {
    console.error(e);
  } finally {
    setLoadingSubscribers(false);
  }
};

useEffect(() => {
  if (activeTab === 'subscribers') {
    loadSubscribers();
  }
}, [activeTab]);


const handleDeleteSubscriber = async (id: number) => {
  try {
    const res = await fetch(`http://localhost:3001/api/subscribers/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Ошибка удаления подписчика');
    }
    // После удаления обновляем список подписчиков
    setSubscribers(prev => prev.filter(sub => sub.id !== id));
  } catch (err) {
    console.error(err);
  }
};

  //для названии блоков с товарами в main.tsx
  useEffect(() => {
    fetch('http://localhost:3001/api/main-offers')
      .then(res => res.json())
      .then(data => {
        const obj: Record<string, string> = {};
        data.forEach((item: { id: string; text: string }) => {
          obj[item.id] = item.text;
        });
        setOffers(obj);
      });
  }, []);
  
  const handleOfferChange = (key: string, value: string) => {
    setOffers(prev => ({ ...prev, [key]: value }));
  };
  
  const handleOfferSave = (key: string) => {
    fetch(`http://localhost:3001/api/main-offers/${key}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: offers[key] }),
    });
  };
  

  // Загрузка продуктов по категории
  const loadProductsByCategory = async (categoryName: string) => {
    try {
      setLoadingCategoryProducts(true);
      const data = await api.getProductsByCategory(categoryName);
      setCategoryProducts(data);
      setErrorCategoryProducts(null);
    } catch (err) {
      setErrorCategoryProducts("Ошибка загрузки товаров категории");
      console.error(err);
    } finally {
      setLoadingCategoryProducts(false);
    }
  };

  // Загрузка всех товаров
  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await api.getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError("Ошибка загрузки товаров");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Удаление продукта
  const handleDeleteProduct = async (productId: string) => {
    try {
      await api.admin.deleteProduct(productId);
      if (
        ["bakaleya", "milk", "juices", "frozen", "beauty"].includes(activeTab)
      ) {
        loadProductsByCategory(activeTab);
      } else {
        loadProducts();
      }
    } catch (err) {
      setError("Ошибка удаления товара");
      console.error(err);
    }
  };

  // Добавление продукта
  const handleAddProduct = async (productData: AddProductData) => {
    try {
      let productToSave = { ...productData };
  
      // Если надо подставить category_id по activeTab (например, для вкладок категорий)
      if (["bakaleya", "milk", "juices", "frozen", "beauty"].includes(activeTab)) {
        productToSave.category_id = String(categoryMap[activeTab]);
      } else if (!productToSave.category_id) {
        productToSave.category_id = "0"; // дефолт
      }
  
      await api.admin.createProduct(productToSave);
      if (["bakaleya", "milk", "juices", "frozen", "beauty"].includes(activeTab)) {
        loadProductsByCategory(activeTab);
      } else {
        loadProducts();
      }
      setShowAddProduct(false);
    } catch (err) {
      setError("Ошибка добавления товара");
      console.error(err);
    }
  };
  

  // Редактирование продукта
  const handleEditProduct = async (productData: Product) => {
    try {
      await api.admin.updateProduct(productData.id, productData);
      if (
        ["bakaleya", "milk", "juices", "frozen", "beauty"].includes(activeTab)
      ) {
        loadProductsByCategory(activeTab);
      } else {
        loadProducts();
      }
      setEditingProduct(null);
    } catch (err) {
      setError("Ошибка обновления товара");
      console.error(err);
    }
  };

  useEffect(() => {
    if (["bakaleya", "milk", "juices", "frozen", "beauty"].includes(activeTab)) {
      loadProductsByCategory(activeTab);
    } else if (activeTab === "products") {
      loadProducts();
    }
  }, [activeTab]);

  

  const renderDashboard = () => {
    const offerKeys = ["promo1", "promo2", "promo3", "promo4", "promo5"];
  
    return (
      <div className="admin-section">
        <h2>Dashboard</h2>
        <div className="dashboard-grid">
          {/* Общая статистика */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Общая статистика</h3>
            </div>
            <div className="card-content">
              <div className="stat-item">
                <span className="stat-label">Всего товаров:</span>
                <span className="stat-value">{products.length}</span>
              </div>
            </div>
          </div>
          <div>

  </div>
  
          {/* Редактирование предложений */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Редактирование предложений для главной</h3>
            </div>
            <div className="card-content">
              {offerKeys.map((key) => (
                <div key={key} style={{ marginBottom: "15px" }}>
                  <label>
                    <strong>{key}</strong>
                  </label>
                  <textarea
                    rows={2}
                    style={{ width: "100%" }}
                    value={offers[key] || ""}
                    onChange={(e) => handleOfferChange(key, e.target.value)}
                  />
                  <button onClick={() => handleOfferSave(key)}>Сохранить</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  

  const renderProducts = () => (
    <div className="admin-section">
      <div className="section-header">
        <h2>Управление товарами</h2>
        <button className="add-btn" onClick={() => setShowAddProduct(true)}>
          + Добавить товар
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading-message">Загрузка...</div>}

      {!loading && products.length === 0 ? (
        <div className="placeholder-content">
          <div className="placeholder-icon">📦</div>
          <h3>Товары не найдены</h3>
          <p>Добавьте первый товар, чтобы начать работу.</p>
        </div>
      ) : (
        <div className="products-table">
          {products.map((product) => (
            <div key={product.id} className="table-row">
              <div className="product-image-cell">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="product-image-admin"
                  />
                ) : (
                  <div className="no-image">📦</div>
                )}
              </div>
              <span className="product-name">{product.name}</span>
              <span className="price">{product.price.toLocaleString()} ₽</span>
              <div className="actions">
                <button
                  className="action-btn edit"
                  onClick={() => setEditingProduct(product)}
                >
                  Изменить
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderCategoryProducts = () => (
    <div className="admin-section">
      <div className="section-header">
        <h2>Товары категории: {tabs.find((t) => t.id === activeTab)?.name}</h2>
        <button className="add-btn" onClick={() => setShowAddProduct(true)}>
          + Добавить товар
        </button>
      </div>

      {errorCategoryProducts && (
        <div className="error-message">{errorCategoryProducts}</div>
      )}
      {loadingCategoryProducts && (
        <div className="loading-message">Загрузка...</div>
      )}

      {!loadingCategoryProducts && categoryProducts.length === 0 ? (
        <div className="placeholder-content">
          <div className="placeholder-icon">📦</div>
          <h3>Товары не найдены</h3>
          <p>Добавьте первый товар.</p>
        </div>
      ) : (
        <div className="products-table">
          {categoryProducts.map((product) => (
            <div key={product.id} className="table-row">
              <div className="product-image-cell">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="product-image-admin"
                  />
                ) : (
                  <div className="no-image">📦</div>
                )}
              </div>
              <span className="product-name">{product.name}</span>
              <span className="price">{product.price.toLocaleString()} ₽</span>
              <div className="actions">
                <button
                  className="action-btn edit"
                  onClick={() => {
                    setEditingProduct(product);
                    setShowAddProduct(false);
                  }}
                >
                  Изменить
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "products":
        return renderProducts();
      case "popular":
        return <PopularAdmin />;
      case "project":
        return <ProjectsAdmin />;
      case "category1":
        return <Category1Admin />;
        case "category2":
          return <Category2Admin />;
          case "category3":
            return <Category3Admin />;
            case "category4":
              return <Category4Admin />;
              case "category5":
                return <Category5Admin />;
                case "subscribers":   
                return (
                  <div className="admin-section">
                  <h2>Подписчики</h2>
                  {loadingSubscribers ? <p>Загрузка...</p> : null}
                  <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                    {subscribers.map(sub => (
                      <li key={sub.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <span>{sub.email}</span>
                        <button
                          className="action-btn delete"
                          style={{
                            cursor: 'pointer',
                            backgroundColor: '#e74c3c',
                            color: '#fff',
                            border: 'none',
                            padding: '4px 8px',
                            borderRadius: '4px',
                          }}
                          onClick={() => handleDeleteSubscriber(sub.id)}
                        >
                          Удалить
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                );
                case "messages":
  return (
    <div className="admin-section">
      <h2>Сообщения с формы обратной связи</h2>
      {loadingMessages ? (
        <p>Загрузка...</p>
      ) : messages.length === 0 ? (
        <p>Сообщений нет</p>
      ) : (
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {messages.map((msg) => (
            <li key={msg.id} style={{ marginBottom: "15px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
              <p><b>От:</b> {msg.name} ({msg.email})</p>
              <p><b>Тема:</b> {msg.subject || "-"}</p>
              <p><b>Сообщение:</b> {msg.message}</p>
              <p><small>{new Date(msg.created_at).toLocaleString()}</small></p>
              <button
                className="action-btn delete"
                style={{ cursor: "pointer", backgroundColor: "#e74c3c", color: "#fff", border: "none", padding: "4px 8px", borderRadius: "4px" }}
                onClick={() => handleDeleteMessage(msg.id)}
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

        return renderCategoryProducts();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <div className="admin-title">
          <h1>Админ панель</h1>
          <p>Добро пожаловать {user?.email}!</p>
        </div>
        <div className="admin-user-info">
          <div className="admin-avatar">
            {user?.email ? user.email.charAt(0).toUpperCase() : "A"}
          </div>
        </div>
      </div>
      <div className="admin-content">
        <nav className="admin-sidebar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`sidebar-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-name">{tab.name}</span>
            </button>
          ))}
        </nav>
        <main className="admin-main">{renderContent()}</main>
      </div>
  
      {/* Модальные окна */}
      <AddProductModal
  show={showAddProduct}
  onClose={() => setShowAddProduct(false)}
  onSave={handleAddProduct}
  categories={categoriesList.map(cat => ({ id: String(cat.id), name: cat.name, icon: cat.icon || '' }))}
/>

<EditProductModal
  show={!!editingProduct}
  product={editingProduct}
  onClose={() => setEditingProduct(null)}
  onSave={handleEditProduct}
  categories={categoriesList.map((c) => ({ id: String(c.id), name: c.name }))}
 />

    </div>
  );
  
};

export default AdminPanel;
