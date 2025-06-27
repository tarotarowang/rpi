describe('Rakuten API Demo App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the main navigation', () => {
    cy.get('nav').should('contain', 'Guide');
    cy.get('nav').should('contain', '设置');
    cy.get('nav').should('contain', '商品查询');
  });

  it('should show Guide page by default', () => {
    cy.get('[data-testid="guide-page"]').should('be.visible');
    cy.contains('如何注册 Rakuten Developer ID').should('be.visible');
  });

  it('should navigate to Settings page', () => {
    cy.contains('设置').click();
    cy.get('[data-testid="settings-page"]').should('be.visible');
    cy.contains('设置 Rakuten API 配置').should('be.visible');
  });

  it('should navigate to Search page', () => {
    cy.contains('商品查询').click();
    cy.get('[data-testid="search-page"]').should('be.visible');
    cy.contains('商品查询').should('be.visible');
  });

  it('should save settings successfully', () => {
    // Mock the API response
    cy.intercept('POST', '/api/settings', {
      statusCode: 200,
      body: { success: true }
    }).as('saveSettings');

    cy.intercept('GET', '/api/settings', {
      statusCode: 200,
      body: {}
    }).as('getSettings');

    cy.contains('设置').click();
    
    // Fill in the form
    cy.get('input[placeholder*="Application ID"]').type('test123');
    cy.get('input[placeholder*="Affiliate ID"]').type('affiliate123');
    
    // Submit the form
    cy.contains('保存配置').click();
    
    // Wait for the API call
    cy.wait('@saveSettings');
    
    // Check for success message
    cy.contains('配置保存成功').should('be.visible');
  });

  it('should show error when required fields are missing', () => {
    cy.contains('设置').click();
    
    // Try to submit without filling required fields
    cy.contains('保存配置').click();
    
    // Should show validation error
    cy.contains('请输入 Application ID').should('be.visible');
    cy.contains('请输入 Affiliate ID').should('be.visible');
  });

  it('should search for products', () => {
    // Mock the API response
    cy.intercept('POST', '/api/search', {
      statusCode: 200,
      body: {
        items: [
          {
            name: 'Test Product 1',
            price: 1000,
            url: 'https://example.com/product1'
          },
          {
            name: 'Test Product 2',
            price: 2000,
            url: 'https://example.com/product2'
          }
        ]
      }
    }).as('searchProducts');

    cy.contains('商品查询').click();
    
    // Enter search keyword
    cy.get('input[placeholder*="商品关键词"]').type('laptop');
    cy.contains('查询').click();
    
    // Wait for the API call
    cy.wait('@searchProducts');
    
    // Check if products are displayed
    cy.contains('Test Product 1').should('be.visible');
    cy.contains('Test Product 2').should('be.visible');
    cy.contains('￥1000').should('be.visible');
    cy.contains('￥2000').should('be.visible');
  });

  it('should show error when search fails', () => {
    // Mock the API error response
    cy.intercept('POST', '/api/search', {
      statusCode: 500,
      body: { error: 'API 调用失败' }
    }).as('searchError');

    cy.contains('商品查询').click();
    
    // Enter search keyword
    cy.get('input[placeholder*="商品关键词"]').type('laptop');
    cy.contains('查询').click();
    
    // Wait for the API call
    cy.wait('@searchError');
    
    // Check for error message
    cy.contains('查询失败').should('be.visible');
  });

  it('should be responsive on mobile', () => {
    cy.viewport('iphone-x');
    
    cy.get('nav').should('be.visible');
    cy.contains('Guide').should('be.visible');
    cy.contains('设置').should('be.visible');
    cy.contains('商品查询').should('be.visible');
  });
}); 