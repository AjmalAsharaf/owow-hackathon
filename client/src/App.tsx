import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import CandidateDashboard from "./pages/candidate/CandidateDashboard";
import CandidateProfile from "./pages/candidate/CandidateProfile";
import ProtectedRoute from "./components/ProtectedRoute";
// Placeholder pages for now
const EmployerDashboard = () => <div>Employer Dashboard</div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
         <Route path="/dashboard" element={ <ProtectedRoute><CandidateDashboard /></ProtectedRoute>} />
        <Route path="/candidate-profile" element={    <ProtectedRoute><CandidateProfile /></ProtectedRoute>} />
        <Route path="/employer-dashboard" element={<ProtectedRoute><EmployerDashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
