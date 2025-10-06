import React, { use } from "react";
import "./Search.css";
import Animate from "./Animate";
import { useTranslation } from "react-i18next";

const Search = () => {
  const {t} = useTranslation();
  return (
    <div className="dark-theme">

      <div className="animated-bg">
        <Animate />
      </div>

      <div className="container">

        {/* Main Content */}
        <div className="main-content">
          <div className="title-container">
            <h1>{t("search.meteor")}</h1>
            <p>{t("search.Anime")}</p>
          </div>
          <div className="search-container">
            <form id="search-form" action="index.html" method="GET">
              <div className="search-box">
                <input
                  type="search"
                  className="search-input"
                  name="q"
                  placeholder={t("search.placeholder")}
                />
                <button type="submit" className="search-btn">
                  <img
                    src="https://img.icons8.com/ios-filled/50/ffffff/search.png"
                    alt="Search"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer>
          <div className="footer-links">
            <a href="#">Privacy policy</a> - 
            <a href="#">Content removal</a> • 
            <a href="#">Contact us</a>
          </div>
          <div className="footer-brand">
            METEOR DUBBING - Made with Identitynull, SEVEN
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Search;
