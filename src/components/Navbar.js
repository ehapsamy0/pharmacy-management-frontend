import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  const user = localStorage.getItem("access_token");
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.replace("/");
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Pharmacy Management System
        </Typography>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        <Button color="inherit" component={Link} to="/register">
          Register
        </Button>
        
        {user && (
          <Button onClick={handleLogout} color="inherit">
            {" "}
            Log out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
