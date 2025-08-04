import React, { useState, useEffect } from "react";
import { api } from "../utils/api";

interface Category3 {
  id: string;
  name: string;
  description?: string;
  price: number;
  category_id: number;
  image_url?: string;
  stock_quantity: number;
}

interface AddCategory3ModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (category3: Omit<Category3, "id">) => void;
}

interface EditCategory3ModalProps {
  show: boolean;
  category3: Category3 | null;
  onClose: () => void;
  onSave: (category3: Category3) => void;
}

const Category3Admin: React.FC = () => {
  const [category3, setCategory3] = useState<Category3[]>([]);
  const [loadingCategory3, setLoadingCategory3] = useState(false);
  const [errorCategory3, setErrorCategory3] = useState<string | null>(null);

  const [showAddCategory3, setShowAddCategory3] = useState(false);
  const [editingCategory3, setEditingCategory3] = useState<Category3 | null>(null);

  const loadCategory3 = async () => {
    try {
      setLoadingCategory3(true);
      const data = await api.admin.getCategory3();
      setCategory3(data);
      setErrorCategory3(null);
    } catch (e) {
      setErrorCategory3("Ошибка загрузки продуктов");
      console.error(e);
    } finally {
      setLoadingCategory3(false);
    }
  };

  useEffect(() => {
    loadCategory3();
  }, []);

  const handleAddCategory3 = async (category3Data: Omit<Category3, "id">) => {
    try {
      await api.admin.createCategory3(category3Data);
      loadCategory3();
      setShowAddCategory3(false);
    } catch (e) {
      setErrorCategory3("Ошибка добавления продукта");
      console.error(e);
    }
  };

  const handleEditCategory3 = async (category3Data: Category3) => {
    try {
      await api.admin.updateCategory3(category3Data.id, category3Data);
      loadCategory3();
      setEditingCategory3(null);
    } catch (e) {
      setErrorCategory3("Ошибка обновления продукта");
      console.error(e);
    }
  };

  const handleDeleteCategory3 = async (id: string) => {
    try {
      await api.admin.deleteCategory3(id);
      loadCategory3();
    } catch (e) {
      setErrorCategory3("Ошибка удаления продукта");
      console.error(e);
    }
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>категория 3</h2>
        <button className="add-btn" onClick={() => setShowAddCategory3(true)}>
          + Добавить товар
        </button>
      </div>

      {errorCategory3 && <div className="error-message">{errorCategory3}</div>}
      {loadingCategory3 && <div className="loading-message">Загрузка...</div>}

      {!loadingCategory3 && category3.length === 0 ? (
        <div className="placeholder-content">
          <div className="placeholder-icon">🌟</div>
          <h3>категория 3 не найдена</h3>
          <p>Добавьте первый товар категории 3.</p>
        </div>
      ) : (
        <div className="products-table">
          {category3.map((item) => (
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
                  onClick={() => setEditingCategory3(item)}
                >
                  Изменить
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => handleDeleteCategory3(item.id)}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddCategory3Modal
        show={showAddCategory3}
        onClose={() => setShowAddCategory3(false)}
        onSave={handleAddCategory3}
      />
      <EditCategory3Modal
        show={!!editingCategory3}
        category3={editingCategory3}
        onClose={() => setEditingCategory3(null)}
        onSave={handleEditCategory3}
      />
    </div>
  );
};

const AddCategory3Modal: React.FC<AddCategory3ModalProps> = ({ show, onClose, onSave }) => {
  const [formData, setFormData] = useState<Omit<Category3, "id">>({
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

const EditCategory3Modal: React.FC<EditCategory3ModalProps> = ({ show, category3, onClose, onSave }) => {
  const [formData, setFormData] = React.useState<Omit<Category3, "id">>({
    name: "",
    description: "",
    price: 0,
    category_id: 1,
    image_url: "",
    stock_quantity: 0,
  });

  React.useEffect(() => {
    if (category3) {
      setFormData({
        name: category3.name,
        description: category3.description || "",
        price: category3.price,
        category_id: category3.category_id,
        image_url: category3.image_url || "",
        stock_quantity: category3.stock_quantity,
      });
    }
  }, [category3]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category3) {
      onSave({ ...category3, ...formData });
      onClose();
    }
  };

  if (!show || !category3) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Редактировать категорию 3</h3>
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

export default Category3Admin;
