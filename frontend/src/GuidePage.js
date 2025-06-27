import React from 'react';
import { Typography, Steps, Card, Alert, Divider } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

const steps = [
  {
    title: '注册 Rakuten Developer ID',
    description: (
      <span>
        访问 <Link href="https://webservice.rakuten.co.jp/" target="_blank">Rakuten Developers 官网</Link>，点击右上角"新規登録"注册账号。
      </span>
    ),
  },
  {
    title: '登录并进入管理后台',
    description: '使用注册邮箱登录，进入开发者管理后台。',
  },
  {
    title: '创建应用获取 App ID',
    description: (
      <span>
        在"アプリID発行"页面，点击"新規アプリID発行"，填写应用信息后即可获得 App ID。
      </span>
    ),
  },
];

function GuidePage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <Typography>
        <Title level={2}>如何注册 Rakuten Developer ID 并获取 App ID</Title>
        
        <Steps direction="vertical" current={3} items={steps} style={{ marginBottom: 32 }} />
        
        <Divider />
        
        <Title level={3}>详细注册应用表单填写指南</Title>
        
        <Alert
          message="重要提示"
          description="Rakuten API 仅对日本市场开放，注册和使用时请遵循官方要求。"
          type="warning"
          showIcon
          style={{ marginBottom: 24 }}
        />
        
        <Card title="应用创建表单填写说明" style={{ marginBottom: 24 }}>
          <Title level={4}>必填字段说明：</Title>
          
          <Paragraph>
            <Text strong>1. Application name（应用名称）- 必填</Text>
            <br />
            例如：<Text code>PPT Item Search</Text>
            <br />
            建议使用描述性的英文名称，便于识别和管理。
          </Paragraph>
          
          <Paragraph>
            <Text strong>2. Application URL（应用URL）- 必填</Text>
            <br />
            例如：<Text code>https://webservice.rakuten.co.jp</Text>
            <br />
            如果还没有实际的应用网站，可以填写开发中的URL或使用示例URL。
          </Paragraph>
          
          <Paragraph>
            <Text strong>3. How did you find out about Rakuten Web Service?（如何了解到的）- 必填</Text>
            <br />
            选择最符合的选项：
            <ul>
              <li>Hackathons, seminars, and other events（黑客松、研讨会等活动）</li>
              <li>Rakuten Webservice Blog (Tumblr)（乐天Web服务博客）</li>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>From friends and acquaintances（朋友和熟人推荐）</li>
              <li>Flyer（传单）</li>
            </ul>
          </Paragraph>
          
          <Paragraph>
            <Text strong>4. CAPTCHA（验证码）- 必填</Text>
            <br />
            输入图片中显示的验证码，例如：<Text code>1234</Text>
          </Paragraph>
        </Card>
        
        <Card title="服务条款重要条款" style={{ marginBottom: 24 }}>
          <Paragraph>
            <Text strong>关键条款摘要：</Text>
          </Paragraph>
          
          <ul>
            <li><Text strong>开发者资格：</Text>必须是已注册的乐天会员</li>
            <li><Text strong>App ID 管理：</Text>必须安全保管，不得泄露给他人</li>
            <li><Text strong>使用限制：</Text>不得用于竞争性服务或违反法律法规</li>
            <li><Text strong>知识产权：</Text>Web服务的知识产权归乐天所有</li>
            <li><Text strong>免责声明：</Text>乐天不保证服务的无错误性和连续性</li>
          </ul>
          
          <Alert
            message="注意"
            description="请仔细阅读完整服务条款，注册即表示同意所有条款。"
            type="info"
            showIcon
            style={{ marginTop: 16 }}
          />
        </Card>
        
        <Card title="注册后步骤">
          <Paragraph>
            <Text strong>注册成功后：</Text>
          </Paragraph>
          
          <ol>
            <li>检查邮箱确认注册信息</li>
            <li>在管理后台查看已创建的App ID</li>
            <li>记录并安全保存App ID</li>
            <li>在本应用的"设置"页面输入App ID</li>
            <li>开始使用商品查询功能</li>
          </ol>
        </Card>
      </Typography>
    </div>
  );
}

export default GuidePage; 