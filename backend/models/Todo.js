import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model("Todo", todoSchema);

