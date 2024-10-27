import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Box, Checkbox, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import Layout from "../components/Layout";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPatient, setIsPatient] = useState(true);
  const [isPharmacist, setIsPharmacist] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      const response = await axiosInstance.post("users/register/", {
        username,
        email,
        password,
        is_patient: isPatient,
        is_pharmacist: isPharmacist,
      });
      // Navigate to login page or auto-login if needed
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please check your input and try again.");
    }
  };

  const handleRoleChange = (role) => {
    if (role === "patient") {
      setIsPatient(!isPatient);
      if (isPatient) setIsPharmacist(false); // Ensure one role at a time
    } else if (role === "pharmacist") {
      setIsPharmacist(!isPharmacist);
      if (isPharmacist) setIsPatient(false); // Ensure one role at a time
    }
  };

  return (
    <Layout>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: "auto" }}>
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Username"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </form>
      </Paper>
    </Layout>
  );
}

export default Register;
