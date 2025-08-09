import mongoose from "mongoose";
const documentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    templateId: { type: mongoose.Schema.Types.ObjectId, ref: "Template" },
    data: Object,
    html: String,
  },
  { timestamps: true },
);
export default mongoose.model("Document", documentSchema);
