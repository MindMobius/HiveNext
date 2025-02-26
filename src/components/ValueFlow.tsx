import React, { useState } from 'react';
import { Typography, Tooltip } from 'antd';
import { defineHex, Grid, rectangle } from 'honeycomb-grid';
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

const ValueFlow: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const sortedProjects = [...projects].sort((a, b) => 
    (b.energy || 0) - (a.energy || 0)
  );

  const Hex = defineHex({
    dimensions: { width: 150, height: 150 },
    orientation: 'flat'
  });

  const grid = new Grid(Hex, rectangle({ width: 6, height: 4 }));

  const getHexPoints = (size: number) => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = 2 * Math.PI / 6 * i;
      const x = size + size * Math.cos(angle);
      const y = size + size * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  return (
    <>
      <Title level={2}>ValueFlow</Title>
      <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: 20, height: 800 }}>
        {sortedProjects.map((project, index) => {
          const hex = Array.from(grid)[index];
          if (!hex) return null;

          return (
            <Tooltip 
              key={project.id} 
              title={
                <>
                  <p>{project.title}</p>
                  <p>能量: {project.energy}E</p>
                  <p>等级: L{project.level}</p>
                  <p>灵感: {project.idea}</p>
                  <p>开销: {project.cost}</p>
                  <p>赞助: {project.sponsorship}</p>
                  <p>工时: {project.workHours}h</p>
                  <p>热度: {project.heat}</p>
                  <p>日活: {project.dailyActive}</p>
                </>
              }
            >
              <svg
                style={{
                  position: 'absolute',
                  left: `${hex.x}px`,
                  top: `${hex.y}px`,
                  cursor: 'pointer',
                }}
                width="150"
                height="150"
                onClick={() => setSelectedProject(project)}
              >
                <polygon
                  points={getHexPoints(75)}
                  fill="white"
                  stroke="#d9d9d9"
                  strokeWidth="1"
                />
                <text
                  x="75"
                  y="60"
                  textAnchor="middle"
                  style={{ fontSize: '14px' }}
                >
                  {project.title}
                </text>
                <text
                  x="75"
                  y="80"
                  textAnchor="middle"
                  style={{ fontSize: '12px' }}
                >
                  能量: {project.energy}E
                </text>
                <text
                  x="75"
                  y="100"
                  textAnchor="middle"
                  style={{ fontSize: '12px' }}
                >
                  等级: L{project.level}
                </text>
              </svg>
            </Tooltip>
          );
        })}
      </div>

      {selectedProject && (
        <ProjectDetailCard
          project={selectedProject}
          visible={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

function getEnergyLevel(energy: number = 0): string {
  if (energy > 80) return 'high';
  if (energy > 50) return 'medium';
  if (energy > 30) return 'low';
  return 'critical';
}

export default ValueFlow; 