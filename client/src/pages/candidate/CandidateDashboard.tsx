import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, CardContent, Typography, CircularProgress } from "@mui/material";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requiredSkills: string[];
}

const CandidateDashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatchedJobs = async () => {
      try {
        const token = localStorage.getItem("authToken"); 
        const res = await axios.get("http://localhost:5000/api/jobs/match", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(res.data.data);
      } catch (err) {
        console.error("Error fetching matched jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchedJobs();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Matched Jobs
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : jobs.length === 0 ? (
        <Typography>No matching jobs found.</Typography>
      ) : (
        jobs.map((job) => (
          <Card key={job._id} sx={{ marginBottom: "1rem" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {job.title}
              </Typography>
              <Typography variant="body2">
                <strong>Company:</strong> {job.company}
              </Typography>
              <Typography variant="body2">
                <strong>Location:</strong> {job.location}
              </Typography>
              <Typography variant="body2">
                <strong>Required Skills:</strong> {job.requiredSkills.join(", ")}
              </Typography>
              <Typography variant="body2" sx={{ marginTop: "1rem" }}>
                {job.description}
              </Typography>
              <Button variant="outlined" sx={{ marginTop: "1rem" }}>
                Apply
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default CandidateDashboard;
