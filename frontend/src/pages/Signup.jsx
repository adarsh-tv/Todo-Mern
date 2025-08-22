import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        username,
        email,
        password,
      });
      alert("User registered successfully!");
    } catch (err) {
      alert("Signup failed, please try again.");
    }
  };

    const handleLoginRedirect = () => {
    window.location.href = "/login";
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4" style={{ width: "350px" }}>
        <h2 className="text-center mb-4">Signup</h2>

        <input
          className="form-control mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-success w-100" onClick={handleSubmit}>
          Register
        </button>
        <br></br>

         <button className="btn btn-primary w-100" onClick={handleLoginRedirect}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Signup;



