import { Schema, model, Document } from "mongoose";


interface IExperience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  roleDescription?: string;
  location?: string;
}

interface IProfile extends Document {
  user: Schema.Types.ObjectId;
  skills: string[];
  experience: IExperience[];
  resume: string;
}

const profileSchema = new Schema<IProfile>({
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  skills: { type: [String], required: true },
  experience: [
    {
      title: { type: String, required: true },
      company: { type: String, required: true },
      startDate: { type: String, required: true },
      endDate: { type: String, required: true },
      roleDescription: { type: String },
      location: { type: String },
    },
  ],
  resume: { type: String, required: true },
});

const Profile = model<IProfile>("Profile", profileSchema);

export default Profile;
