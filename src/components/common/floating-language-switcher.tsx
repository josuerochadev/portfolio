import type React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/i18n";
import { COLORS, TRANSITIONS } from "@/constants";

const FloatingLanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  const currentLanguage = SUPPORTED_LANGUAGES.find(lang => lang.code === i18n.language) || SUPPORTED_LANGUAGES[0];

  const handleLanguageChange = (languageCode: SupportedLanguage) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed top-6 right-6 z-[99999] transform-gpu
          flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full
          bg-gradient-to-br from-lime/20 via-orange/10 to-violet/5
          dark:from-lime/10 dark:via-orange/5 dark:to-violet/10
          backdrop-blur-md border border-lime/30 dark:border-lime/20 text-violet dark:text-beige
          hover:bg-lime hover:text-orange dark:hover:bg-lime/20 dark:hover:text-lime
          font-sans font-bold text-xs sm:text-sm uppercase tracking-wider
          ${TRANSITIONS.DEFAULT} shadow-card hover:shadow-card-hover
          active:scale-95 transition-transform duration-150
          focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2
        `}
        aria-label={`Current language: ${currentLanguage.name}. Click to change language`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="font-sans uppercase tracking-widest text-xs sm:text-sm font-bold">
          {currentLanguage.code}
        </span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`
              fixed top-20 right-6 z-[99998]
              w-32 sm:w-36 rounded-2xl shadow-card-hover
              bg-gradient-to-br from-lime/20 via-orange/10 to-violet/5
              dark:from-lime/10 dark:via-orange/5 dark:to-violet/10
              backdrop-blur-md border border-lime/30 dark:border-lime/20
            `}
            role="listbox"
            aria-label="Language options"
          >
            {SUPPORTED_LANGUAGES.map((language) => {
              const isSelected = language.code === currentLanguage.code;
              
              return (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`
                    w-full px-3 py-3 sm:px-4 text-left flex items-center gap-2 sm:gap-3
                    text-violet dark:text-beige hover:bg-lime hover:text-orange dark:hover:bg-lime/20 dark:hover:text-lime ${TRANSITIONS.DEFAULT}
                    ${isSelected ? 'bg-orange/10 font-bold' : 'font-medium'}
                    focus:outline-none focus:bg-orange/20 text-xs sm:text-sm
                    first:rounded-t-xl last:rounded-b-xl active:scale-95 transition-transform duration-150
                  `}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="flex-1">
                    <div className="font-sans uppercase tracking-widest font-bold text-xs sm:text-sm">
                      {language.code}
                    </div>
                    <div className="text-xs opacity-70 font-normal hidden sm:block">
                      {language.name}
                    </div>
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-orange"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[99997]"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default FloatingLanguageSwitcher;