const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());  // Allow frontend to connect
app.use(express.json());  // Parse JSON data

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("MongoDB Error:", err));

// Sample API route
app.get("/api/recipes", (req, res) => {
  res.json([{ id: 1, name: "Pasta" }, { id: 2, name: "Pizza" }]);
});

// Start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
