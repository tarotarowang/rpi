import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock the page components
jest.mock('./GuidePage', () => {
  return function MockGuidePage() {
    return <div data-testid="guide-page">Guide Page</div>;
  };
});

jest.mock('./SettingsPage', () => {
  return function MockSettingsPage() {
    return <div data-testid="settings-page">Settings Page</div>;
  };
});

jest.mock('./SearchPage', () => {
  return function MockSearchPage() {
    return <div data-testid="search-page">Search Page</div>;
  };
});

describe('App Component', () => {
  test('renders navigation menu', () => {
    render(<App />);
    
    expect(screen.getByText('Guide')).toBeInTheDocument();
    expect(screen.getByText('设置')).toBeInTheDocument();
    expect(screen.getByText('商品查询')).toBeInTheDocument();
  });

  test('shows Guide page by default', () => {
    render(<App />);
    
    expect(screen.getByTestId('guide-page')).toBeInTheDocument();
  });

  test('switches to Settings page when clicked', () => {
    render(<App />);
    
    fireEvent.click(screen.getByText('设置'));
    expect(screen.getByTestId('settings-page')).toBeInTheDocument();
  });

  test('switches to Search page when clicked', () => {
    render(<App />);
    
    fireEvent.click(screen.getByText('商品查询'));
    expect(screen.getByTestId('search-page')).toBeInTheDocument();
  });

  test('shows footer', () => {
    render(<App />);
    
    expect(screen.getByText('Rakuten API Demo ©2024')).toBeInTheDocument();
  });
});
