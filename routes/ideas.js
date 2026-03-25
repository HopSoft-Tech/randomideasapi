const express = require('express');
const router = express.Router();

const ideas = [
  {
    id: 1,
    text: "Positive NewsLetter, a newsletter that only shares positive, uplifting news",
    tag: "Technology",
    username: "TonyStark",
    date: "2024-01-02",
  },
  {
    id: 2,
    text: "Milk cartons that turn a different color the older that your milk is getting",
    tag: "Inventions",
    username: "SteveRogers",
    date: "2024-01-02",
  },
  {
    id: 3,
    text: "ATM location app which lets you know where the closest ATM is and if it is in service",
    tag: "Software",
    username: "BruceBanner",
    date: "2024-01-02",
  },
];

// GET all ideas
router.get("/", (req, res) => {
  res.json({ success: true, data: ideas });
});

// GET Single idea
router.get("/:id", (req, res) => {
  const idea = ideas.find((idea) => idea.id === parseInt(req.params.id));

  if (!idea)
    return res
      .status(404)
			.json({ success: false, message: "Could not find idea with that id" });
  res.json({ success: true, data: idea });
});

module.exports = router;