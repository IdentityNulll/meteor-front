import React from "react";
import "./Header.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

function Header() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="header-container">
        <div>
          <Link to="/" className="logo">
            <img src={logo} alt="logo" width={60} height={40} />
            <span>{t("header.stream")}</span>
          </Link>
        </div>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to={"/home"}>{t("header.home")}</Link>
            </li>
            <li>
              <Link to={"/genres"}>{t("header.genres")}</Link>
            </li>
          </ul>
        </nav>
        <div className="utilis">
            <LanguageSwitcher/>
            <ThemeSwitcher/>
          <button>
            <Link to={"/login"}>{t("header.login")}</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
