import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Chip, Paper } from '@mui/material';
import axiosInstance from '../../utils/axiosInstance';

const ProfileForm = () => {
  // State for skills, experience, and resume
  const [skills, setSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState<any[]>([{
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    roleDescription: '',
    location: ''
  }]);
  const [resume, setResume] = useState<string>('');

  // Add a skill to the list
  const handleSkillAdd = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  // Remove a skill from the list
  const handleSkillDelete = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  // Update experience field
  const handleExperienceChange = (index: number, field: string, value: string) => {
    const updatedExperience = [...experience];
    updatedExperience[index][field] = value;
    setExperience(updatedExperience);
  };

  // Remove experience entry
  const handleExperienceRemove = (index: number) => {
    const updatedExperience = experience.filter((_, i) => i !== index);
    setExperience(updatedExperience);
  };

  // Handle resume URL change
  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResume(e.target.value);
  };

  // Add new experience
  const handleAddExperience = () => {
    setExperience([
      ...experience,
      { title: '', company: '', startDate: '', endDate: '', roleDescription: '', location: '' }
    ]);
  };

  // Handle form submission
  const handleSubmit = async() => {
    // Gather the form data
    const profileData = {
      skills,
      experience,
      resume
    };

    try {
      const response = await axiosInstance.post('/profile', profileData);
      console.log('Profile submitted successfully:', response.data);
      alert('Profile submitted successfully!');
    } catch (error) {
      console.error('Error submitting profile:', error);
      alert('Error submitting profile. Please try again.');
    }

    alert('Profile data submitted successfully!');
  };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
      <Paper sx={{ width: '100%', maxWidth: 600, padding: 3 }}>
        <Typography variant="h6" gutterBottom>Create Profile</Typography>
        <form>
          {/* Skills */}
          <div>
            <Typography variant="subtitle1">Skills</Typography>
            <TextField
              label="Add Skill"
              variant="outlined"
              fullWidth
              margin="normal"
              onBlur={(e) => {
                handleSkillAdd(e.target.value);
                e.target.value = ''; // Clear the input after adding
              }}
            />
            <Box sx={{ marginTop: 1 }}>
              {skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => handleSkillDelete(skill)}
                  color="primary"
                  sx={{ margin: 0.5 }}
                />
              ))}
            </Box>
          </div>

          {/* Experience */}
          <div>
            <Typography variant="subtitle1">Experience</Typography>
            {experience.map((exp, index) => (
              <Box key={index} sx={{ marginBottom: 2 }}>
                <TextField
                  label="Job Title"
                  value={exp.title}
                  onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Company"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Start Date"
                  type="date"
                  value={exp.startDate}
                  onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="End Date"
                  type="date"
                  value={exp.endDate}
                  onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Role Description"
                  value={exp.roleDescription}
                  onChange={(e) => handleExperienceChange(index, 'roleDescription', e.target.value)}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Location"
                  value={exp.location}
                  onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <Button onClick={() => handleExperienceRemove(index)} color="secondary">
                  Remove Experience
                </Button>
              </Box>
            ))}
            <Button onClick={handleAddExperience} variant="contained" sx={{ marginBottom: 2 }}>
              Add Experience
            </Button>
          </div>

          {/* Resume */}
          <div>
            <Typography variant="subtitle1">Resume</Typography>
            <TextField
              label="Resume URL"
              type="url"
              value={resume}
              onChange={handleResumeChange}
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </div>

          <Button type="button" variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleSubmit}>
            Submit Profile
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ProfileForm;
