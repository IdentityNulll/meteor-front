import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import "./Admin.css";
import { Link } from "react-router-dom";

function Admin() {
  const [animes, setAnimes] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    status: "ongoing",
  });
  const [imgFile, setImgFile] = useState(null);

  useEffect(() => {
    fetchAnimes();
  }, []);

  const fetchAnimes = async () => {
    try {
      const res = await axios.get("anime/");
      setAnimes(res.data);
    } catch (err) {
      console.error("❌ Error fetching animes:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImgFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imgFile) return alert("Please select an image!");

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("status", formData.status);
    data.append("genre", formData.genre);
    data.append("img", imgFile);

    try {
      await axios.post("anime/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData({ title: "", description: "", genre: "", status: "ongoing" });
      setImgFile(null);
      fetchAnimes();
    } catch (err) {
      console.error("❌ Error adding anime:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/anime/${id}`);
      setAnimes((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error("❌ Error deleting anime:", err);
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Panel</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Anime Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Anime Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="genre"
          placeholder="Genres (comma separated)"
          value={formData.genre}
          onChange={handleChange}
          required
        />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        <button type="submit">Add Anime</button>
      </form>

      <div className="anime-list">
        {animes.length > 0 ? (
          animes.map((anime) => (
            <Link
              to={`/admin/anime/${anime._id}`}
              key={anime._id}
              className="anime-card"
            >
              <img src={anime.imgURL} alt={anime.title} />
              <div className="anime-info">
                <h3>{anime.title}</h3>
                <p>{anime.description}</p>
                <p>
                  <strong>Genre:</strong> {anime.genre.join(", ")}
                </p>
                <p>
                  <strong>Status:</strong> {anime.status}
                </p>
                <button onClick={() => handleDelete(anime._id)}>Delete</button>
              </div>
            </Link>
          ))
        ) : (
          <p>No animes found.</p>
        )}
      </div>
    </div>
  );
}

export default Admin;
