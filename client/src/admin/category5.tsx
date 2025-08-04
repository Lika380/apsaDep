import React, { useState, useEffect } from "react";
import { api } from "../utils/api";

interface Category5 {
  id: string;
  name: string;
  description?: string;
  price: number;
  category_id: number;
  image_url?: string;
  stock_quantity: number;
}

interface AddCategory5ModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (category5: Omit<Category5, "id">) => void;
}

interface EditCategory5ModalProps {
  show: boolean;
  category5: Category5 | null;
  onClose: () => void;
  onSave: (category5: Category5) => void;
}

const Category5Admin: React.FC = () => {
  const [category5, setCategory5] = useState<Category5[]>([]);
  const [loadingCategory5, setLoadingCategory5] = useState(false);
  const [errorCategory5, setErrorCategory5] = useState<string | null>(null);

  const [showAddCategory5, setShowAddCategory5] = useState(false);
  const [editingCategory5, setEditingCategory5] = useState<Category5 | null>(null);

  const loadCategory5 = async () => {
    try {
      setLoadingCategory5(true);
      const data = await api.admin.getCategory5();
      setCategory5(data);
      setErrorCategory5(null);
    } catch (e) {
      setErrorCategory5("Ошибка загрузки продуктов");
      console.error(e);
    } finally {
      setLoadingCategory5(false);
    }
  };

  useEffect(() => {
    loadCategory5();
  }, []);

  const handleAddCategory5 = async (category5Data: Omit<Category5, "id">) => {
    try {
      await api.admin.createCategory5(category5Data);
      loadCategory5();
      setShowAddCategory5(false);
    } catch (e) {
      setErrorCategory5("Ошибка добавления продукта");
      console.error(e);
    }
  };

  const handleEditCategory5 = async (category5Data: Category5) => {
    try {
      await api.admin.updateCategory5(category5Data.id, category5Data);
      loadCategory5();
      setEditingCategory5(null);
    } catch (e) {
      setErrorCategory5("Ошибка обновления продукта");
      console.error(e);
    }
  };

  const handleDeleteCategory5 = async (id: string) => {
    try {
      await api.admin.deleteCategory5(id);
      loadCategory5();
    } catch (e) {
      setErrorCategory5("Ошибка удаления продукта");
      console.error(e);
    }
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>категория 5</h2>
        <button className="add-btn" onClick={() => setShowAddCategory5(true)}>
          + Добавить товар
        </button>
      </div>

      {errorCategory5 && <div className="error-message">{errorCategory5}</div>}
      {loadingCategory5 && <div className="loading-message">Загрузка...</div>}

      {!loadingCategory5 && category5.length === 0 ? (
        <div className="placeholder-content">
          <div className="placeholder-icon">🌟</div>
          <h3>категория 5 не найдена</h3>
          <p>Добавьте первый товар категории 5.</p>
        </div>
      ) : (
        <div className="products-table">
          {category5.map((item) => (
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
                  onClick={() => setEditingCategory5(item)}
                >
                  Изменить
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => handleDeleteCategory5(item.id)}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddCategory5Modal
        show={showAddCategory5}
        onClose={() => setShowAddCategory5(false)}
        onSave={handleAddCategory5}
      />
      <EditCategory5Modal
        show={!!editingCategory5}
        category5={editingCategory5}
        onClose={() => setEditingCategory5(null)}
        onSave={handleEditCategory5}
      />
    </div>
  );
};

const AddCategory5Modal: React.FC<AddCategory5ModalProps> = ({ show, onClose, onSave }) => {
  const [formData, setFormData] = useState<Omit<Category5, "id">>({
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

const EditCategory5Modal: React.FC<EditCategory5ModalProps> = ({ show, category5, onClose, onSave }) => {
  const [formData, setFormData] = React.useState<Omit<Category5, "id">>({
    name: "",
    description: "",
    price: 0,
    category_id: 1,
    image_url: "",
    stock_quantity: 0,
  });

  React.useEffect(() => {
    if (category5) {
      setFormData({
        name: category5.name,
        description: category5.description || "",
        price: category5.price,
        category_id: category5.category_id,
        image_url: category5.image_url || "",
        stock_quantity: category5.stock_quantity,
      });
    }
  }, [category5]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category5) {
      onSave({ ...category5, ...formData });
      onClose();
    }
  };

  if (!show || !category5) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Редактировать категорию 5</h3>
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

export default Category5Admin;
