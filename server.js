const express = require("express");
const app = express();
const port = 3000;

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
