import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import type { ReactNode } from 'react';
import Navbar from '../../../components/layout/navbar';

interface MockMotionProps {
  children: ReactNode;
  [key: string]: unknown;
}

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    a: ({ children, ...props }: MockMotionProps) => <a {...props}>{children}</a>,
    div: ({ children, ...props }: MockMotionProps) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: MockMotionProps) => <>{children}</>,
}));

// Mock SVG
vi.mock('@/assets/images/ui/smile.svg?react', () => ({
  default: () => <div data-testid="smile-icon">SmileIcon</div>,
}));

// Mock motion variants
vi.mock('@/utils/motion-variants', () => ({
  navLinkHover: {},
}));

// Mock i18next dependencies
vi.mock('i18next', () => ({
  default: {
    use: vi.fn(() => ({ use: vi.fn(() => ({ init: vi.fn() })) })),
  },
}));

vi.mock('i18next-browser-languagedetector', () => ({
  default: vi.fn(),
}));

// Mock the i18n configuration
vi.mock('@/i18n', () => ({
  default: {},
  SUPPORTED_LANGUAGES: [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' }
  ],
}));

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      // Return simple translations for testing
      const translations: Record<string, string> = {
        'navigation.home': 'Home',
        'navigation.work': 'Work',  
        'navigation.about': 'About',
        'navigation.contact': 'Contact',
        'navigation.blog': 'Blog',
      };
      return translations[key] || key;
    },
    i18n: {
      language: 'fr',
      changeLanguage: vi.fn(),
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: vi.fn(),
  },
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