import mongoose, { Document, Schema } from "mongoose";

interface IJob extends Document {
  title: string;
  description: string;
  company: string;
  location: string;
  requiredSkills: string[];
  salary: string;
  postedBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const jobSchema = new Schema<IJob>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  requiredSkills: { type: [String], required: true },
  salary: { type: String, required: true },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Job = mongoose.model<IJob>("Job", jobSchema);
export default Job;
