import React, { useEffect, useState } from 'react';
import { Typography, Grid, Card, CardContent } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Layout from '../components/Layout';
import axiosInstance from '../api/axiosInstance';
import '../styles/AdminDashboard.css'; // Import the CSS

function AdminDashboard() {
  const [prescriptionSummary, setPrescriptionSummary] = useState({ requested_count: 0, filled_count: 0 });
  const [monthlyRefillRequests, setMonthlyRefillRequests] = useState([]);
  const [monthlyUserRegistrations, setMonthlyUserRegistrations] = useState([]);
  const [summaryData, setSummaryData] = useState({
    total_users: 0,
    total_patients: 0,
    total_pharmacists: 0,
    total_medications: 0,
    pending_refills: 0,
    completed_refills: 0,
  });

  useEffect(() => {
    // Fetch data for charts and summary cards
    const fetchData = async () => {
      try {
        const prescriptionResponse = await axiosInstance.get('dashboard/prescription-summary/');
        const refillResponse = await axiosInstance.get('dashboard/refill-requests/monthly-count/');
        const userResponse = await axiosInstance.get('dashboard/user-registration-count/');
        const summaryResponse = await axiosInstance.get('dashboard/admin-summary/');
        
        setPrescriptionSummary(prescriptionResponse.data);
        setMonthlyRefillRequests(refillResponse.data);
        setMonthlyUserRegistrations(userResponse.data);
        setSummaryData(summaryResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  const prescriptionData = [
    { name: 'Requested', value: prescriptionSummary.requested_count },
    { name: 'Filled', value: prescriptionSummary.filled_count },
  ];

  const COLORS = ['#1abc9c', '#3498db'];

  return (
    <Layout className="admin-dashboard">
      <Typography variant="h4" gutterBottom className="dashboard-title">
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} sm={4}>
          <Card className="card">
            <div className="card-header">Total Users</div>
            <CardContent className="card-content">
              <Typography variant="h4">{summaryData.total_users}</Typography>
              <Typography variant="body1">
                Patients: {summaryData.total_patients} | Pharmacists: {summaryData.total_pharmacists}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card className="card">
            <div className="card-header">Total Medications</div>
            <CardContent className="card-content">
              <Typography variant="h4">{summaryData.total_medications}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card className="card">
            <div className="card-header">Refill Requests</div>
            <CardContent className="card-content">
              <Typography variant="body1">Pending: {summaryData.pending_refills}</Typography>
              <Typography variant="body1">Completed: {summaryData.completed_refills}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Prescription Summary Pie Chart */}
        <Grid item xs={12} sm={6}>
          <Card className="card chart-container">
            <div className="card-header">Prescription Summary</div>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart className="pie-chart">
                  <Pie
                    data={prescriptionData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {prescriptionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Monthly Refill Requests Bar Chart */}
        <Grid item xs={12} sm={6}>
          <Card className="card chart-container">
            <div className="card-header">Monthly Refill Requests</div>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRefillRequests} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} className="bar-chart">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Monthly User Registrations Bar Chart */}
        <Grid item xs={12}>
          <Card className="card chart-container">
            <div className="card-header">Monthly User Registrations</div>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyUserRegistrations} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default AdminDashboard;
