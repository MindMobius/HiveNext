import React from 'react';
import { Modal, Row, Col, Progress, Statistic, Card, Typography, Space, Tag } from 'antd';
import { 
  FireOutlined,
  LockOutlined,
  DollarOutlined,
  GiftOutlined,
  FieldTimeOutlined,
  BulbOutlined
} from '@ant-design/icons';
import styled from '@emotion/styled';

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

const StyledCard = styled(Card)`
  .ant-statistic-title {
    font-size: 12px;
  }
  .ant-progress-text {
    font-size: 14px;
  }
`;

const IconWrapper = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
`;

interface ProjectDetailCardProps {
  project: Project;
  visible: boolean;
  onClose: () => void;
}

const ProjectDetailCard: React.FC<ProjectDetailCardProps> = ({
  project,
  visible,
  onClose
}) => {
  return (
    <Modal
      title={
        <Space>
          <Title level={4} style={{ margin: 0 }}>{project.title}</Title>
          <Tag color="blue">Level {project.level}</Tag>
          <span style={{ color: '#666' }}>
            {new Date(project.createdAt).toLocaleDateString()}
          </span>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      width={800}
      footer={null}
    >
      <Paragraph>{project.description}</Paragraph>
      
      <Progress
        percent={Math.min(100, project.energy || 0)}
        status="active"
        strokeColor={{
          from: '#108ee9',
          to: '#87d068',
        }}
        format={() => `${project.energy || 0}E`}
      />

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={8}>
          <StyledCard>
            <IconWrapper>
              <BulbOutlined style={{ color: '#722ed1' }} />
            </IconWrapper>
            <Statistic 
              title="灵感值" 
              value={project.idea}
            />
          </StyledCard>
        </Col>
        <Col span={8}>
          <StyledCard>
            <IconWrapper>
              <DollarOutlined style={{ color: '#f5222d' }} />
            </IconWrapper>
            <Statistic 
              title="开销" 
              value={project.cost}
              prefix="¥"
            />
          </StyledCard>
        </Col>
        <Col span={8}>
          <StyledCard>
            <IconWrapper>
              <GiftOutlined style={{ color: '#52c41a' }} />
            </IconWrapper>
            <Statistic 
              title="赞助" 
              value={project.sponsorship}
              prefix="¥"
            />
          </StyledCard>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={8}>
          <StyledCard>
            <IconWrapper>
              <FieldTimeOutlined style={{ color: '#1890ff' }} />
            </IconWrapper>
            <Statistic 
              title="工时" 
              value={project.workHours}
              suffix="d"
            />
          </StyledCard>
        </Col>
        <Col span={8}>
          <StyledCard>
            <IconWrapper>
              <FireOutlined style={{ color: '#fa541c' }} />
            </IconWrapper>
            <Statistic 
              title="热度" 
              value={project.heat}
            />
          </StyledCard>
        </Col>
        <Col span={8}>
          <StyledCard>
            <IconWrapper>
              <LockOutlined style={{ color: '#13c2c2' }} />
            </IconWrapper>
            <Statistic 
              title="日活" 
              value={project.dailyActive}
            />
          </StyledCard>
        </Col>
      </Row>

      <Card style={{ marginTop: 16, background: '#f5f5f5' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Title level={4}>能量公式</Title>
          <Paragraph style={{ fontSize: 16 }}>
            E = ((O + I + S + H) / (C + W/L)) - D
          </Paragraph>
          <Paragraph>
            其中：O=初始能量({project.origin}), I=灵感值({project.idea}), 
            S=赞助({project.sponsorship}), H=热度({project.heat}), 
            C=开销({project.cost}), W=工时({project.workHours}), 
            L=等级({project.level}), D=自然损耗
          </Paragraph>
        </Space>
      </Card>
    </Modal>
  );
};

export default ProjectDetailCard; 