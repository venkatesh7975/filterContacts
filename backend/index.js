const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

// ========================
// Middleware
// ========================

app.use(cors());
app.use(express.json());

// ========================
// MySQL Connection
// ========================

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "your_password",
  database: "crud_app",
});

db.connect(() => {
  console.log("MySQL connected");
});

// ========================
// 1. CREATE
// POST /users
// ========================

app.post("/users", (req, res) => {
  const { name, number } = req.body;

  const sql = "INSERT INTO users (name, number) VALUES (?, ?)";

  db.query(sql, [name, number], (err, result) => {
    res.json(result);
  });
});

// ========================
// 2. READ ALL
// GET /users
// ========================

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";

  db.query(sql, (err, result) => {
    res.json(result);
  });
});

// ========================
// 3. READ ONE
// GET /users/:id
// ========================

app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  const sql = "SELECT * FROM users WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    res.json(result);
  });
});

// ========================
// 4. UPDATE
// PUT /users/:id
// ========================

app.put("/users/:id", (req, res) => {
  const id = req.params.id;

  const { name, number } = req.body;

  const sql = `
    UPDATE users
    SET name = ?, number = ?
    WHERE id = ?
  `;

  db.query(sql, [name, number, id], (err, result) => {
    res.json(result);
  });
});

// ========================
// 5. DELETE
// DELETE /users/:id
// ========================

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM users WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    res.json(result);
  });
});

// ========================
// Server
// ========================

app.listen(3000, () => {
  console.log("Server running on port 3000");
});