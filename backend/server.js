const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ========================
// Middleware
// ========================

app.use(cors());
app.use(express.json());

// ========================
// MongoDB Connection
// ========================

mongoose.connect("mongodb://127.0.0.1:27017/crud_app");

console.log("MongoDB connected");

// ========================
// Schema
// ========================

const userSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// ========================
// Model
// ========================

const User = mongoose.model("User", userSchema);

// ========================
// 1. CREATE
// POST /users
// ========================

app.post("/users", async (req, res) => {
  const { name, number } = req.body;

  const user = new User({
    name: name,
    number: number,
  });

  const savedUser = await user.save();

  res.json(savedUser);
});

// ========================
// 2. READ ALL
// GET /users
// ========================

app.get("/users", async (req, res) => {
  const users = await User.find();

  res.json(users);
});

// ========================
// 3. READ ONE
// GET /users/:id
// ========================

app.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  res.json(user);
});

// ========================
// 4. UPDATE
// PUT /users/:id
// ========================

app.put("/users/:id", async (req, res) => {
  const { name, number } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: name,
      number: number,
    },
    {
      new: true,
    }
  );

  res.json(updatedUser);
});

// ========================
// 5. DELETE
// DELETE /users/:id
// ========================

app.delete("/users/:id", async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);

  res.json(deletedUser);
});

// ========================
// Server
// ========================

app.listen(3000, () => {
  console.log("Server running on port 3000");
});