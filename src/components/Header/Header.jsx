import React, { useState } from "react";
import "./Header.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

function Header() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="header-container">
      {/* Logo */}
      <div>
        <Link to="/" className="logo">
          <img src={logo} alt="logo" width={60} height={40} />
          <span>{t("header.stream")}</span>
        </Link>
      </div>

      {/* Desktop Nav */}
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/home">{t("header.home")}</Link>
          </li>
          <li>
            <Link to="/genres">{t("header.genres")}</Link>
          </li>
        </ul>
      </nav>

      {/* Utilities (desktop only) */}
      <div className="utilis">
        <LanguageSwitcher />
        <ThemeSwitcher />
        <button className="login-btn">
          <Link to="/login">{t("header.login")}</Link>
        </button>
      </div>

      {/* Hamburger for mobile */}
      <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/home" onClick={() => setMenuOpen(false)}>
          {t("header.home")}
        </Link>
        <Link to="/genres" onClick={() => setMenuOpen(false)}>
          {t("header.genres")}
        </Link>
        <LanguageSwitcher />
        <ThemeSwitcher />
        <button className="login-btn" onClick={() => setMenuOpen(false)}>
          <Link to="/login">{t("header.login")}</Link>
        </button>
      </div>
    </div>
  );
}

export default Header;
