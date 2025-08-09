import mongoose from "mongoose";
const fieldSchema = new mongoose.Schema(
  { name: String, label: String, type: String, required: Boolean },
  { _id: false },
);
const templateSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    description: String,
    fields: [fieldSchema],
    content: String,
  },
  { timestamps: true },
);
export default mongoose.model("Template", templateSchema);
