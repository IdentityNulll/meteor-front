import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import "./OneAnime.css";

function OneAnime() {
  const { id } = useParams();

  // Anime state
  const [anime, setAnime] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    status: "ongoing",
  });
  const [imgFile, setImgFile] = useState(null);

  // Episodes state
  const [episodes, setEpisodes] = useState([]);
  const [episodeForm, setEpisodeForm] = useState({
    title: "",
    episodeNumber: "",
  });
  const [videoFile, setVideoFile] = useState(null);

  // Fetch anime + episodes on load
  useEffect(() => {
    fetchAnime();
    fetchEpisodes();
  }, []);

  const fetchAnime = async () => {
    try {
      const res = await axios.get(`anime/${id}`);
      setAnime(res.data);
      setFormData({
        title: res.data.title,
        description: res.data.description,
        genre: res.data.genre.join(", "),
        status: res.data.status,
      });
    } catch (err) {
      console.error("❌ Error fetching anime:", err);
    }
  };

  const fetchEpisodes = async () => {
    try {
      const res = await axios.get(`episodes/anime/${id}`);
      setEpisodes(res.data);
    } catch (err) {
      console.error("❌ Error fetching episodes:", err);
    }
  };

  // Anime form handlers
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setImgFile(e.target.files[0]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("genre", formData.genre);
    data.append("status", formData.status);
    if (imgFile) data.append("img", imgFile);

    try {
      await axios.put(`anime/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchAnime();
      alert("✅ Anime updated successfully!");
    } catch (err) {
      console.error("❌ Error updating anime:", err);
    }
  };

  // Episode form handlers
  const handleEpisodeChange = (e) =>
    setEpisodeForm({ ...episodeForm, [e.target.name]: e.target.value });
  const handleVideoChange = (e) => setVideoFile(e.target.files[0]);

  const handleAddEpisode = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("animeId", id);
    data.append("title", episodeForm.title);
    data.append("episodeNumber", episodeForm.episodeNumber);
    data.append("video", videoFile);

    try {
      await axios.post("episodes/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setEpisodeForm({ title: "", episodeNumber: "" });
      setVideoFile(null);
      fetchEpisodes(); // 🔥 Refresh the episode list immediately
      alert("✅ Episode added!");
    } catch (err) {
      console.error("❌ Error adding episode:", err);
    }
  };

  const handleDeleteEpisode = async (episodeId) => {
    try {
      await axios.delete(`episodes/${episodeId}`);
      setEpisodes((prev) => prev.filter((ep) => ep._id !== episodeId));
    } catch (err) {
      console.error("❌ Error deleting episode:", err);
    }
  };

  if (!anime) return <p>Loading...</p>;

  return (
    <div className="one-anime-page">
      <h1>Edit Anime: {anime.title}</h1>
      <img src={anime.imgURL} alt={anime.title} />

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
        />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Save Changes</button>
      </form>

      <hr />
      <h2>Add Episode</h2>
      <form onSubmit={handleAddEpisode}>
        <input
          type="text"
          name="title"
          placeholder="Episode Title"
          value={episodeForm.title}
          onChange={handleEpisodeChange}
          required
        />
        <input
          type="number"
          name="episodeNumber"
          placeholder="Episode Number"
          value={episodeForm.episodeNumber}
          onChange={handleEpisodeChange}
          required
        />
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          required
        />
        <button type="submit">Add Episode</button>
      </form>

      <hr />
      <h2>Episodes</h2>
      {episodes.length > 0 ? (
        episodes
          .sort((a, b) => a.episodeNumber - b.episodeNumber)
          .map((ep) => (
            <div key={ep._id} className="episode-card">
              <h3>
                Episode {ep.episodeNumber}: {ep.title}
              </h3>
              <video width="400" controls>
                <source src={ep.videoURL} type="video/mp4"/>
              </video>
              <button onClick={() => handleDeleteEpisode(ep._id)}>
                Delete Episode
              </button>
            </div>
          ))
      ) : (
        <p>No episodes yet.</p>
      )}
    </div>
  );
}

export default OneAnime;
