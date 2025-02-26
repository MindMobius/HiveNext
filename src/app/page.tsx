'use client';

import { useState, useEffect } from 'react';
import { Layout, Button, Card, Row, Col, Typography, Statistic, Progress } from 'antd';
import { 
  HomeOutlined, 
  ProjectOutlined, 
  TeamOutlined, 
  UserOutlined,
  RocketOutlined
} from '@ant-design/icons';
import AppFooter from '../components/AppFooter';
import MenuSelector from '../components/MenuSelector';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeMenuKey, setActiveMenuKey] = useState('1');

  // 检测屏幕尺寸变化
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

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

  const menuItems = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: '首页'
    },
    {
      key: '2',
      icon: <ProjectOutlined />,
      label: '众筹项目'
    },
    {
      key: '3',
      icon: <RocketOutlined />,
      label: '价值转化'
    },
    {
      key: '4',
      icon: <TeamOutlined />,
      label: '社区'
    }
  ];

  const handleMenuSelect = (key: string) => {
    setActiveMenuKey(key);
    // 这里可以添加页面切换逻辑
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Header style={{ 
          padding: '0 16px', 
          background: '#fff', 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 'auto',
          minHeight: 64
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Title level={3} style={{ margin: '16px 0', whiteSpace: 'nowrap' }}>HiveNext | 蜂枢</Title>
          </div>
          
          <Button 
            type="default"
            icon={<UserOutlined />}
            shape="circle"
            size="large"
            style={{
              background: '#f0f0f0',
              border: '2px solid #d9d9d9',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          />
        </Header>
        
        <div style={{ padding: '0 16px', background: '#fff' }}>
          <MenuSelector 
            items={menuItems} 
            activeKey={activeMenuKey} 
            onSelect={handleMenuSelect}
            isMobile={isMobile}
          />
        </div>
        
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
        
        <AppFooter />
      </Layout>
    </Layout>
  );
}
