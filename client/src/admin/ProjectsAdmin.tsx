import React, { useState, useEffect } from "react";
import { api } from "../utils/api";

interface Project {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
}

const ProjectsAdmin: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Загрузка проектов
  const loadProjects = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/projects');
      if (!response.ok) throw new Error('Ошибка HTTP: ' + response.status);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Ошибка загрузки проектов:', error);
      setError('Ошибка загрузки проектов');
    }
  };
  
  useEffect(() => {
    loadProjects();
  }, []);

  // Добавить проект
  const handleAddProject = async (projectData: Omit<Project, "id">) => {
    try {
      await api.admin.createProject(projectData);
      setShowAddModal(false);
      loadProjects();
    } catch (e) {
      setError("Ошибка добавления проекта");
      console.error(e);
    }
  };

  // Редактировать проект
  const handleEditProject = async (projectData: Project) => {
    try {
      await api.admin.updateProject(projectData.id, projectData);
      setEditingProject(null);
      loadProjects();
    } catch (e) {
      setError("Ошибка редактирования проекта");
      console.error(e);
    }
  };

  // Удалить проект
  const handleDeleteProject = async (id: string) => {
    if (!window.confirm("Удалить проект?")) return;
    try {
      await api.admin.deleteProject(id);
      loadProjects();
    } catch (e) {
      setError("Ошибка удаления проекта");
      console.error(e);
    }
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Управление проектами</h2>
        <button className="add-btn" onClick={() => setShowAddModal(true)}>
          + Добавить проект
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading-message">Загрузка...</div>}

      {!loading && projects.length === 0 ? (
        <div className="placeholder-content">
          <div className="placeholder-icon">💼</div>
          <h3>Проекты не найдены</h3>
          <p>Добавьте первый проект.</p>
        </div>
      ) : (
        <div className="projects-table">
          {projects.map((project) => (
            <div key={project.id} className="table-row">
              <div className="project-image-cell">
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.name}
                    className="project-image-admin"
                  />
                ) : (
                  <div className="no-image">💼</div>
                )}
              </div>
              <span className="project-name">{project.name}</span>
              <span className="project-description">{project.description}</span>
              <div className="actions">
                <button
                  className="action-btn edit"
                  onClick={() => setEditingProject(project)}
                >
                  Изменить
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => handleDeleteProject(project.id)}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddProjectModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddProject}
      />
      <EditProjectModal
        show={!!editingProject}
        project={editingProject}
        onClose={() => setEditingProject(null)}
        onSave={handleEditProject}
      />
    </div>
  );
};

export default ProjectsAdmin;

// Модалка добавления проекта
const AddProjectModal: React.FC<{
  show: boolean;
  onClose: () => void;
  onSave: (project: Omit<Project, "id">) => void;
}> = ({ show, onClose, onSave }) => {
  const [formData, setFormData] = useState<Omit<Project, "id">>({
    name: "",
    description: "",
    image_url: "",
  });

  React.useEffect(() => {
    if (!show) {
      setFormData({ name: "", description: "", image_url: "" });
    }
  }, [show]);

  if (!show) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Добавить проект</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Название проекта:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>Описание:</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>URL изображения:</label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) =>
                setFormData({ ...formData, image_url: e.target.value })
              }
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

// Модалка редактирования проекта
const EditProjectModal: React.FC<{
  show: boolean;
  project: Project | null;
  onClose: () => void;
  onSave: (project: Project) => void;
}> = ({ show, project, onClose, onSave }) => {
  const [formData, setFormData] = useState<Omit<Project, "id">>({
    name: "",
    description: "",
    image_url: "",
  });

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description || "",
        image_url: project.image_url || "",
      });
    }
  }, [project]);

  if (!show || !project) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: project.id, ...formData });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Редактировать проект</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Название проекта:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>Описание:</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>URL изображения:</label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) =>
                setFormData({ ...formData, image_url: e.target.value })
              }
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
