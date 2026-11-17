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
