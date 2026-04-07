const express = require("express");
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000; 
const connectDB = require('./config/db');

connectDB();

// Body parser middleware
// Sends Raw Json to the Server
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the RandomIdeas API" });
});

const ideasRouter = require("./routes/ideas");
app.use("/api/ideas", ideasRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
