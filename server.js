const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MySQL connection
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.localHost,
  user: process.env.root,
  password: process.env.marcoberry2020,
  database: process.env.real_estate,
});


// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database.");
});

// Fetch all apartments
app.get("/api/apartments", (req, res) => {
  db.query("SELECT * FROM apartments", (err, results) => {
    if (err) throw err;
    res.json(results);  // Return apartments to frontend
  });
});

// Add new apartment listing
app.post("/api/apartments", (req, res) => {
  const { location, price, type, image } = req.body;
  const sql = "INSERT INTO apartments (location, price, type, image) VALUES (?, ?, ?, ?)";
  db.query(sql, [location, price, type, image], (err, results) => {
    if (err) throw err;
    res.json({ message: "Listing added successfully!" });
  });
});

// Delete an apartment listing
app.delete("/api/apartments/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM apartments WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) throw err;
    res.json({ message: "Listing deleted successfully!" });
  });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

