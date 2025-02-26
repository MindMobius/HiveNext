import React from 'react';
import { Menu } from 'antd';

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
}

interface MenuSelectorProps {
  items: MenuItem[];
  activeKey: string;
  onSelect: (key: string) => void;
  isMobile: boolean;
}

const MenuSelector: React.FC<MenuSelectorProps> = ({ 
  items, 
  activeKey, 
  onSelect,
  isMobile
}) => {
  const menuItems = items.map(item => ({
    key: item.key,
    icon: item.icon,
    label: item.label,
  }));

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[activeKey]}
      onSelect={({ key }) => onSelect(key)}
      items={menuItems}
      style={{ 
        borderRadius: 8,
        marginBottom: 16,
        display: 'flex',
        justifyContent: isMobile ? 'space-between' : 'flex-start',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
    />
  );
};

export default MenuSelector; 