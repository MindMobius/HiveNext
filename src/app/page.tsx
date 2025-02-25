'use client';

import { useState } from 'react';
import { Layout, Menu, Button, Card, Row, Col, Typography, Statistic, Progress } from 'antd';
import { 
  HomeOutlined, 
  ProjectOutlined, 
  TeamOutlined, 
  UserOutlined,
  RocketOutlined
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { Title, Paragraph } = Typography;

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);

  // 模拟众筹项目数据
  const projects = [
    {
      id: 1,
      title: '项目一',
      description: '这是一个创新型众筹项目，旨在解决...',
      target: 100000,
      current: 65000,
      backers: 120,
      daysLeft: 15,
    },
    {
      id: 2,
      title: '项目二',
      description: '社区驱动的开源项目，专注于...',
      target: 50000,
      current: 35000,
      backers: 85,
      daysLeft: 20,
    },
    {
      id: 3,
      title: '项目三',
      description: '致力于环保的创新解决方案...',
      target: 200000,
      current: 120000,
      backers: 230,
      daysLeft: 10,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            首页
          </Menu.Item>
          <Menu.Item key="2" icon={<ProjectOutlined />}>
            众筹项目
          </Menu.Item>
          <Menu.Item key="3" icon={<RocketOutlined />}>
            价值转化
          </Menu.Item>
          <Menu.Item key="4" icon={<TeamOutlined />}>
            社区
          </Menu.Item>
          <Menu.Item key="5" icon={<UserOutlined />}>
            个人中心
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: '#fff' }}>
          <Title level={3} style={{ margin: '0 16px' }}>HiveNext | 蜂枢</Title>
        </Header>
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
            <Title level={2}>众筹项目</Title>
            <Paragraph>
              发现并支持创新项目，共同推动MindMobius(曼比乌斯)生态发展。
            </Paragraph>
            
            <Row gutter={[16, 16]}>
              {projects.map(project => (
                <Col xs={24} sm={12} md={8} key={project.id}>
                  <Card 
                    hoverable 
                    title={project.title}
                    extra={<Button type="primary">支持</Button>}
                  >
                    <Paragraph ellipsis={{ rows: 2 }}>{project.description}</Paragraph>
                    <Progress 
                      percent={Math.round((project.current / project.target) * 100)} 
                      status="active" 
                    />
                    <Row gutter={16}>
                      <Col span={8}>
                        <Statistic 
                          title="已筹" 
                          value={project.current} 
                          suffix={`/${project.target}`} 
                          precision={0} 
                        />
                      </Col>
                      <Col span={8}>
                        <Statistic title="支持者" value={project.backers} />
                      </Col>
                      <Col span={8}>
                        <Statistic title="剩余天数" value={project.daysLeft} />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          HiveNext | 蜂枢 ©{new Date().getFullYear()} MindMobius
        </Footer>
      </Layout>
    </Layout>
  );
}
