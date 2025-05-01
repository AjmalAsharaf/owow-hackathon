import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: { type: String, required: true },
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
