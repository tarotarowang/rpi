import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { BookOutlined, SettingOutlined, SearchOutlined } from '@ant-design/icons';
import GuidePage from './GuidePage';
import SettingsPage from './SettingsPage';
import SearchPage from './SearchPage';
import 'antd/dist/reset.css';
import './App.css';

const { Header, Content, Footer } = Layout;

function App() {
  const [current, setCurrent] = useState('guide');

  let pageContent;
  if (current === 'guide') pageContent = <GuidePage />;
  else if (current === 'settings') pageContent = <SettingsPage />;
  else if (current === 'search') pageContent = <SearchPage />;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[current]}
          onClick={e => setCurrent(e.key)}
          items={[
            { key: 'guide', icon: <BookOutlined />, label: 'Guide' },
            { key: 'settings', icon: <SettingOutlined />, label: '设置' },
            { key: 'search', icon: <SearchOutlined />, label: '商品查询' },
          ]}
        />
      </Header>
      <Content style={{ padding: '24px', background: '#fff', flex: 1 }}>
        {pageContent}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Rakuten API Demo ©2024
      </Footer>
    </Layout>
  );
}

export default App;
