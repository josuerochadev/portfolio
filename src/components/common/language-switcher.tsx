import type React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/i18n";
import { COLORS, TRANSITIONS } from "@/constants";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  const currentLanguage = SUPPORTED_LANGUAGES.find(lang => lang.code === i18n.language) || SUPPORTED_LANGUAGES[0];

  const handleLanguageChange = (languageCode: SupportedLanguage) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Current Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-2 py-1 rounded-md
          bg-violet/10 hover:bg-violet/20 border border-violet/30
          ${COLORS.VIOLET.TEXT} font-sans font-bold text-xs uppercase tracking-wider
          ${TRANSITIONS.DEFAULT} backdrop-blur-sm
          focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2
        `}
        aria-label={`Current language: ${currentLanguage.name}. Click to change language`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-sm" role="img" aria-hidden="true">
          {currentLanguage.flag}
        </span>
        <span className="font-sans uppercase tracking-widest text-xs">
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
            transition={{ duration: 0.15 }}
            className={`
              fixed top-16 right-4 py-1 w-32
              bg-beige/95 border border-violet/30 rounded-md shadow-2xl z-[999999]
              backdrop-blur-md
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
                    w-full px-3 py-2 text-left flex items-center gap-2
                    ${COLORS.VIOLET.TEXT} hover:bg-violet/10 ${TRANSITIONS.DEFAULT}
                    ${isSelected ? 'bg-orange/20 font-bold' : 'font-medium'}
                    focus:outline-none focus:bg-orange/30 text-xs
                  `}
                  role="option"
                  aria-selected={isSelected}
                >
                  <span className="text-sm" role="img" aria-hidden="true">
                    {language.flag}
                  </span>
                  <span className="font-sans uppercase tracking-widest font-bold">
                    {language.code}
                  </span>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`ml-auto w-1.5 h-1.5 rounded-full bg-orange`}
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
          className="fixed inset-0 z-[999998] bg-black/10 backdrop-blur-[1px]"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default LanguageSwitcher;