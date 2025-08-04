// PopularAdmin.tsx
import React, { useState, useEffect } from "react";
import { api } from "../utils/api";

interface Popular {
  id: string;
  name: string;
  description?: string;
  price: number;
  category_id: number;
  image_url?: string;
  stock_quantity: number;
  instagram?: string;
  whatsapp?: string;
  website?: string; 
}

interface AddPopularModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (popular: Omit<Popular, "id">) => void;
}

interface EditPopularModalProps {
  show: boolean;
  popular: Popular | null;
  onClose: () => void;
  onSave: (popular: Popular) => void;
}

const PopularAdmin: React.FC = () => {
  const [popular, setPopular] = useState<Popular[]>([]);
  const [loadingPopular, setLoadingPopular] = useState(false);
  const [errorPopular, setErrorPopular] = useState<string | null>(null);

  const [showAddPopular, setShowAddPopular] = useState(false);
  const [editingPopular, setEditingPopular] = useState<Popular | null>(null);

  const loadPopular = async () => {
    try {
      setLoadingPopular(true);
      const data = await api.admin.getPopular();
      setPopular(data);
      setErrorPopular(null);
    } catch (e) {
      setErrorPopular("Ошибка загрузки популярных продуктов");
      console.error(e);
    } finally {
      setLoadingPopular(false);
    }
  };

  useEffect(() => {
    loadPopular();
  }, []);

  const handleAddPopular = async (popularData: Omit<Popular, "id">) => {
    try {
      await api.admin.createPopular(popularData);
      loadPopular();
      setShowAddPopular(false);
    } catch (e) {
      setErrorPopular("Ошибка добавления популярного продукта");
      console.error(e);
    }
  };

  const handleEditPopular = async (popularData: Popular) => {
    try {
      await api.admin.updatePopular(popularData.id, popularData);
      loadPopular();
      setEditingPopular(null);
    } catch (e) {
      setErrorPopular("Ошибка обновления популярного продукта");
      console.error(e);
    }
  };

  const handleDeletePopular = async (id: string) => {
    try {
      await api.admin.deletePopular(id);
      loadPopular();
    } catch (e) {
      setErrorPopular("Ошибка удаления популярного продукта");
      console.error(e);
    }
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Популярные товары</h2>
        <button className="add-btn" onClick={() => setShowAddPopular(true)}>
          + Добавить популярное
        </button>
      </div>

      {errorPopular && <div className="error-message">{errorPopular}</div>}
      {loadingPopular && <div className="loading-message">Загрузка...</div>}

      {!loadingPopular && popular.length === 0 ? (
        <div className="placeholder-content">
          <div className="placeholder-icon">🌟</div>
          <h3>Популярные товары не найдены</h3>
          <p>Добавьте первый популярный товар.</p>
        </div>
      ) : (
        <div className="products-table">
          {popular.map((item) => (
            <div key={item.id} className="table-row">
              <div className="product-image-cell">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="product-image-admin"
                  />
                ) : (
                  <div className="no-image">🌟</div>
                )}
              </div>
              <span className="product-name">{item.name}</span>
              <span className="price">{item.price.toLocaleString()} ₽</span>
              <span>Категория ID {item.category_id}</span>
              <div className="actions">
                <button
                  className="action-btn edit"
                  onClick={() => setEditingPopular(item)}
                >
                  Изменить
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => handleDeletePopular(item.id)}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddPopularModal
        show={showAddPopular}
        onClose={() => setShowAddPopular(false)}
        onSave={handleAddPopular}
      />
      <EditPopularModal
        show={!!editingPopular}
        popular={editingPopular}
        onClose={() => setEditingPopular(null)}
        onSave={handleEditPopular}
      />
    </div>
  );
};

const AddPopularModal: React.FC<AddPopularModalProps> = ({ show, onClose, onSave }) => {
  const [formData, setFormData] = useState<Omit<Popular, "id">>({
    name: "",
    description: "",
    price: 0,
    category_id: 1,
    image_url: "",
    stock_quantity: 0,
    instagram: "",
    whatsapp: "",
    website: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Добавить популярное</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Название:</label>
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
            <label>Цена:</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              required
              min={0}
            />
          </div>
          <div className="form-group">
            <label>ID категории:</label>
            <input
              type="number"
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: Number(e.target.value) })}
              required
              min={1}
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
              value={formData.stock_quantity}
              onChange={(e) => setFormData({ ...formData, stock_quantity: Number(e.target.value) })}
              required
              min={0}
            />
          </div>
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

const EditPopularModal: React.FC<EditPopularModalProps> = ({ show, popular, onClose, onSave }) => {
  const [formData, setFormData] = React.useState<Omit<Popular, "id">>({
    name: "",
    description: "",
    price: 0,
    category_id: 1,
    image_url: "",
    stock_quantity: 0,
    instagram: "",
    whatsapp: "",
    website: "",
  });

  React.useEffect(() => {
    if (popular) {
      setFormData({
        name: popular.name,
        description: popular.description || "",
        price: popular.price,
        category_id: popular.category_id,
        image_url: popular.image_url || "",
        stock_quantity: popular.stock_quantity,
        instagram: popular.instagram || "",
        whatsapp: popular.whatsapp || "",
        website: popular.website || "",
      });
    }
  }, [popular]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (popular) {
      onSave({ ...popular, ...formData });
      onClose();
    }
  };

  if (!show || !popular) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Редактировать популярное</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Название:</label>
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
            <label>Цена:</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              required
              min={0}
            />
          </div>
          <div className="form-group">
            <label>ID категории:</label>
            <input
              type="number"
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: Number(e.target.value) })}
              required
              min={1}
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
              value={formData.stock_quantity}
              onChange={(e) => setFormData({ ...formData, stock_quantity: Number(e.target.value) })}
              required
              min={0}
            />
          </div>
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

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn-save">
              Сохранить изменения
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopularAdmin;
