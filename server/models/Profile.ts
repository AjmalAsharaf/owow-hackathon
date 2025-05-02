import { Schema, model, Document } from "mongoose";

interface IProfile extends Document {
  user: Schema.Types.ObjectId; // Link to the User
  skills: string[];
  experience: string[];
  resume: string; // for storing URL of resume
}

const profileSchema = new Schema<IProfile>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  skills: { type: [String], required: true },
  experience: { type: [String], required: true },
  resume: { type: String, required: true },
}, { timestamps: true });

const Profile = model<IProfile>("Profile", profileSchema);

export default Profile;
