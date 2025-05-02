import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Job Matching Platform</h1>
      <Link to="/signup">Sign Up</Link> | <Link to="/login">Log In</Link>
    </div>
  );
};

export default Home;
