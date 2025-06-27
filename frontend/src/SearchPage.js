import React, { useState } from 'react';
import { Input, List, Typography, Card, message } from 'antd';
import axios from 'axios';

const { Title } = Typography;

function SearchPage() {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const handleSearch = async () => {
    if (!keyword) {
      message.warning('请输入关键词');
      return;
    }
    setLoading(true);
    setItems([]);
    try {
      const res = await axios.post('/api/search', { keyword });
      setItems(res.data.items || []);
    } catch (e) {
      message.error('查询失败，或未设置 App ID');
    }
    setLoading(false);
  };

  return (
    <Card style={{ maxWidth: 600, margin: '0 auto' }}>
      <Title level={3}>商品查询</Title>
      <Input.Search
        placeholder="请输入商品关键词"
        enterButton="查询"
        size="large"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        onSearch={handleSearch}
        loading={loading}
        style={{ marginBottom: 24 }}
      />
      <List
        bordered
        dataSource={items}
        renderItem={item => (
          <List.Item>
            <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>
            <span style={{ float: 'right', color: '#fa541c', fontWeight: 600 }}>￥{item.price}</span>
          </List.Item>
        )}
        locale={{ emptyText: '暂无数据' }}
      />
    </Card>
  );
}

export default SearchPage; 