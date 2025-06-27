import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Typography, Card, Alert, Divider } from 'antd';
import axios from 'axios';

const { Title, Paragraph, Text } = Typography;
const API_URL = process.env.REACT_APP_API_URL || '/api';

function SettingsPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/settings`).then(res => {
      if (res.data && res.data.developer_id && res.data.app_id) {
        form.setFieldsValue({
          developer_id: res.data.developer_id,
          app_id: res.data.app_id,
          affiliate_id: res.data.affiliate_id || '',
        });
      }
    });
  }, [form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/settings`, values);
      message.success('配置保存成功！现在可以使用商品查询功能了。');
    } catch (e) {
      console.error('保存失败:', e);
      if (e.response?.status === 400) {
        message.error('保存失败：请检查输入的信息是否正确');
      } else {
        message.error('保存失败：请检查网络连接或稍后重试');
      }
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <Card>
        <Title level={3}>设置 Rakuten API 配置</Title>
        
        <Alert
          message="配置说明"
          description="请从你的 Rakuten Developer 管理后台获取以下信息并填写。"
          type="info"
          showIcon
          style={{ marginBottom: 24 }}
        />
        
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item 
            label="Application ID" 
            name="developer_id" 
            rules={[{ required: true, message: '请输入 Application ID' }]}
            extra="从管理后台获取的 Application ID，用于 API 调用认证"
          > 
            <Input placeholder="例如: 1012973846241817900" />
          </Form.Item>
          
          <Form.Item 
            label="Affiliate ID" 
            name="app_id" 
            rules={[{ required: true, message: '请输入 Affiliate ID' }]}
            extra="从管理后台获取的 Affiliate ID，用于商品链接追踪"
          > 
            <Input placeholder="例如: 49a6faea.dc7c294e.49a6faeb.52bfdf99" />
          </Form.Item>
          
          <Form.Item 
            label="Application Secret (可选)" 
            name="affiliate_id" 
            extra="从管理后台获取的 Application Secret，用于高级功能"
          > 
            <Input.Password placeholder="例如: 08887439ffc1d3e1d5aabe32108b3762380a0d11" />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              保存配置
            </Button>
          </Form.Item>
        </Form>
        
        <Divider />
        
        <Card title="配置信息说明" size="small">
          <Paragraph>
            <Text strong>Application ID：</Text>
            <br />
            这是你的应用唯一标识符，用于向 Rakuten API 发送请求时的身份验证。
            <br />
            格式示例：<Text code>1012973846241817900</Text>
          </Paragraph>
          
          <Paragraph>
            <Text strong>Affiliate ID：</Text>
            <br />
            这是你的联盟营销 ID，用于追踪通过你的应用产生的销售。
            <br />
            格式示例：<Text code>49a6faea.dc7c294e.49a6faeb.52bfdf99</Text>
          </Paragraph>
          
          <Alert
            message="注意"
            description="请确保信息准确无误，错误的配置可能导致 API 调用失败。"
            type="warning"
            showIcon
            style={{ marginTop: 16 }}
          />
        </Card>
      </Card>
    </div>
  );
}

export default SettingsPage; 