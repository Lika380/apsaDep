import React, { useState, useEffect } from "react";
import { api } from "../utils/api";

interface Category4 {
  id: string;
  name: string;
  description?: string;
  price: number;
  category_id: number;
  image_url?: string;
  stock_quantity: number;
}

interface AddCategory4ModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (category4: Omit<Category4, "id">) => void;
}

interface EditCategory4ModalProps {
  show: boolean;
  category4: Category4 | null;
  onClose: () => void;
  onSave: (category4: Category4) => void;
}

const Category4Admin: React.FC = () => {
  const [category4, setCategory4] = useState<Category4[]>([]);
  const [loadingCategory4, setLoadingCategory4] = useState(false);
  const [errorCategory4, setErrorCategory4] = useState<string | null>(null);

  const [showAddCategory4, setShowAddCategory4] = useState(false);
  const [editingCategory4, setEditingCategory4] = useState<Category4 | null>(null);

  const loadCategory4 = async () => {
    try {
      setLoadingCategory4(true);
      const data = await api.admin.getCategory4();
      setCategory4(data);
      setErrorCategory4(null);
    } catch (e) {
      setErrorCategory4("Ошибка загрузки продуктов");
      console.error(e);
    } finally {
      setLoadingCategory4(false);
    }
  };

  useEffect(() => {
    loadCategory4();
  }, []);

  const handleAddCategory4 = async (category4Data: Omit<Category4, "id">) => {
    try {
      await api.admin.createCategory4(category4Data);
      loadCategory4();
      setShowAddCategory4(false);
    } catch (e) {
      setErrorCategory4("Ошибка добавления продукта");
      console.error(e);
    }
  };

  const handleEditCategory4 = async (category4Data: Category4) => {
    try {
      await api.admin.updateCategory4(category4Data.id, category4Data);
      loadCategory4();
      setEditingCategory4(null);
    } catch (e) {
      setErrorCategory4("Ошибка обновления продукта");
      console.error(e);
    }
  };

  const handleDeleteCategory4 = async (id: string) => {
    try {
      await api.admin.deleteCategory4(id);
      loadCategory4();
    } catch (e) {
      setErrorCategory4("Ошибка удаления продукта");
      console.error(e);
    }
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>категория 4</h2>
        <button className="add-btn" onClick={() => setShowAddCategory4(true)}>
          + Добавить товар
        </button>
      </div>

      {errorCategory4 && <div className="error-message">{errorCategory4}</div>}
      {loadingCategory4 && <div className="loading-message">Загрузка...</div>}

      {!loadingCategory4 && category4.length === 0 ? (
        <div className="placeholder-content">
          <div className="placeholder-icon">🌟</div>
          <h3>категория 4 не найдена</h3>
          <p>Добавьте первый товар категории 4.</p>
        </div>
      ) : (
        <div className="products-table">
          {category4.map((item) => (
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
                  onClick={() => setEditingCategory4(item)}
                >
                  Изменить
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => handleDeleteCategory4(item.id)}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddCategory4Modal
        show={showAddCategory4}
        onClose={() => setShowAddCategory4(false)}
        onSave={handleAddCategory4}
      />
      <EditCategory4Modal
        show={!!editingCategory4}
        category4={editingCategory4}
        onClose={() => setEditingCategory4(null)}
        onSave={handleEditCategory4}
      />
    </div>
  );
};

const AddCategory4Modal: React.FC<AddCategory4ModalProps> = ({ show, onClose, onSave }) => {
  const [formData, setFormData] = useState<Omit<Category4, "id">>({
    name: "",
    description: "",
    price: 0,
    category_id: 1,
    image_url: "",
    stock_quantity: 0,
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
          <h3>Добавить товар</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          {/* ...форма как в твоём коде... */}
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

const EditCategory4Modal: React.FC<EditCategory4ModalProps> = ({ show, category4, onClose, onSave }) => {
  const [formData, setFormData] = React.useState<Omit<Category4, "id">>({
    name: "",
    description: "",
    price: 0,
    category_id: 1,
    image_url: "",
    stock_quantity: 0,
  });

  React.useEffect(() => {
    if (category4) {
      setFormData({
        name: category4.name,
        description: category4.description || "",
        price: category4.price,
        category_id: category4.category_id,
        image_url: category4.image_url || "",
        stock_quantity: category4.stock_quantity,
      });
    }
  }, [category4]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category4) {
      onSave({ ...category4, ...formData });
      onClose();
    }
  };

  if (!show || !category4) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Редактировать категорию 4</h3>
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

export default Category4Admin;
