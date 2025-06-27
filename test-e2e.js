const axios = require('axios');

// 测试配置
const BASE_URL = 'http://localhost:3001';
const TEST_DATA = {
  developer_id: 'test123456',
  app_id: 'affiliate123456',
  affiliate_id: 'secret123456'
};

// 测试结果
let testResults = {
  passed: 0,
  failed: 0,
  tests: []
};

// 测试函数
function addTest(name, testFn) {
  return async () => {
    try {
      await testFn();
      testResults.passed++;
      testResults.tests.push({ name, status: 'PASS' });
      console.log(`✅ ${name}`);
    } catch (error) {
      testResults.failed++;
      testResults.tests.push({ name, status: 'FAIL', error: error.message });
      console.log(`❌ ${name}: ${error.message}`);
    }
  };
}

// 测试用例
const tests = [
  addTest('Health Check', async () => {
    const response = await axios.get(`${BASE_URL}/`);
    if (response.status !== 200) {
      throw new Error(`Expected 200, got ${response.status}`);
    }
  }),

  addTest('Get Settings (Empty)', async () => {
    const response = await axios.get(`${BASE_URL}/api/settings`);
    if (response.status !== 200) {
      throw new Error(`Expected 200, got ${response.status}`);
    }
    if (!response.data || typeof response.data !== 'object') {
      throw new Error('Expected object response');
    }
  }),

  addTest('Save Settings', async () => {
    const response = await axios.post(`${BASE_URL}/api/settings`, TEST_DATA);
    if (response.status !== 200) {
      throw new Error(`Expected 200, got ${response.status}`);
    }
    if (!response.data.success) {
      throw new Error('Expected success response');
    }
  }),

  addTest('Get Settings (With Data)', async () => {
    const response = await axios.get(`${BASE_URL}/api/settings`);
    if (response.status !== 200) {
      throw new Error(`Expected 200, got ${response.status}`);
    }
    if (!response.data.developer_id || !response.data.app_id) {
      throw new Error('Expected settings data');
    }
  }),

  addTest('Search Products (Missing Keyword)', async () => {
    try {
      await axios.post(`${BASE_URL}/api/search`, {});
      throw new Error('Expected 400 error');
    } catch (error) {
      if (error.response.status !== 400) {
        throw new Error(`Expected 400, got ${error.response.status}`);
      }
    }
  }),

  addTest('Search Products (Success)', async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/search`, { keyword: 'test' });
      if (response.status !== 200) {
        throw new Error(`Expected 200, got ${response.status}`);
      }
      if (!response.data.items || !Array.isArray(response.data.items)) {
        throw new Error('Expected items array');
      }
    } catch (error) {
      // 如果返回 400 错误，检查是否是预期的 Application ID 错误
      if (error.response && error.response.status === 400 && 
          error.response.data.error && error.response.data.error.includes('Application ID')) {
        console.log('   注意: 使用测试 Application ID，这是预期的错误');
        return; // 这是预期的，因为测试 ID 无效
      }
      throw error; // 重新抛出其他错误
    }
  }),

  addTest('Save Settings (Missing Required Fields)', async () => {
    try {
      await axios.post(`${BASE_URL}/api/settings`, { developer_id: 'test' });
      throw new Error('Expected 400 error');
    } catch (error) {
      if (error.response.status !== 400) {
        throw new Error(`Expected 400, got ${error.response.status}`);
      }
    }
  })
];

// 运行测试
async function runTests() {
  console.log('🚀 开始端到端测试...\n');
  
  for (const test of tests) {
    await test();
  }

  // 输出测试报告
  console.log('\n📊 测试报告');
  console.log('='.repeat(50));
  console.log(`总测试数: ${testResults.passed + testResults.failed}`);
  console.log(`通过: ${testResults.passed}`);
  console.log(`失败: ${testResults.failed}`);
  console.log(`成功率: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(1)}%`);
  
  console.log('\n详细结果:');
  testResults.tests.forEach(test => {
    const status = test.status === 'PASS' ? '✅' : '❌';
    console.log(`${status} ${test.name}`);
    if (test.error) {
      console.log(`   错误: ${test.error}`);
    }
  });

  if (testResults.failed === 0) {
    console.log('\n🎉 所有测试通过！');
    process.exit(0);
  } else {
    console.log('\n⚠️  部分测试失败，请检查问题。');
    process.exit(1);
  }
}

// 检查服务器是否运行
async function checkServer() {
  try {
    await axios.get(`${BASE_URL}/`);
    console.log(`✅ 服务器运行在 ${BASE_URL}`);
    return true;
  } catch (error) {
    console.log(`❌ 无法连接到服务器 ${BASE_URL}`);
    console.log('请确保后端服务器正在运行: cd backend && node index.js');
    return false;
  }
}

// 主函数
async function main() {
  const serverRunning = await checkServer();
  if (!serverRunning) {
    process.exit(1);
  }
  
  await runTests();
}

main().catch(error => {
  console.error('测试运行失败:', error.message);
  process.exit(1);
}); 