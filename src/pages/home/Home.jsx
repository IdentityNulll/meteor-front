import React, { useEffect, useState } from "react";
import "./Home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";
import api from "../../api/axios";
import { Link } from "react-router-dom";

function Home() {
  const { t } = useTranslation();
  const [featured, setFeatured] = useState([]);
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await api.get("/anime"); // ✅ baseURL handles domain automatically
        const allAnime = res.data;

        // Assuming your backend returns: title, description, imgURL, genre[], etc.
        setFeatured(allAnime.slice(0, 3)); // first 3 featured
        setPopular(allAnime); // rest for popular
      } catch (err) {
        console.error("Failed to fetch anime:", err);
      }
    };

    fetchAnime();
  }, []);

  return (
    <div className="home-container">
      {/* 🎬 HERO SECTION */}
      <section className="hero-section">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{ nextEl: ".hero-next", prevEl: ".hero-prev" }}
          pagination={{ clickable: true, el: ".hero-pagination" }}
          autoplay={{ delay: 4000 }}
          loop={featured.length > 1}
          className="hero-swiper"
        >
          {featured.map((anime) => (
            <SwiperSlide key={anime._id}>
              <div className="hero-slide">
                <img
                  src={
                    anime.imgURL ||
                    "https://placehold.co/1200x600?text=No+Image"
                  }
                  alt={anime.title}
                />
                <div className="hero-overlay glass">
                  <h2>{anime.title}</h2>
                  <p>{anime.description}</p>
                  <Link to={`/anime/${anime._id}`}>
                    <button className="glow-btn">
                      {t("home.watch") || "Watch Now"}
                    </button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="hero-controls">
          <div className="hero-prev">&#10094;</div>
          <div className="hero-next">&#10095;</div>
          <div className="hero-pagination"></div>
        </div>
      </section>

      {/* 🔥 POPULAR SECTION */}
      <section className="anime-section">
        <div className="section-header">
          <h2>🔥 {t("home.popular") || "Popular Anime"}</h2>
          <div className="popular-controls">
            <div className="popular-prev">‹</div>
            <div className="popular-next">›</div>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".popular-next",
            prevEl: ".popular-prev",
          }}
          spaceBetween={25}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 10 },
            480: { slidesPerView: 2.5, spaceBetween: 15 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 25 },
            1280: { slidesPerView: 5, spaceBetween: 30 },
          }}
          loop={popular.length > 1}
          className="popular-swiper"
        >
          {popular.map((anime) => (
            <SwiperSlide key={anime._id}>
              <Link to={`/anime/${anime._id}`}>
              <div className="anime-card glass">
                <img
                  src={
                    anime.imgURL || "https://placehold.co/300x400?text=No+Image"
                  }
                  alt={anime.title}
                />
                <div className="anime-info">
                  <h4>{anime.title}</h4>
                  <p>{anime.genre?.join(" • ") || "Unknown"}</p>
                </div>
              </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
}

export default Home;
