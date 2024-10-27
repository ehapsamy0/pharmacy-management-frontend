import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import Layout from "../components/Layout"; // <-- Add this import

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("users/login/", {
        username,
        password,
      });
      localStorage.setItem("access_token", response.data.access); // Store access token
      localStorage.setItem("refresh_token", response.data.refresh); // Store refresh token

      localStorage.setItem("userRole", response.data.role); // Store refresh token

      window.location.replace("/dashboard");
      // navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <Layout>
      {" "}
      {/* Use the Layout component here */}
      <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: "auto" }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Username"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </Paper>
    </Layout>
  );
}

export default Login;
