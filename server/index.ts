import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(helmet());  // Security headers
app.use(cors());  // Enable Cross-Origin Resource Sharing
app.use(express.json());  // To parse JSON requests

// Rate Limiting Middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,  // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Routes
app.use('/', (req, res)=>{
    res.send('Hello from OWOW Hackathon Backend!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/owow')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
