import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Genres.css";

function Genres() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const genres = t("genres.list", { returnObjects: true });

  const handleClick = (genre) => {
    // Keep route in English format for consistency (optional)
    const routeGenre = genre.toLowerCase().replace(/\s+/g, "-");
    navigate(`/genre/${routeGenre}`);
  };

  return (
    <div className="genres-container">
      <h2 className="genres-title">{t("genres.title")}</h2>

      <div className="genres-grid">
        {genres.map((genre, index) => (
          <div
            key={index}
            className="genre-card"
            onClick={() => handleClick(genre)}
          >
            <span className="genre-text">{genre}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Genres;
