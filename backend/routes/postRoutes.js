import express from "express";
import Post from "../models/post.js";

const router = express.Router();


// ================= CREATE POST =================
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    const newPost = new Post({
      title,
      content,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.log("Create Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


// ================= GET ALL POSTS =================
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.log("Fetch Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


// ================= UPDATE POST (EDIT) =================
router.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(updatedPost);
  } catch (error) {
    console.log("Update Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


// ================= DELETE POST =================
router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log("Delete Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;