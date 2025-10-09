import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import "./OneWatchAnime.css";

function OneWatchAnime() {
  const { id } = useParams(); // get anime ID from route
  const [anime, setAnime] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const animeRes = await api.get(`/anime/${id}`);
        setAnime(animeRes.data);

        const epRes = await api.get(`/episodes/anime/${id}`);
        setEpisodes(epRes.data);

        if (epRes.data.length > 0) setSelectedEpisode(epRes.data[0]);
      } catch (err) {
        console.error("Error loading anime or episodes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [id]);

  if (loading) return <div className="watch-loading">Loading...</div>;
  if (!anime) return <div className="watch-error">Anime not found.</div>;

  return (
    <div className="watch-container">
      {/* 🎬 Anime Info Section */}
      <div
        className="watch-hero"
        style={{
          backgroundImage: `url(${anime.imgURL || "https://placehold.co/1200x600"})`,
        }}
      >
        <div className="watch-hero-overlay">
          <div className="watch-info">
            <h1>{anime.title}</h1>
            <p>{anime.description}</p>
            <div className="watch-tags">
              {anime.genre?.map((g, i) => (
                <span key={i} className="tag">
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 📺 Video Player Section */}
      <div className="watch-player-section">
        {selectedEpisode ? (
          <>
            <video
              src={selectedEpisode.videoURL}
              controls
              autoPlay
              className="watch-player"
            ></video>
            <h3 className="episode-title">{selectedEpisode.title}</h3>
          </>
        ) : (
          <p className="no-episodes">No episodes available.</p>
        )}
      </div>

      {/* 🎞 Episode List */}
      <div className="episode-list">
        <h2>Episodes</h2>
        <div className="episode-grid">
          {episodes.map((ep) => (
            <div
              key={ep._id}
              className={`episode-card ${
                selectedEpisode?._id === ep._id ? "active" : ""
              }`}
              onClick={() => setSelectedEpisode(ep)}
            >
              <div className="ep-thumb">
                <img
                  src={ep.thumbnailURL || anime.imgURL || "https://placehold.co/300x200"}
                  alt={ep.title}
                />
              </div>
              <div className="ep-info">
                <h4>{ep.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OneWatchAnime;
