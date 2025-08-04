import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import "../styles/mainProjects.css"

interface Project {
  id: string;
  name: string;
  image_url: string;
  description?: string;
}

const MainProjects: React.FC = () => {
  const [latestProjects, setLatestProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/projects/latest')
      .then(res => {
        if (!res.ok) {
          throw new Error(`Ошибка HTTP: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error('Ответ не является массивом проектов');
        }
        setLatestProjects(data);
      })
      .catch(err => console.error('Ошибка загрузки последних проектов:', err));
  }, []);
  

  return (
    <div className="latest-projects-block">
      <div className="latest-projects-cards">
        {latestProjects.map(p => (
          <ProjectCard
            key={p.id}
            name={p.name}
            image_url={p.image_url}
            description={p.description}
          />
        ))}
      </div>
      <button
        onClick={() => navigate('/projects')}
        className="see-all-projects-btn"
      >
        Все проекты
      </button>
    </div>
  );
};

export default MainProjects;
