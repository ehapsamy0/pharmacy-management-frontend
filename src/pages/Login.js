import React, { useEffect, useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import Layout from "../components/Layout";
import { isAuthenticated } from "../utils/auth";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      const userRole = localStorage.getItem("userRole");
      const defaultRoute = userRole === "admin" ? "/admin-dashboard" : "/dashboard";
      navigate(defaultRoute);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("users/login/", {
        username,
        password,
      });
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("userRole", response.data.role);

      const redirectTo = response.data.role === "admin" ? "/admin-dashboard" : "/dashboard";
      navigate(redirectTo);
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <Layout>
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
