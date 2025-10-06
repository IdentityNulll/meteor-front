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
    const fakeFeatured = [
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
    ];

    const fakePopular = [
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
    ];

    setFeatured(fakeFeatured);
    setPopular(fakePopular);
  }, []);

  return (
    <div className="home-container">
      {/* 🎬 Hero Section */}
      <section className="hero-section">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop
          className="hero-swiper"
        >
          {featured.map((anime) => (
            <SwiperSlide key={anime._id}>
              <div className="hero-slide">
                <img src={anime.imageUrl} alt={anime.title} />
                <div className="hero-overlay">
                  <h2>{anime.title}</h2>
                  <p>{anime.description}</p>
                  <button>{t("home.watch")}</button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 🔥 Popular Section */}
      <section className="anime-section">
        <h2>🔥 {t("home.popular")}</h2>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={5}
          navigation
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 10 },
            480: { slidesPerView: 2.5, spaceBetween: 15 },
            640: { slidesPerView: 3, spaceBetween: 20 },
            900: { slidesPerView: 4, spaceBetween: 25 },
            1200: { slidesPerView: 5, spaceBetween: 30 },
          }}
        >
          {popular.map((anime) => (
            <SwiperSlide key={anime._id} className="anime-card">
              <img src={anime.imageUrl} alt={anime.title} />
              <div className="anime-info">
                <h4>{anime.title}</h4>
                <p>{anime.genres.join(" • ")}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
}

export default Home;
