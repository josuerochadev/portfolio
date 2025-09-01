import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../navbar';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
}));

// Mock SVG
vi.mock('@/assets/images/ui/smile.svg?react', () => ({
  default: () => <div data-testid="smile-icon">SmileIcon</div>,
}));

// Mock motion variants
vi.mock('@/utils/motion-variants', () => ({
  navLinkHover: {},
}));

const renderNavbar = () => {
  return render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
};

describe('Navbar', () => {
  it('renders navigation links', () => {
    renderNavbar();
    
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders smile icon', () => {
    renderNavbar();
    
    expect(screen.getByTestId('smile-icon')).toBeInTheDocument();
  });

  it('has correct navigation structure', () => {
    renderNavbar();
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('relative', 'w-full');
    
    const navList = screen.getByRole('list');
    expect(navList).toBeInTheDocument();
  });

  it('home link points to hero section', () => {
    renderNavbar();
    
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toHaveAttribute('href', '#hero');
  });
});