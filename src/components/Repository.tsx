import React from 'react';
import { Table, Typography, Tag, Button, Space, Tooltip } from 'antd';
import { BulbOutlined, GiftOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

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

const getPendingReason = (project: Project) => {
  if (project.cost > project.sponsorship * 2) {
    return '需要更多赞助支持';
  }
  if (project.idea < 30) {
    return '需要更多创意想法';
  }
  return '等待社区参与';
};

const Repository: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const columns: ColumnsType<Project> = [
    {
      title: '项目',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div style={{ wordBreak: 'break-word' }}>
          <div style={{ marginBottom: 8 }}>
            <span style={{ fontSize: '16px', fontWeight: 500, display: 'inline-block', marginBottom: 4 }}>{text}</span>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 }}>
              <Tag color="blue">L{record.level}</Tag>
              <Tag color="orange">未启动</Tag>
            </div>
          </div>
          <Paragraph 
            type="secondary" 
            style={{ margin: 0 }}
            ellipsis={{ rows: 2 }}
          >
            {record.description}
          </Paragraph>
          <div style={{ marginTop: 8 }}>
            <Tag color="red">{getPendingReason(record)}</Tag>
          </div>
        </div>
      ),
      width: '100%',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text).toLocaleDateString(),
      width: '15%',
    },
    {
      title: '所需支持',
      key: 'requirements',
      render: (_, record) => (
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Tooltip title="当前赞助/目标金额">
              <Tag color="green">赞助进度: {record.sponsorship}/{record.cost}</Tag>
            </Tooltip>
          </div>
          <div>
            <Tooltip title="当前想法数/目标想法数">
              <Tag color="purple">想法进度: {record.idea}/30</Tag>
            </Tooltip>
          </div>
        </Space>
      ),
      width: '25%',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space wrap>
          <Button 
            type="primary" 
            icon={<BulbOutlined />}
            onClick={() => console.log('提供想法:', record.id)}
          >
            我有想法
          </Button>
          <Button 
            type="default" 
            icon={<GiftOutlined />}
            onClick={() => console.log('提供赞助:', record.id)}
          >
            我想赞助
          </Button>
        </Space>
      ),
      width: '100%',
    },
  ];

  return (
    <div>
      <Title level={2}>Repository</Title>
      <Paragraph type="secondary">
        这里展示了所有待启动的项目，需要社区的想法和赞助支持。
      </Paragraph>
      <Table 
        columns={columns} 
        dataSource={projects}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 'max-content' }}
        style={{ overflowX: 'auto' }}
      />
    </div>
  );
};

export default Repository; 