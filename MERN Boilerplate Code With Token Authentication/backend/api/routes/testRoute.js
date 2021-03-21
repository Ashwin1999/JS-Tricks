const router = require("express").Router();
const Post = require("../models/Post");

const verifyToken = require("../authentication/authMiddleware");

router.get("/", verifyToken, async (req, res) => {
  try {
    const allPosts = await Post.find();
    res.status(200).json({ data: allPosts, message: "OK" });
  } catch (err) {
    res.status(500).json({ Error: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const specificPosts = await Post.findById(req.params.id);
    res.status(200).json({ data: specificPosts, message: "OK" });
  } catch (err) {
    res.status(500).json({ Error: err });
  }
});

router.post("/", verifyToken, async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const savePost = await post.save();
    res.status(200).json({ data: savePost, message: "OK" });
  } catch (err) {
    res.status(500).json({ Error: err });
  }
});

router.patch("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      useFindAndModify: false,
    });
    const updatedPost = await Post.findById(post._id);
    res.status(200).json({ data: updatedPost, message: "OK" });
  } catch (err) {
    res.status(500).json({ Error: err });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.deleteOne({ _id: req.params.id });
    res.json(post);
  } catch (err) {
    res.json({ Error: err });
  }
});

module.exports = router;
