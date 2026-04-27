import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import commonFR from './locales/fr/common.json';
import commonEN from './locales/en/common.json';
import commonPT from './locales/pt/common.json';

import heroFR from './locales/fr/hero.json';
import heroEN from './locales/en/hero.json';
import heroPT from './locales/pt/hero.json';

import projectsFR from './locales/fr/projects.json';
import projectsEN from './locales/en/projects.json';
import projectsPT from './locales/pt/projects.json';

import bioFR from './locales/fr/bio.json';
import bioEN from './locales/en/bio.json';
import bioPT from './locales/pt/bio.json';

import legalFR from './locales/fr/legal.json';
import legalEN from './locales/en/legal.json';
import legalPT from './locales/pt/legal.json';

// Available languages
export const SUPPORTED_LANGUAGES = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' }
] as const;

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]['code'];

// Translation resources
const resources = {
  fr: {
    common: commonFR,
    hero: heroFR,
    projects: projectsFR,
    bio: bioFR,
    legal: legalFR
  },
  en: {
    common: commonEN,
    hero: heroEN,
    projects: projectsEN,
    bio: bioEN,
    legal: legalEN
  },
  pt: {
    common: commonPT,
    hero: heroPT,
    projects: projectsPT,
    bio: bioPT,
    legal: legalPT
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', // Default fallback: English
    lng: 'fr', // Initial language
    
    // Detection options
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'portfolio-language',
      caches: ['localStorage'],
    },

    // Namespace configuration
    defaultNS: 'common',
    ns: ['common', 'hero', 'projects', 'bio', 'legal'],

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    // Development options
    debug: import.meta.env.DEV,
    
    // React-specific options
    react: {
      useSuspense: false, // Avoid suspense for SSG compatibility
    }
  });

export default i18n;