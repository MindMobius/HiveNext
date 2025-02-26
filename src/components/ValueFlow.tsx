import React, { useState } from 'react';
import { Typography, Tooltip } from 'antd';
import styled from '@emotion/styled';
import ProjectDetailCard from './ProjectDetailCard';

const { Title } = Typography;

interface Project {
  id: number;
  title: string;
  description: string;
  level: 1 | 2 | 3;
  origin: number;
  idea: number;
  cost: number;
  sponsorship: number;
  workHours: number;
  heat: number;
  dailyActive: number;
  status: 'active' | 'pending';
  createdAt: string;
  energy?: number;
}

const HexGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const Hexagon = styled.div<{ energy: number; level: number }>`
  position: relative;
  width: 100%;
  padding-bottom: 115%;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  background: ${props => {
    const hue = Math.min(props.energy, 120); // 能量越高，颜色越偏绿
    const saturation = 60 + props.level * 10; // 等级越高，饱和度越高
    return `hsl(${hue}, ${saturation}%, 50%)`;
  }};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.1);
  }
`;

const HexContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 10px;
`;

const ProjectTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const ProjectEnergy = styled.div`
  font-size: 12px;
  opacity: 0.9;
`;

const ProjectLevel = styled.div`
  font-size: 12px;
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 6px;
  border-radius: 10px;
  margin-top: 4px;
`;

const ValueFlow: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // 按能量值排序项目
  const sortedProjects = [...projects].sort((a, b) => 
    (b.energy || 0) - (a.energy || 0)
  );

  return (
    <div>
      <Title level={2}>ValueFlow</Title>
      <HexGrid>
        {sortedProjects.map(project => (
          <Tooltip 
            key={project.id} 
            title={
              <div>
                <div>{project.title}</div>
                <div>能量: {project.energy}E</div>
                <div>等级: L{project.level}</div>
                <div>灵感: {project.idea}</div>
                <div>开销: {project.cost}</div>
                <div>赞助: {project.sponsorship}</div>
                <div>工时: {project.workHours}h</div>
                <div>热度: {project.heat}</div>
                <div>日活: {project.dailyActive}</div>
              </div>
            }
          >
            <Hexagon 
              energy={project.energy || 0} 
              level={project.level}
              onClick={() => setSelectedProject(project)}
            >
              <HexContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectEnergy>{project.energy}E</ProjectEnergy>
                <ProjectLevel>L{project.level}</ProjectLevel>
              </HexContent>
            </Hexagon>
          </Tooltip>
        ))}
      </HexGrid>

      {selectedProject && (
        <ProjectDetailCard
          project={selectedProject}
          visible={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default ValueFlow; 