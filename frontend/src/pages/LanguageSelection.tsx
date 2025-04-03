import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

// Import assets
import amharic from "../assets/amharic.png";
import english from "../assets/english.jpeg";
import ad3 from "../assets/ad1.jpeg";

interface LanguageOption {
  code: string;
  label: string;
  native: string;
  img: string;
}

const LanguageSelection: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    localStorage.getItem("i18nextLng") || "en"
  );

  const languages: LanguageOption[] = [
    { code: "am", label: "English", native: "Eng", img: english },
    { code: "en", label: "Amharic", native: "Amh", img: amharic },
  ];

  const handleChangeLanguage = (newLang: string) => {
    i18n.changeLanguage(newLang);
    localStorage.setItem("i18nextLng", newLang);
    setSelectedLanguage(newLang);
  };

  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center p-2 bg-theme-bg">
      {/* App Logo */}
      <div className="flex flex-col items-center space-y-2">
        <img src={ad3} alt="Bot" className="rounded-sm w-20 h-20 object-cover" />
        <h2 className="text-lg font-semibold text-theme-text">{t("select_language")}</h2>
        <p className="text-sm text-theme-accent text-center">{t("language_sub")}</p>
      </div>

      {/* Language Options */}
      <div className="w-full max-w-sm mt-6 space-y-4">
        {languages.map((lang) => (
          <div
            key={lang.code}
            className={`flex items-center justify-between p-2 border rounded-lg cursor-pointer ${
              selectedLanguage === lang.code ? "border-theme-accent border-2 bg-theme-bg" : "border-theme-card"
            }`}
            onClick={() => handleChangeLanguage(lang.code)}
          >
            <div className="flex items-center space-x-3">
              <img src={lang.img} alt={lang.label} className="w-10 h-10 object-cover rounded-full border border-gray-300" />
              <div>
                <p className="text-theme-text font-medium">{lang.label}</p>
                <p className="text-theme-accent text-sm">{lang.native}</p>
              </div>
            </div>
            <input type="radio" name="language" checked={selectedLanguage === lang.code} className="accent-theme-accent w-5 h-5" readOnly />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelection;
