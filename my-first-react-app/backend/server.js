import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// TMDB Base URL + API Key
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

// ✅ Get Trending Movies (week)
app.get("/api/trending", async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/trending/movie/week`, {
      params: { api_key: API_KEY }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching trending movies:", error.message);
    res.status(500).json({ error: "Failed to fetch trending movies" });
  }
});

// ✅ Search Movies
app.get("/api/search", async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get(`${API_BASE_URL}/search/movie`, {
      params: { api_key: API_KEY, query }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error searching movies:", error.message);
    res.status(500).json({ error: "Failed to search movies" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
