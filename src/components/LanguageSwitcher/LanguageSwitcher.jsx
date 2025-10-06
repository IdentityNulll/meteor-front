import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.css"; // add custom styles

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  return (
    <div className="language-switcher">
      <button
        className={`lang-btn ${i18n.language === "uz" ? "active" : ""}`}
        onClick={() => changeLanguage("en")}
      >
        <span className="label">Uz</span>
      </button>

      <button
        className={`lang-btn ${i18n.language === "jp" ? "active" : ""}`}
        onClick={() => changeLanguage("jp")}
      >
        <span className="label">Ru</span>
      </button>
    </div>
  );
}

export default LanguageSwitcher;
