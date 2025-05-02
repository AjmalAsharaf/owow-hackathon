import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";

interface Profile {
  user: {
    name: string;
    email: string;
  };
  skills: string[];
  experience: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate: string;
  }>;
  resume: string;
}

const CandidateProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Candidate Profile
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : profile ? (
        <Card>
          <CardContent>
            <Typography variant="h6">{profile.user.name}</Typography>
            <Typography variant="body2">{profile.user.email}</Typography>
            <Typography variant="body2">
              <strong>Skills:</strong> {profile.skills.join(", ")}
            </Typography>
            <Typography variant="body2">
              <strong>Experience:</strong>
            </Typography>
            {profile.experience.map((exp, idx) => (
              <div key={idx}>
                <Typography variant="body2">{exp.title} at {exp.company}</Typography>
                <Typography variant="body2">
                  {exp.startDate} - {exp.endDate}
                </Typography>
              </div>
            ))}
            <Typography variant="body2">
              <strong>Resume:</strong> {profile.resume}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography>No profile data available.</Typography>
      )}
    </div>
  );
};

export default CandidateProfile;
