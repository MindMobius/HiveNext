import React, { useState } from 'react';
import { Card, Row, Col, Progress, Typography, Button, Tag, Tooltip } from 'antd';
import { 
  FireOutlined,
  LockOutlined,
  DollarOutlined,
  GiftOutlined,
  FieldTimeOutlined
} from '@ant-design/icons';
import ProjectDetailCard from './ProjectDetailCard';

const { Title, Paragraph } = Typography;

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

const ActiveBoard: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div>
      <Title level={2}>ActiveBoard</Title>
      <Row gutter={[16, 16]}>
        {projects.map(project => (
          <Col xs={24} sm={12} md={8} key={project.id}>
            <Card 
              hoverable 
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{project.title}</span>
                  <Tag color="blue">L{project.level}</Tag>
                </div>
              }
              extra={<span>{new Date(project.createdAt).toLocaleDateString()}</span>}
              onClick={() => setSelectedProject(project)}
            >
              <Paragraph ellipsis={{ rows: 2 }}>{project.description}</Paragraph>
              
              <Progress 
                percent={Math.min(100, project.energy || 0)}
                status="active"
                format={() => `${project.energy || 0}E`}
              />

              <Row gutter={[8, 8]} style={{ marginTop: 16 }}>
                <Col span={12}>
                  <Tooltip title="热度">
                    <Button icon={<FireOutlined />} block>
                      {project.heat}
                    </Button>
                  </Tooltip>
                </Col>
                <Col span={12}>
                  <Tooltip title="日活">
                    <Button icon={<LockOutlined />} block>
                      {project.dailyActive}
                    </Button>
                  </Tooltip>
                </Col>
                <Col span={8}>
                  <Tooltip title="开销">
                    <Button icon={<DollarOutlined />} block>
                      {project.cost}
                    </Button>
                  </Tooltip>
                </Col>
                <Col span={8}>
                  <Tooltip title="赞助">
                    <Button icon={<GiftOutlined />} block>
                      {project.sponsorship}
                    </Button>
                  </Tooltip>
                </Col>
                <Col span={8}>
                  <Tooltip title="工时">
                    <Button icon={<FieldTimeOutlined />} block>
                      {project.workHours}d
                    </Button>
                  </Tooltip>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

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

export default ActiveBoard; 