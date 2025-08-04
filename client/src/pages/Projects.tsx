import React, { useEffect, useState } from 'react';
import "../styles/projects.css"
import ProjectCard from '../components/ProjectCard';

interface Project {
    id: string;
    name: string;
    image_url: string;
    description?: string;
}

const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/projects')
            .then(res => res.json())
            .then(data => setProjects(data))
            .catch(err => console.error("Ошибка загрузки проектов:", err)) 
    }, []);

    return (
        <div className='projects'>
            <div className="projects-content">
                <h2>ПРОЕКТЫ</h2>
                <div className="project-cards">
                    {projects.map((project) => (
                      <ProjectCard
                      key={project.id}
                      name={project.name}
                      image_url={`${project.image_url}?v=${project.id}`} 
                      description={project.description}
                    />
                    
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Projects;
