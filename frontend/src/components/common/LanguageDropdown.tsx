import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import english from '../../assets/english.jpeg';
import amharic from '../../assets/amharic.png';
import { Icon } from '@iconify/react';

const languages = [
  { code: "en", label: "English", native: "Eng", img: english },
  { code: "am", label: "Amharic", native: "Amh", img: amharic },
];

const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (code:any) => {
    i18n.changeLanguage(code);
    localStorage.setItem('i18nextLng', code);
    setIsOpen(false);
  };

  const currentLanguage = languages.find((lang) => lang.code === i18n.language);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2">
        <img src={currentLanguage?.img} alt={currentLanguage?.label} className="w-6 h-6 rounded-sm" />
        <Icon icon="mdi:chevron-down" className="w-5 h-5 text-[var(--tg-theme-text-color)]" />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 w-48 bg-[var(--tg-theme-bg-color)] border border-[var(--tg-theme-button-color)] 
            rounded shadow-lg transition-all duration-200 
            sm:top-full sm:mt-2       /* On larger screens: dropdown appears below */
            bottom-full mb-2 sm:bottom-auto sm:mb-0 /* On mobile: dropdown appears above */
          `}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className="flex items-center gap-2 w-full px-2 py-2 hover:bg-[var(--tg-theme-secondary-bg-color)]"
            >
              <img src={lang.img} alt={lang.label} className="w-6 h-6" />
              <span className="text-[var(--tg-theme-text-color)]">{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
