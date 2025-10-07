import React, { useEffect, useState } from "react";
import "./Home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();
  const [featured, setFeatured] = useState([]);
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    setFeatured([
      {
        _id: "1",
        title: "Attack on Titan",
        description: "Humanity fights for survival against the titans.",
        imageUrl: "https://placehold.co/1200x600?text=Attack+on+Titan",
      },
      {
        _id: "2",
        title: "Demon Slayer",
        description: "A boy fights demons to save his sister.",
        imageUrl: "https://placehold.co/1200x600?text=Demon+Slayer",
      },
      {
        _id: "3",
        title: "Jujutsu Kaisen",
        description: "Curses and sorcerers clash in modern Japan.",
        imageUrl: "https://placehold.co/1200x600?text=Jujutsu+Kaisen",
      },
    ]);

    setPopular([
      {
        _id: "a1",
        title: "Solo Leveling",
        genres: ["Action", "Fantasy"],
        imageUrl: "https://placehold.co/300x400?text=Solo+Leveling",
      },
      {
        _id: "a2",
        title: "One Piece",
        genres: ["Adventure"],
        imageUrl: "https://placehold.co/300x400?text=One+Piece",
      },
      {
        _id: "a3",
        title: "Naruto",
        genres: ["Action", "Shounen"],
        imageUrl: "https://placehold.co/300x400?text=Naruto",
      },
      {
        _id: "a4",
        title: "Chainsaw Man",
        genres: ["Horror", "Action"],
        imageUrl: "https://placehold.co/300x400?text=Chainsaw+Man",
      },
      {
        _id: "a5",
        title: "My Hero Academia",
        genres: ["Action", "Superpower"],
        imageUrl: "https://placehold.co/300x400?text=My+Hero+Academia",
      },
    ]);
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
                <img src={anime.imageUrl} alt={anime.title} />
                <div className="hero-overlay glass">
                  <h2>{anime.title}</h2>
                  <p>{anime.description}</p>
                  <button className="glow-btn">
                    {t("home.watch") || "Watch Now"}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="hero-controls">
          <div className="hero-prev">‹</div>
          <div className="hero-next">›</div>
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
          loop={featured.length > 1}
          className="popular-swiper"
        >
          {popular.map((anime) => (
            <SwiperSlide key={anime._id}>
              <div className="anime-card glass">
                <img src={anime.imageUrl} alt={anime.title} />
                <div className="anime-info">
                  <h4>{anime.title}</h4>
                  <p>{anime.genres.join(" • ")}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
}

export default Home;
