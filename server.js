import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

// Load album data
const albums = JSON.parse(fs.readFileSync("./albums.json", "utf8"));

// Add routes here

app.listen(PORT, () => {
  console.log(`Album API running at http://localhost:${PORT}`);
});

// ----------------------------------------------------
// 1. GET /api/albums
// Return the full list of albums
// ---------------------------------------------------

app.get("/api/albums", (req, res) => {
  // req = what they requested, res = what youre responding to them with
  res.json(albums); // res.json(your response) gives it to them as a json object
});

// ----------------------------------------------------
// 2. GET /api/albums/:id
// Return one album by ID
// ---------------------------------------------------

app.get("/api/albums/:id", (req, res) => {
  const album = albums.find((a) => a.id == req.params.id);

  if (!album) {
    return res.status(404).json({ error: "Album not found" });
  }

  res.json(album);
});

// ----------------------------------------------------
// 3. GET /api/albums/:id/year
// Return one album title and year
// ---------------------------------------------------

app.get("/api/albums/:id/year", (req, res) => {
  const album = albums.find((a) => a.id == req.params.id);

  if (!albums) {
    return res.status(404).json({ error: "Album not found" });
  }
  res.json({
    title: album.title,
    year: album.year,
  });
});

// ----------------------------------------------------
// 4. GET /api/albums/artist/:name
// Return albums made by an artist
// ---------------------------------------------------

app.get("/api/albums/artist/:name", (req, res) => {
  const results = albums.filter(
    (a) => a.artist.toLowerCase() === req.params.name,
  );

  if (!albums) {
    return res.status(404).json({ error: "Album not found" });
  }
  res.json(results);
});
