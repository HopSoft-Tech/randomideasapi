const express = require("express");
const router = express.Router();

// Connect to the Idea Model
const Idea = require("../models/Idea");

// const ideas = [
//   {
//     id: 1,
//     text: "Positive NewsLetter, a newsletter that only shares positive, uplifting news",
//     tag: "Technology",
//     username: "TonyStark",
//     date: "2024-01-02",
//   },
//   {
//     id: 2,
//     text: "Milk cartons that turn a different color the older that your milk is getting",
//     tag: "Inventions",
//     username: "SteveRogers",
//     date: "2024-01-02",
//   },
//   {
//     id: 3,
//     text: "ATM location app which lets you know where the closest ATM is and if it is in service",
//     tag: "Software",
//     username: "BruceBanner",
//     date: "2024-01-02",
//   },
// ];

// GET all ideas and also filter by tagName
// when you hit this endpoint /api/ideas?page=1&limit=5
// Limit the Number of ideas Displayed per page
router.get("/", async (req, res) => {
  try {
    let query = {};

    if (req.query.tag) {
      query.tag = req.query.tag;
    }

    if (req.query.username) {
      query.username = req.query.username;
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const ideas = await Idea.find(query).skip(skip).limit(limit);

    res.json({
      success: true,
      page,
      limit,
      data: ideas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// GET Single idea
router.get("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({
        success: false,
        message: "Idea not found",
      });
    }
    res.json({ success: true, data: idea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Add an Idea using the Post Method
router.post("/", async (req, res) => {
  // Validate text Field
  if (!req.body.text) {
    return res
      .status(400)
      .json({ success: false, message: "Please add a text Field now!" });
  }

  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });

  try {
    const savedIdea = await idea.save();
    res.json({ success: true, data: savedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Update Idea
router.put("/:id", async (req, res) => {
  try {
    const updatedIdea = await Idea.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          text: req.body.text,
          tag: req.body.tag,
        },
      },
      { returnDocument: "after" },
    );
    res.json({ success: true, data: updatedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Like an Idea or Increase Liked Idea
router.put("/:id/like", async (req, res) => {
  try {
    const likedIdea = await Idea.findByIdAndUpdate(
      req.params.id,
      {
        // Use the mongodb increase operator
        $inc: { likes: 1 }, // increase by 1
      },
      { returnDocument: "after" },
    );

    if (!likedIdea) {
      return res.status(404).json({
        success: false,
        message: "Idea not found",
      });
    }

    res.json({ success: true, data: likedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Delete Idea
// router.delete("/:id", (req, res) => {
//   const index = ideas.findIndex((idea) => idea.id === parseInt(req.params.id));

//   if (index === -1)
//     return res
//       .status(404)
//       .json({ success: false, message: "Could not find idea with that id" });

//   // Remove the Idea based on the index
//   ideas.splice(index, 1);

//   res.json({ success: true, data: ideas });
// });

// OR use this to Delete Idea
router.delete("/:id", async (req, res) => {
  try {
    const deletedIdea = await Idea.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Idea not found",
      });
    }
    res.json({ success: true, data: deletedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

module.exports = router;
