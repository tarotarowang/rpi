const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// SQLite DB 初始化
const dbPath = path.resolve(__dirname, 'rpi.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('数据库连接失败:', err.message);
  } else {
    console.log('已连接到 SQLite 数据库');
  }
});

// 创建表（如不存在）
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    developer_id TEXT NOT NULL,
    app_id TEXT NOT NULL,
    affiliate_id TEXT
  )`);
});

// 基础路由
app.get('/', (req, res) => {
  res.send('Rakuten API 后端服务运行中');
});

// 保存设置
app.post('/api/settings', (req, res) => {
  const { developer_id, app_id, affiliate_id } = req.body;
  if (!developer_id || !app_id) {
    return res.status(400).json({ error: 'Application ID 和 Affiliate ID 必填' });
  }
  db.run('DELETE FROM settings'); // 只保留一条记录
  db.run('INSERT INTO settings (developer_id, app_id, affiliate_id) VALUES (?, ?, ?)', [developer_id, app_id, affiliate_id || ''], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true });
  });
});

// 获取设置
app.get('/api/settings', (req, res) => {
  db.get('SELECT developer_id, app_id, affiliate_id FROM settings LIMIT 1', (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row || {});
  });
});

// 商品查询
app.post('/api/search', async (req, res) => {
  const { keyword } = req.body;
  if (!keyword) {
    return res.status(400).json({ error: '关键词必填' });
  }
  db.get('SELECT developer_id, app_id, affiliate_id FROM settings LIMIT 1', async (err, row) => {
    if (err || !row) {
      return res.status(500).json({ error: '请先设置 Application ID' });
    }
    const applicationId = row.developer_id; // Application ID 用于 API 调用
    const affiliateId = row.app_id; // Affiliate ID 用于商品链接
    try {
      // Rakuten 商品搜索 API - 先不使用排序参数
      const apiUrl = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?applicationId=${applicationId}&keyword=${encodeURIComponent(keyword)}&hits=20&availability=1`;
      console.log('调用 Rakuten API:', apiUrl);
      const response = await axios.get(apiUrl);
      
      if (!response.data.Items) {
        return res.json({ items: [] });
      }
      
      // 手动按价格排序，取最便宜的10件
      const sortedItems = response.data.Items
        .map(i => ({
          name: i.Item.itemName,
          price: i.Item.itemPrice,
          url: i.Item.itemUrl
        }))
        .sort((a, b) => a.price - b.price)
        .slice(0, 10);
      
      // 添加 Affiliate ID 到链接
      const items = sortedItems.map(item => {
        let itemUrl = item.url;
        if (affiliateId) {
          const separator = itemUrl.includes('?') ? '&' : '?';
          itemUrl = `${itemUrl}${separator}af=${affiliateId}`;
        }
        return {
          name: item.name,
          price: item.price,
          url: itemUrl
        };
      });
      
      res.json({ items });
    } catch (e) {
      console.error('Rakuten API 错误:', e.response?.data || e.message);
      if (e.response?.data?.error === 'wrong_parameter') {
        res.status(400).json({ error: 'API 参数错误，请检查 Application ID 是否正确' });
      } else {
        res.status(500).json({ error: e.message });
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 