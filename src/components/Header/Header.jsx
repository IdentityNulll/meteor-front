import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { FaSearch } from "react-icons/fa";

function Header({ animes }) {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // ✅ Load user info on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // ✅ Optional: Search system (can be uncommented later)
  // useEffect(() => {
  //   if (!searchTerm.trim()) {
  //     setSearchResults([]);
  //     return;
  //   }
  //   const results = animes.filter((anime) =>
  //     anime.title.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setSearchResults(results);
  // }, [searchTerm, animes]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  return (
    <div className="header-container">
      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <Link to={"/"}>
          <span>{t("header.stream")}</span>
        </Link>
      </div>

      {/* Nav + Search */}
      <div className="nav-search-wrapper">
        <nav className="nav-links">
          <Link to="/home">{t("header.home")}</Link>
          <Link to="/genres">{t("header.genres")}</Link>
        </nav>

        {/* Search */}
        <div className="header-search">
          <input
            type="text"
            placeholder="Anime nomi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="search-icon" />
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((anime) => (
                <Link
                  to={`/anime/${anime._id}`}
                  key={anime._id}
                  className="search-item"
                  onClick={() => setSearchTerm("")}
                >
                  {anime.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Utilities */}
      <div className="utilis">
        <LanguageSwitcher />
        <ThemeSwitcher />
        {user ? (
          <div className="user-menu">
            <img
              src={
                user.profilePic
                  ? user.profilePic.startsWith("http")
                    ? user.profilePic
                    : `https://meteor.identitynull.uz/${user.profilePic}`
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="profile"
              className="user-avatar"
              onClick={handleLogout} // click = logout
            />
          </div>
        ) : (
          <button className="login-btn">
            <Link to="/login">{t("header.login")}</Link>
          </button>
        )}
      </div>

      {/* Hamburger */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
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
        {user ? (
          <img
            src={
              user.profilePic
                ? user.profilePic.startsWith("http")
                  ? user.profilePic
                  : `https://meteor.identitynull.uz/${user.profilePic}`
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="profile"
            className="user-avatar"
            onClick={handleLogout}
          />
        ) : (
          <button className="login-btn" onClick={() => setMenuOpen(false)}>
            <Link to="/login">{t("header.login")}</Link>
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
