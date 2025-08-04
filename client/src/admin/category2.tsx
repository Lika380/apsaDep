
import React, { useState, useEffect } from "react";
import { api } from "../utils/api";

interface Category2 {
  id: string;
  name: string;
  description?: string;
  price: number;
  category_id: number;
  image_url?: string;
  stock_quantity: number;
}

interface AddCategory2ModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (category2: Omit<Category2, "id">) => void;
}

interface EditCategory2ModalProps {
  show: boolean;
  category2: Category2 | null;
  onClose: () => void;
  onSave: (category2: Category2) => void;
}

const Category2Admin: React.FC = () => {
  const [category2, setCategory2] = useState<Category2[]>([]);
  const [loadingCategory2, setLoadingCategory2] = useState(false);
  const [errorCategory2, setErrorCategory2] = useState<string | null>(null);

  const [showAddCategory2, setShowAddCategory2] = useState(false);
  const [editingCategory2, setEditingCategory2] = useState<Category2 | null>(null);

  const loadCategory2 = async () => {
    try {
      setLoadingCategory2(true);
      const data = await api.admin.getCategory2();
      setCategory2(data);
      setErrorCategory2(null);
    } catch (e) {
      setErrorCategory2("Ошибка загрузки продуктов");
      console.error(e);
    } finally {
      setLoadingCategory2(false);
    }
  };

  useEffect(() => {
    loadCategory2();
  }, []);

  const handleAddCategory2 = async (category2Data: Omit<Category2, "id">) => {
    try {
      await api.admin.createCategory2(category2Data);
      loadCategory2();
      setShowAddCategory2(false);
    } catch (e) {
      setErrorCategory2("Ошибка добавления  продукта");
      console.error(e);
    }
  };

  const handleEditCategory2= async (category2Data: Category2) => {
    try {
      await api.admin.updateCategory2(category2Data.id, category2Data);
      loadCategory2();
      setEditingCategory2(null);
    } catch (e) {
      setErrorCategory2("Ошибка обновления  продукта");
      console.error(e);
    }
  };

  const handleDeleteCategory2 = async (id: string) => {
    try {
      await api.admin.deleteCategory2(id);
      loadCategory2();
    } catch (e) {
      setErrorCategory2("Ошибка удаления  продукта");
      console.error(e);
    }
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>категория 1</h2>
        <button className="add-btn" onClick={() => setShowAddCategory2(true)}>
          + Добавить товар
        </button>
      </div>

      {errorCategory2 && <div className="error-message">{errorCategory2}</div>}
      {loadingCategory2 && <div className="loading-message">Загрузка...</div>}

      {!loadingCategory2 && category2.length === 0 ? (
        <div className="placeholder-content">
          <div className="placeholder-icon">🌟</div>
          <h3>категория 1 не найдена</h3>
          <p>Добавьте первый категория 1.</p>
        </div>
      ) : (
        <div className="products-table">
          {category2.map((item) => (
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
                  onClick={() => setEditingCategory2(item)}
                >
                  Изменить
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => handleDeleteCategory2(item.id)}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddCategory2Modal
        show={showAddCategory2}
        onClose={() => setShowAddCategory2(false)}
        onSave={handleAddCategory2}
      />
      <EditCategory2Modal
        show={!!editingCategory2}
        category2={editingCategory2}
        onClose={() => setEditingCategory2(null)}
        onSave={handleEditCategory2}
      />
    </div>
  );
};

const AddCategory2Modal: React.FC<AddCategory2ModalProps> = ({ show, onClose, onSave }) => {
  const [formData, setFormData] = useState<Omit<Category2, "id">>({
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

const EditCategory2Modal: React.FC<EditCategory2ModalProps> = ({ show, category2, onClose, onSave }) => {
  const [formData, setFormData] = React.useState<Omit<Category2, "id">>({
    name: "",
    description: "",
    price: 0,
    category_id: 1,
    image_url: "",
    stock_quantity: 0,
  });

  React.useEffect(() => {
    if (category2) {
      setFormData({
        name: category2.name,
        description: category2.description || "",
        price: category2.price,
        category_id: category2.category_id,
        image_url: category2.image_url || "",
        stock_quantity: category2.stock_quantity,
      });
    }
  }, [category2]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category2) {
      onSave({ ...category2, ...formData });
      onClose();
    }
  };

  if (!show || !category2) return null;

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

export default Category2Admin;
