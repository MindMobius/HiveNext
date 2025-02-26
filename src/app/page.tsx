'use client';

import { useState, useEffect } from 'react';
import { Layout, Button, Card, Row, Col, Typography, Statistic, Progress } from 'antd';
import { 
  HomeOutlined, 
  ProjectOutlined, 
  TeamOutlined, 
  UserOutlined,
  RocketOutlined,
  NodeIndexOutlined,
  DatabaseOutlined
} from '@ant-design/icons';
import AppFooter from '../components/AppFooter';
import MenuSelector from '../components/MenuSelector';
import ActiveBoard from '../components/ActiveBoard';
import ValueFlow from '../components/ValueFlow';
import Repository from '../components/Repository';
import type { Project } from '@/services/projectService';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeMenuKey, setActiveMenuKey] = useState('1');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      console.log('Fetched projects:', data);
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    {
      key: 'activeboard',
      icon: <ProjectOutlined />,
      label: 'ActiveBoard'
    },
    {
      key: 'valueflow',
      icon: <NodeIndexOutlined />,
      label: 'ValueFlow'
    },
    {
      key: 'repository',
      icon: <DatabaseOutlined />,
      label: 'Repository'
    }
  ];

  const handleMenuSelect = (key: string) => {
    setActiveMenuKey(key);
    // 这里可以添加页面切换逻辑
  };

  // 在Content中根据activeMenuKey渲染不同内容
  const renderContent = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    switch (activeMenuKey) {
      case 'activeboard':
        return <ActiveBoard projects={projects.filter(p => p.status === 'active')} />;
      case 'valueflow':
        return <ValueFlow projects={projects.filter(p => p.status === 'active')} />;
      case 'repository':
        return <Repository projects={projects.filter(p => p.status === 'pending')} />;
      default:
        return <ActiveBoard projects={projects.filter(p => p.status === 'active')} />;
    }
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
            {renderContent()}
          </div>
        </Content>
        
        <AppFooter />
      </Layout>
    </Layout>
  );
}
