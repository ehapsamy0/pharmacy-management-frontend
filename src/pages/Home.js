import React from 'react';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

function Home() {
  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Welcome to the Pharmacy Management System
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/login">
        Get Started
      </Button>
    </Layout>
  );
}

export default Home;
