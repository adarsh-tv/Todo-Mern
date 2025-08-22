import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/todos";
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  const handleSignupRedirect = () => {
    window.location.href = "/signup";
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4" style={{ width: "350px" }}>
        <h2 className="text-center mb-4">Login</h2>

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

        <button className="btn btn-primary w-100" onClick={handleSubmit}>
          Login
        </button>
        <br></br>
        <button
          className="btn btn-success w-100"
          onClick={handleSignupRedirect}
        >
          Signup
        </button>
      </div>
    </div>
  );
}

export default Login;
