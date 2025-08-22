import express from "express";
import jwt from "jsonwebtoken";
import Todo from "../models/Todo.js";

const router = express.Router();

function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });

    req.userId = decoded.id;
    next(); 
  });
}

router.post("/", authMiddleware, async (req, res) => {
  try {
    const newTodo = new Todo({ 
      ...req.body, 
      userId: req.userId 
    });

    await newTodo.save();
    res.json(newTodo);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});


router.get("/", authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true } 
    );

    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});


router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Todo.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: "Todo deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;

