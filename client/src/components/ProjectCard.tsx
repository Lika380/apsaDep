import React from 'react';
import "../styles/projectCard.css"

interface ProjectCardProps {
  image_url?: string;
  name: string;
  description?: string;
}const ProjectCard: React.FC<ProjectCardProps> = ({ image_url, name, description }) => {
  const paragraphs = description ? description.split('\n') : [];

  return (
    <div className='project-card'>
      <div className="project-card-img">
        {image_url ? (
          <img src={image_url} alt={name} />
        ) : (
          <div className="no-image">Нет изображения</div>
        )}
      </div>
      <div className="project-card-info">
        <h3>{name}</h3>
        {description && paragraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </div>
  );
};


export default ProjectCard;
