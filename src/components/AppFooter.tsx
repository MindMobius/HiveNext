import React from 'react';
import { Layout, Row, Col, Card, Typography, Divider } from 'antd';
import { 
  GithubOutlined, 
  WechatOutlined,
  QqOutlined
} from '@ant-design/icons';
import { SiBilibili, SiTelegram, SiTiktok, SiXiaohongshu } from 'react-icons/si';

const { Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

interface SocialPlatform {
  icon: React.ReactNode;
  name?: string;
  link?: string;
  description?: string;
}

interface AppFooterProps {
  title?: string;
  description?: string;
  platforms?: SocialPlatform[];
}

const defaultPlatforms: SocialPlatform[] = [
  { 
    icon: <WechatOutlined />, 
    name: '微信公众号', 
    description: '曼比乌斯' 
  },
  { 
    icon: <SiXiaohongshu size={32} />, 
    name: '小红书', 
    link: 'https://www.xiaohongshu.com/user/profile/61505410000000000201d499',
  },
  { 
    icon: <SiBilibili size={32} />, 
    name: '哔哩哔哩', 
    link: 'https://space.bilibili.com/3493270952872062',
  },
  { 
    icon: <SiTiktok size={32} />, 
    name: '抖音', 
    link: 'https://www.douyin.com/user/MS4wLjABAAAANx33C9o1KGLopNIC6Du0XzJIY623EfeDD0rIMc2Va3mx_5pA-SeQVcpIm8AqpSND',
  },
  { 
    icon: <QqOutlined />, 
    name: 'QQ群', 
    link: 'https://qm.qq.com/q/MTNFlJW9qK',
  },
  { 
    icon: <SiTelegram size={32} />, 
    name: 'Telegram', 
    link: 'https://t.me/MindMobius',
  },
  { 
    icon: <GithubOutlined />, 
    name: 'GitHub', 
    link: 'https://github.com/MindMobius',
  },
];

const AppFooter: React.FC<AppFooterProps> = ({ 
  title = "关注我们", 
  description = "通过以下平台搜索 曼比乌斯",
  platforms = defaultPlatforms 
}) => {
  return (
    <Footer style={{ 
      background: '#f0f2f5', 
      padding: '24px 0 16px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <Row justify="center">
          <Col xs={24} md={20} lg={18}>
            <Title level={5} style={{ textAlign: 'center', marginBottom: '8px' }}>{title}</Title>
            <Paragraph style={{ textAlign: 'center', fontSize: '14px', marginBottom: '16px' }}>{description}</Paragraph>
            
            <Row gutter={[12, 12]} justify="center">
              {platforms.map((platform, index) => (
                <Col key={index}>
                  <a href={platform.link} target="_blank" rel="noopener noreferrer">
                    <Card 
                      hoverable 
                      style={{ 
                        width: 70,
                        height: 70, 
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}
                      bodyStyle={{ 
                        padding: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%'
                      }}
                    >
                      <div style={{ 
                        fontSize: 24,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%'
                      }}>
                        {platform.icon}
                      </div>
                    </Card>
                  </a>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        
        <Divider style={{ margin: '20px 0 16px' }} />
        
        <div style={{ textAlign: 'center' }}>
          <Text style={{ fontSize: '13px' }}>HiveNext | 蜂枢 ©{new Date().getFullYear()} MindMobius</Text>
        </div>
      </div>
    </Footer>
  );
};

export default AppFooter; 