
import React, { useState, useEffect } from "react";
import { api } from "../utils/api";

interface Category1 {
  id: string;
  name: string;
  description?: string;
  price: number;
  category_id: number;
  image_url?: string;
  stock_quantity: number;
}

interface AddCategory1ModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (category1: Omit<Category1, "id">) => void;
}

interface EditCategory1ModalProps {
  show: boolean;
  category1: Category1 | null;
  onClose: () => void;
  onSave: (category1: Category1) => void;
}

const Category1Admin: React.FC = () => {
  const [category1, setCategory1] = useState<Category1[]>([]);
  const [loadingCategory1, setLoadingCategory1] = useState(false);
  const [errorCategory1, setErrorCategory1] = useState<string | null>(null);

  const [showAddCategory1, setShowAddCategory1] = useState(false);
  const [editingCategory1, setEditingCategory1] = useState<Category1 | null>(null);

  const loadCategory1 = async () => {
    try {
      setLoadingCategory1(true);
      const data = await api.admin.getCategory1();
      setCategory1(data);
      setErrorCategory1(null);
    } catch (e) {
      setErrorCategory1("Ошибка загрузки продуктов");
      console.error(e);
    } finally {
      setLoadingCategory1(false);
    }
  };

  useEffect(() => {
    loadCategory1();
  }, []);

  const handleAddCategory1 = async (category1Data: Omit<Category1, "id">) => {
    try {
      await api.admin.createCategory1(category1Data);
      loadCategory1();
      setShowAddCategory1(false);
    } catch (e) {
      setErrorCategory1("Ошибка добавления  продукта");
      console.error(e);
    }
  };

  const handleEditCategory1= async (category1Data: Category1) => {
    try {
      await api.admin.updateCategory1(category1Data.id, category1Data);
      loadCategory1();
      setEditingCategory1(null);
    } catch (e) {
      setErrorCategory1("Ошибка обновления  продукта");
      console.error(e);
    }
  };

  const handleDeleteCategory1 = async (id: string) => {
    try {
      await api.admin.deleteCategory1(id);
      loadCategory1();
    } catch (e) {
      setErrorCategory1("Ошибка удаления  продукта");
      console.error(e);
    }
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>категория 1</h2>
        <button className="add-btn" onClick={() => setShowAddCategory1(true)}>
          + Добавить товар
        </button>
      </div>

      {errorCategory1 && <div className="error-message">{errorCategory1}</div>}
      {loadingCategory1 && <div className="loading-message">Загрузка...</div>}

      {!loadingCategory1 && category1.length === 0 ? (
        <div className="placeholder-content">
          <div className="placeholder-icon">🌟</div>
          <h3>категория 1 не найдена</h3>
          <p>Добавьте первый категория 1.</p>
        </div>
      ) : (
        <div className="products-table">
          {category1.map((item) => (
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
                  onClick={() => setEditingCategory1(item)}
                >
                  Изменить
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => handleDeleteCategory1(item.id)}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddCategory1Modal
        show={showAddCategory1}
        onClose={() => setShowAddCategory1(false)}
        onSave={handleAddCategory1}
      />
      <EditCategory1Modal
        show={!!editingCategory1}
        category1={editingCategory1}
        onClose={() => setEditingCategory1(null)}
        onSave={handleEditCategory1}
      />
    </div>
  );
};

const AddCategory1Modal: React.FC<AddCategory1ModalProps> = ({ show, onClose, onSave }) => {
  const [formData, setFormData] = useState<Omit<Category1, "id">>({
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

const EditCategory1Modal: React.FC<EditCategory1ModalProps> = ({ show, category1, onClose, onSave }) => {
  const [formData, setFormData] = React.useState<Omit<Category1, "id">>({
    name: "",
    description: "",
    price: 0,
    category_id: 1,
    image_url: "",
    stock_quantity: 0,
  });

  React.useEffect(() => {
    if (category1) {
      setFormData({
        name: category1.name,
        description: category1.description || "",
        price: category1.price,
        category_id: category1.category_id,
        image_url: category1.image_url || "",
        stock_quantity: category1.stock_quantity,
      });
    }
  }, [category1]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category1) {
      onSave({ ...category1, ...formData });
      onClose();
    }
  };

  if (!show || !category1) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Редактировать категорию 1</h3>
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

export default Category1Admin;
